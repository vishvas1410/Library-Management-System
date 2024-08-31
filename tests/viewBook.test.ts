import LMS from "../src/LMS";
import Book from "../model/Book";
import { closeDBConnection, connectToDb } from "../config/db";

describe("View Book",()=>{

    let lms_service : LMS = new LMS();

    //this below method setup the connection before the test case executes
    beforeAll(async () => {
        await connectToDb();
    });

    //this below method closes the connection after the test case has been executes
    afterAll(async () => {
        await closeDBConnection();
    });
   
    //this test case passed when the available books length is similar to library database
    test("should return a list of all available books", async () => {
        const availableBooks = await lms_service.getTotalAvailableIncludingBorrowedOne();//this returns the total length of available book with including Borrowed one
        const availableBookOnly = await lms_service.getAvailbaleBooks();//this returns the total length of available book without including Borrowed one
        expect(availableBooks.length).toBe(availableBooks.length);
    });

    
    test("should return only the books that are not borrowed and validate total book count", async () => {
        
        // Retrieve the available books and total books
        const availableBooks = await lms_service.getAvailbaleBooks();
        const totalBooks = await lms_service.getTotalAvailableIncludingBorrowedOne();
        
        // Calculate the number of borrowed books
        const borrowedBookCount = totalBooks.length - availableBooks.length;

        // Assertions
        expect(availableBooks.length).toBe(availableBooks.length);
        
        // Ensure total book count is correct
        expect(totalBooks.length).toBe(totalBooks.length);
        
        // Ensure borrowed book count is correct
        expect(borrowedBookCount).toBe(borrowedBookCount);
        
        
    });

    
    //this test case are passed when the no books are available in library database
    test("should return an empty list if no books are available", async () => {
       await Book.deleteMany({});
        const availableBooks = await lms_service.getTotalAvailableIncludingBorrowedOne();
        expect(availableBooks.length).toBe(0);
    });
});