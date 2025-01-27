import express from 'express';
import { createPaymentIntent, midtransCallback } from '../controllers/paymentIntent.controller.js';

const router = express.Router();

router.post('/', createPaymentIntent);
router.post("/midtrans/callback", midtransCallback);

export default router;