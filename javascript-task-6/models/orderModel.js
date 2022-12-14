import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "products"
    }
  ],
});

export const Order = mongoose.model('orders', orderSchema); 