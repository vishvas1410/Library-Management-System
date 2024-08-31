import LMS from "./LMS";
import { connectToDb, closeDBConnection } from "../config/db";

async function viewBooks() {
    try {
        // Connect to the database
        await connectToDb();

        // Instantiate the LMS service
        const lms_service = new LMS();

        // Get the list of available books
        const availableBooks = await lms_service.getAvailbaleBooks();

        // Print the available books
        if (availableBooks.length > 0) {
            console.log("Available Books:\n");
            availableBooks.forEach((book) => {
                console.log(`{BookTitle : ${book.title} , Author : ${book.author} , PublicationYear : (${book.pYear}) }`);
            });
            console.log("\n");
        } else {
            console.log("No books are currently available.");
        }
    } catch (error) {
        console.error("An error occurred while fetching the available books:", error);
    } finally {
        // Close the database connection
        await closeDBConnection();
    }
}

// Call the function to view books
viewBooks();
