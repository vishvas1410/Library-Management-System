import { model, Schema,Document} from "mongoose";

//interface for book
interface IBook extends Document {
  isbn: string;
  title: string;
  author: string;
  pYear: number;
  isBorrowed: boolean;
}

//Collection Schema design for Books
const Book_Schema = new Schema<IBook>({
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

const Book = model<IBook>("Book", Book_Schema);

export default Book;
export { IBook };
