import LMS from "../src/LMS"; // import library service module where the addBook function/method is defined
import Book from "../model/Book"; // import the book model where the books model schema are defined
import { connectToDb, closeDBConnection } from "../config/db"; // import db.ts(database connection) file
import { IBookInput } from "../model/Book"; // Import IBookInput

describe("Add Book", () => {
  let lms_service: LMS = new LMS();//instantiating the LMS class

      //this below method setup the connection before the test case executes
      beforeAll(async () => {
        await connectToDb();
      });

      //this below method closes the connection after the test case has been executes
      afterAll(async () => {
        await closeDBConnection();
      });


      //generate Random Data for adding book feature 
      const generateBookData = ( overrides: Partial<IBookInput> = {}): IBookInput => ({
        isbn: "978-93-5019-561-" + Math.floor(Math.random() * 1000),
        title: "Book Title " + Math.floor(Math.random() * 1000),
        author: "Author " + Math.floor(Math.random() * 1000),
        pYear: Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900,
        isBorrowed: false,
        ...overrides,
      });

      //this test case is passed when book is added in the library database
      test("should add a book to the library", async () => {
        const bookData = generateBookData({});
        await lms_service.addBook(bookData);
        const availableBooks = await lms_service.getAvailbaleBooks();

        // Expect the newly added book to be in the availableBooks list
        expect(availableBooks).toContainEqual(
          expect.objectContaining({ isbn: bookData.isbn })
        );
      });

      //this test case is passed when the incompletedata are provided to the addBook() function
      test("should validate that the book has a title, author, and year", async () => {
        // Creating bookData with missing title, author, and year
        const incompleteBookData = generateBookData({
          title: "",
          author: "",
          pYear: 0,
        });

        // Expect validation to fail for missing fields
        await expect(lms_service.addBook(incompleteBookData)).rejects.toThrow(
          "Book must have a title ,author and valid publication year"
        );
      });

      //this test case is passed when the book publication year(pYear) is invalid
      test("should validate that the year is within the reasonable range", async () => {
        // Book data with an unrealistic future year
        const futureBookData = generateBookData({ pYear: 3000 });

        // Expect validation to fail for an unreasonable year
        await expect(lms_service.addBook(futureBookData)).rejects.toThrow(
          "Year must be a reasonable value"
        );
      });
});
