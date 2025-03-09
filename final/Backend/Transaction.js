import express from "express";
import { 
    addTransactionController, 
    deleteTransactionController, 
    getAllTransactionController, 
    updateTransactionController 
} from "../controllers/transactionController.js";

const router = express.Router();

// Add a new transaction
router.post("/transaction/add", addTransactionController);

// Fetch all transactions (Changed to GET for better REST compliance)
router.get("/transactions", getAllTransactionController);

// Remove a transaction (Changed to DELETE for correctness)
router.delete("/transaction/remove/:id", deleteTransactionController);

// Update an existing transaction
router.put("/transaction/update/:id", updateTransactionController);

export default router;
