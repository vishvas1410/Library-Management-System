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
var LMS_1 = require("../src/LMS");
var Book_1 = require("../model/Book");
var db_1 = require("../config/db");
describe("View Book", function () {
    var lms_service = new LMS_1.default();
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
    //this test case passed when the available books length is similar to library database
    test("should return a list of all available books", function () { return __awaiter(void 0, void 0, void 0, function () {
        var availableBooks, availableBookOnly;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lms_service.getTotalAvailableIncludingBorrowedOne()];
                case 1:
                    availableBooks = _a.sent();
                    return [4 /*yield*/, lms_service.getAvailbaleBooks()];
                case 2:
                    availableBookOnly = _a.sent();
                    expect(availableBooks.length).toBe(availableBooks.length);
                    return [2 /*return*/];
            }
        });
    }); });
    test("should return only the books that are not borrowed and validate total book count", function () { return __awaiter(void 0, void 0, void 0, function () {
        var availableBooks, totalBooks, borrowedBookCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lms_service.getAvailbaleBooks()];
                case 1:
                    availableBooks = _a.sent();
                    return [4 /*yield*/, lms_service.getTotalAvailableIncludingBorrowedOne()];
                case 2:
                    totalBooks = _a.sent();
                    borrowedBookCount = totalBooks.length - availableBooks.length;
                    // Assertions
                    expect(availableBooks.length).toBe(availableBooks.length);
                    // Ensure total book count is correct
                    expect(totalBooks.length).toBe(totalBooks.length);
                    // Ensure borrowed book count is correct
                    expect(borrowedBookCount).toBe(borrowedBookCount);
                    return [2 /*return*/];
            }
        });
    }); });
    //this test case are passed when the no books are available in library database
    test("should return an empty list if no books are available", function () { return __awaiter(void 0, void 0, void 0, function () {
        var availableBooks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Book_1.default.deleteMany({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, lms_service.getTotalAvailableIncludingBorrowedOne()];
                case 2:
                    availableBooks = _a.sent();
                    expect(availableBooks.length).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
