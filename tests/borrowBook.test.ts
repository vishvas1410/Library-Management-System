import LMS from "../src/LMS";
import Book from "../model/Book";
import { closeDBConnection, connectToDb } from "../config/db";

describe("Borrow Book",()=>{

    let lms_service : LMS = new LMS();

    //this below method setup the connection before the test case executes
    beforeAll(async () => {
        await connectToDb();
    });

    //this below method closes the connection after the test case has been executes
    afterAll(async () => {
        await closeDBConnection();
    });
    
    //this test case fails if the book is already borrowed
    test('should allow borrowing an available book', async () => {
        const isBorrowed = await lms_service.borrowBook('978-93-5019-561-467');
        expect(isBorrowed).toBe(true);

        const availableBooks = await lms_service.getAvailbaleBooks();
        expect(availableBooks).not.toContainEqual(expect.objectContaining({ isbn: '978-93-5019-561-467' }));
    });

    //this test case fails if the book is not borrowed not even once
    test('should not allow borrowing a book that is already borrowed', async () => {
        await lms_service.borrowBook('978-93-5019-561-149');
        const isBorrowedAgain = await lms_service.borrowBook('978-93-5019-561-149');
        expect(isBorrowedAgain).toBe(false);
    });

    //this test case fails if the book with the correct isbn is available in library database
    test('should return false when trying to borrow a book that does not exist', async () => {
        const isBorrowed = await lms_service.borrowBook('non-existent-isbn');
        expect(isBorrowed).toBe(false);
    });
})