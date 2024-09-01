"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Book_1 = require("../model/Book");
//class LMS contains the features like addbook,borrowbook,list_availbale books and Returning book to library
var LMS = /** @class */ (function () {
    function LMS() {
    }
    //Method/Function to adding Books to the library Database
    LMS.prototype.addBook = function (bookData) {
        return __awaiter(this, void 0, void 0, function () {
            var currentYear, book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!bookData.title || !bookData.author || bookData.pYear <= 1800) {
                            throw new Error("Book must have a title ,author and valid publication year");
                        }
                        currentYear = new Date().getFullYear();
                        if (bookData.pYear > currentYear) {
                            throw new Error("Year must be a reasonable value");
                        }
                        book = new Book_1.default(bookData);
                        return [4 /*yield*/, book.save()];
                    case 1:
                        _a.sent();
                        console.log("Book successfully added:", book);
                        return [2 /*return*/];
                }
            });
        });
    };
    // Method/Function to get all available books (i.e., not borrowed books)
    LMS.prototype.getAvailbaleBooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Book_1.default.find({ isBorrowed: false })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Method/Function to Borrow a book by ISBN
    LMS.prototype.borrowBook = function (isbn) {
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Book_1.default.findOne({ isbn: isbn })];
                    case 1:
                        book = _a.sent();
                        if (!book) {
                            return [2 /*return*/, false]; // Book does not exist
                        }
                        if (book.isBorrowed) {
                            return [2 /*return*/, false]; // Book is already borrowed
                        }
                        book.isBorrowed = true;
                        return [4 /*yield*/, book.save()];
                    case 2:
                        _a.sent(); // If this save fails or is not awaited, the status won't update
                        return [2 /*return*/, true];
                }
            });
        });
    };
    //Method/Function to Returning a Borrowed Books
    LMS.prototype.returnBook = function (isbn) {
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Book_1.default.findOne({ isbn: isbn })];
                    case 1:
                        book = _a.sent();
                        if (!book) {
                            //Book does not exist in Database
                            console.log("Book with ISBN ".concat(isbn, " does not exist."));
                            return [2 /*return*/, false];
                        }
                        if (!book.isBorrowed) {
                            // Book is  currently not  borrowed
                            console.log("Book with ISBN ".concat(isbn, " is not currently borrowed."));
                            return [2 /*return*/, false];
                        }
                        //if all above if statement are false that means we can return the borrowed book and mark the isBorrowed status false and update it in library database
                        book.isBorrowed = false;
                        return [4 /*yield*/, book.save()];
                    case 2:
                        _a.sent();
                        console.log("Book with ISBN ".concat(isbn, " has been returned."));
                        return [2 /*return*/, true];
                }
            });
        });
    };
    //Method/Function to Get all the books including borrowed one 
    LMS.prototype.getTotalAvailableIncludingBorrowedOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Book_1.default.find({})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LMS;
}());
exports.default = LMS;
