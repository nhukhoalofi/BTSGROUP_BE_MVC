//Xử lý việc kết nối tới cơ sở dữ liệu (MongoDB, MySQL, v.v.), thường chỉ gọi một lần duy nhất khi server khởi động.
import mongoose from "mongoose";
const connectDB=async()=> {
  try {
    await mongoose.connect('mongodb://user:password@127.0.0.1:27019/S-Mongo?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  }
  catch (err) {
    console.error('Failed to connect to MongoDB',err);
    process.exit(1);
  }
};
export default connectDB;