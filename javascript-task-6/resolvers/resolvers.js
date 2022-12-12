import { User } from '../models/userModel.js'
import { Product } from '../models/productModel.js'
import { Order } from '../models/orderModel.js'
import mongoose from 'mongoose';

var ObjectId = mongoose.ObjectId;

export const resolvers = {
  Query: {
    getUsers: async () => await User.find({}).exec(),
    getUserById: async (_, args) => await User.findById(args.id),
    getOrderById: async (_, args) => await Order.findById(args.id).populate('products'),
    getOrdersByUserId: async (_, args) => await Order.find({ userId: args.userId }),
    getProducts: async () => await Product.find({}).exec(),
    getProductById: async (_, args) => await Product.findById(args.id),
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        let response = await User.create(args.user);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    createProduct: async (_, args) => {
      try {
        let response = await Product.create(args.product);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    createOrder: async (_, args) => {
      try {
        let response = await Order.create({ userId: args.order.userId });
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addProductToOrder: async (_, args) => {
      try {
        const product = await Product.findById(mongoose.Types.ObjectId(args.productId));
        await Order.updateOne({_id: mongoose.Types.ObjectId(args.orderId)}, {$push: {products: product} } );
        const order = await Order.findById(mongoose.Types.ObjectId(args.orderId)).populate('products');
        return order;
      } catch (e) {
        return e.message;
      }
    }
  }
};