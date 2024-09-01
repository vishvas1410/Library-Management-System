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
var db_1 = require("../config/db");
describe("Borrow Book", function () {
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
    //this test case fails if the book is already borrowed
    test('should allow borrowing an available book', function () { return __awaiter(void 0, void 0, void 0, function () {
        var isBorrowed, availableBooks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lms_service.borrowBook('978-93-5019-561-467')];
                case 1:
                    isBorrowed = _a.sent();
                    expect(isBorrowed).toBe(true);
                    return [4 /*yield*/, lms_service.getAvailbaleBooks()];
                case 2:
                    availableBooks = _a.sent();
                    expect(availableBooks).not.toContainEqual(expect.objectContaining({ isbn: '978-93-5019-561-467' }));
                    return [2 /*return*/];
            }
        });
    }); });
    //this test case fails if the book is not borrowed not even once
    test('should not allow borrowing a book that is already borrowed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var isBorrowedAgain;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lms_service.borrowBook('978-93-5019-561-149')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, lms_service.borrowBook('978-93-5019-561-149')];
                case 2:
                    isBorrowedAgain = _a.sent();
                    expect(isBorrowedAgain).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    //this test case fails if the book with the correct isbn is available in library database
    test('should return false when trying to borrow a book that does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var isBorrowed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lms_service.borrowBook('non-existent-isbn')];
                case 1:
                    isBorrowed = _a.sent();
                    expect(isBorrowed).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
});
