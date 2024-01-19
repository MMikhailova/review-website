import mongoose, { SchemaTypes } from "mongoose";


const user = new mongoose.Schema({
  id: {
    required: false,
    type: String,
  },
  firstName: {
    required: false,
    type: String,
  },
  lastName: {
    required: false,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: false,
    type: String,
  },
  favorites: [
    {
      bookId: {
        type: SchemaTypes.ObjectId,
        ref: "Book",
        required: false,
      }
    }
  ],
});
export default mongoose.model("User", user);
