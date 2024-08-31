import LMS from "../src/LMS";
import Book from "../model/Book";
import { closeDBConnection, connectToDb } from "../config/db";

describe("Return Book", () => {
    let lms_service: LMS = new LMS();//instantiating the LMS class

    //this below method setup the connection before the test case executes
    beforeAll(async () => {
        await connectToDb();
    });

    //this below method closes the connection after the test case has been executes
    afterAll(async () => {
        await closeDBConnection();
    });


    // Test for successfully returning a borrowed book
    test('should allow returning a borrowed book', async () => {
        const isReturned = await lms_service.returnBook('978-3-16-148410-0');
        expect(isReturned).toBe(true);

        const availableBooks = await lms_service.getAvailbaleBooks();
        expect(availableBooks).toContainEqual(expect.objectContaining({ isbn: '978-3-16-148410-0' }));
    });

    //Test for trying to return a book that is not borrowed
    test('should not allow returning a book that is not borrowed', async () => {
        const isReturned = await lms_service.returnBook('978-93-5019-561-935');
        expect(isReturned).toBe(false);
    });

    // Test for trying to return a book that does not exist
    test('should return false when trying to return a book that does not exist', async () => {
        const isReturned = await lms_service.returnBook('non-existent-isbn');
        expect(isReturned).toBe(false);
    });

});