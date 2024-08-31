
import Book, { IBook, IBookInput } from "../model/Book";

//class LMS contains the features like addbook ,borrowbook , list_availbale books and Returning book to library
export default class LMS {

  
  async addBook(bookData: IBookInput): Promise<void> {
  
      
    if (!bookData.title || !bookData.author || bookData.pYear <= 1800) {
        throw new Error(
          "Book must have a title ,author and valid publication year"
        );
      }
  
      const currentYear = new Date().getFullYear();
      if (bookData.pYear > currentYear) {
        throw new Error("Year must be a reasonable value");
      }
  
      const book = new Book(bookData);  // Include the test flag
      await book.save();
      console.log("Book successfully added:", book);
    
    }

  async getAvailbaleBooks(): Promise<IBook[]> {
    return await Book.find({ isBorrowed: false });
  }
}
