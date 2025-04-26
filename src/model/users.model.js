//Chứa các schema/model mô tả cấu trúc dữ liệu (vd: User, Product...), thường dùng với ORM như Mongoose, Sequelize...
import mongoose from 'mongoose'

const userSchema= new mongoose.Schema({
        name: {type:String, required: true},
        email: {type:String, required:true},
        password: {type:String, required:true},
        resetPasswordToken: {type:String},
        resetPasswordExpires: {type:String}     
});
const UserModel= mongoose.model('User',userSchema);//liên kết với colection users
export default UserModel;