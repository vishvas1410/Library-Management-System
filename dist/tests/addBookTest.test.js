"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var LMS_1 = require("../src/LMS"); // import library service module where the addBook function/method is defined
var db_1 = require("../config/db"); // import db.ts(database connection) file
describe("Add Book", function () {
    var lms_service = new LMS_1.default(); //instantiating the LMS class
    //this below method setup the connection before the test case executes
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectToDb)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //this below method closes the connection after the test case has been executes
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.closeDBConnection)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //generate Random Data for adding book feature 
    var generateBookData = function (overrides) {
        if (overrides === void 0) { overrides = {}; }
        return (__assign({ isbn: "978-93-5019-561-" + Math.floor(Math.random() * 1000), title: "Book Title " + Math.floor(Math.random() * 1000), author: "Author " + Math.floor(Math.random() * 1000), pYear: Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900, isBorrowed: false }, overrides));
    };
    //this test case is passed when book is added in the library database
    test("should add a book to the library", function () { return __awaiter(void 0, void 0, void 0, function () {
        var bookData, availableBooks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookData = generateBookData({});
                    return [4 /*yield*/, lms_service.addBook(bookData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, lms_service.getAvailbaleBooks()];
                case 2:
                    availableBooks = _a.sent();
                    // Expect the newly added book to be in the availableBooks list
                    expect(availableBooks).toContainEqual(expect.objectContaining({ isbn: bookData.isbn }));
                    return [2 /*return*/];
            }
        });
    }); });
    //this test case is passed when the incompletedata are provided to the addBook() function
    test("should validate that the book has a title, author, and year", function () { return __awaiter(void 0, void 0, void 0, function () {
        var incompleteBookData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    incompleteBookData = generateBookData({
                        title: "",
                        author: "",
                        pYear: 0,
                    });
                    // Expect validation to fail for missing fields
                    return [4 /*yield*/, expect(lms_service.addBook(incompleteBookData)).rejects.toThrow("Book must have a title ,author and valid publication year")];
                case 1:
                    // Expect validation to fail for missing fields
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //this test case is passed when the book publication year(pYear) is invalid
    test("should validate that the year is within the reasonable range", function () { return __awaiter(void 0, void 0, void 0, function () {
        var futureBookData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    futureBookData = generateBookData({ pYear: 3000 });
                    // Expect validation to fail for an unreasonable year
                    return [4 /*yield*/, expect(lms_service.addBook(futureBookData)).rejects.toThrow("Year must be a reasonable value")];
                case 1:
                    // Expect validation to fail for an unreasonable year
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
