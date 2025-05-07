
import { v2 as cloudinary } from 'cloudinary';
import connectDB from './src/database/database.connection.js'
import fs from 'fs'
import mongoose from 'mongoose';
import UserModel from './src/model/users.model.js';
import path from 'path'
await connectDB();
(async function(){
    try {
        cloudinary.config({
            cloud_name:'dvfhyxnke',
            api_key:'173672421639628',
            api_secret:'PHCZEt9JSNrAapRUTwgd5JL89Mg'
        })
        console.log("Cloudinary Config",cloudinary.config());
        const folderPath='./img';
        const files = fs.readdirSync(folderPath).filter(file =>
            file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
        );
        console.log(`Đã tìm thấy ${files.length} ảnh trong thư mục`)
        const userId=new mongoose.Types.ObjectId('680c44dc02f6f31abf7e0b4c');
        for(const file of files){
            const filePath=path.join(folderPath,file);
        
        try {
            const uploadResult= await cloudinary.uploader.upload(filePath,{
                folder: 'uploaded_images', // Đặt thư mục trên Cloudinary
                resource_type: 'image'
            }
            )
            const avatarUrl= uploadResult.secure_url;
            await UserModel.findByIdAndUpdate(userId, { avatarUrl });
            console.log(`✅ Upload thành công: ${file}`);

        }
        catch(uploadError) {
            console.error(`❌ Lỗi khi upload ${file}:`, uploadError);
        }
    }
        console.log("🎉 Hoàn tất upload tất cả ảnh!");
        
    }
    catch(error) {
        console.error("Lỗi:",error);
    }
})();
