import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      lowercase: true, // Ensures consistency in stored values
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    transactionType: {
      type: String,
      required: [true, "Transaction Type is required"],
      enum: ["income", "expense"], // Only allow 'income' or 'expense'
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Optimizes queries filtering by user
    },
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt'
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
