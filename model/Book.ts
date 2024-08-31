import mongoose ,{Schema,Document} from "mongoose";

export interface IBookInput {
    isbn: string;
    title: string;
    author: string;
    pYear: number;
    isBorrowed?: boolean;
  }


  // Define the Mongoose document interface (with Mongoose properties)
export interface IBook extends Document, IBookInput {}

//Collection Schema design for Books
const BookSchema:Schema = new Schema<IBook>({
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pYear: {
    type: Number,
    required: true,
    min: 1800,
  },
  isBorrowed: {
    type: Boolean,
    default: false,
  },
  
});

const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;


