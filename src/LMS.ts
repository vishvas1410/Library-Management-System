import Book, { IBook, IBookInput } from "../model/Book";

//class LMS contains the features like addbook,borrowbook,list_availbale books and Returning book to library
export default class LMS {

        //Method/Function to adding Books to the library Database
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

        // Method/Function to get all available books (i.e., not borrowed books)
        async getAvailbaleBooks(): Promise<IBook[]> {
          return await Book.find({ isBorrowed: false });
        }

        //Method/Function to Borrow a book by ISBN
        async borrowBook(isbn: string): Promise<boolean> {
          const book = await Book.findOne({ isbn });
          if (!book) {
              return false; // Book does not exist
          }
          if (book.isBorrowed) {
              return false; // Book is already borrowed
          }
          book.isBorrowed = true;
          await book.save(); // If this save fails or is not awaited, the status won't update
          return true;
        }

        //Method/Function to Returning a Borrowed Books
        async returnBook(isbn:string):Promise<boolean>{

            const book = await Book.findOne({ isbn });
            if (!book) {
                //Book does not exist in Database
                console.log(`Book with ISBN ${isbn} does not exist.`);
                return false;
            }
            if (!book.isBorrowed) {
                  // Book is  currently not  borrowed
                  console.log(`Book with ISBN ${isbn} is not currently borrowed.`);
                  return false;
              }  
                
              //if all above if statement are false that means we can return the borrowed book and mark the isBorrowed status false and update it in library database
              book.isBorrowed = false;
              await book.save();
              console.log(`Book with ISBN ${isbn} has been returned.`);
              return true;
        }

        //Method/Function to Get all the books including borrowed one 
        async getTotalAvailableIncludingBorrowedOne():Promise<IBook[]>{
          return await Book.find({});
        }
}



