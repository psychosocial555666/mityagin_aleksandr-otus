import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: String,
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product"
    }
  ],
});

export const Order = mongoose.model('orders', orderSchema); 