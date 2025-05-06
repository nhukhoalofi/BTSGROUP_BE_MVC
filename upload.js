
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import UserModel from './src/model/users.model.js';
import connectDB from './src/database/database.connection.js'; 
import mongoose from 'mongoose';
await connectDB();
(async function () {
    try {
        // Cấu hình Cloudinary
        cloudinary.config({ 
            cloud_name: 'dvfhyxnke', 
            api_key: '173672421639628', 
            api_secret: 'PHCZEt9JSNrAapRUTwgd5JL89Mg' 
        });

        console.log("Cloudinary Config:", cloudinary.config());

        // Đường dẫn thư mục chứa ảnh
        const folderPath = './img';
        // Lấy danh sách tất cả các file trong thư mục(file ảnh)
        const files = fs.readdirSync(folderPath).filter(file => 
            file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')
        );

        console.log(`🔍 Tìm thấy ${files.length} ảnh trong thư mục.`);
        const userId = new mongoose.Types.ObjectId('680b7bb5d3739f8db3c0a90d');
        // Upload từng ảnh
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            console.log(`📤 Đang upload: ${file} ...`);

            try {
                const uploadResult = await cloudinary.uploader.upload(filePath, {
                    folder: 'uploaded_images', // Đặt thư mục trên Cloudinary
                    resource_type: 'image'
                });
                const avatarUrl = uploadResult.secure_url;

                // 👇 Update vào MongoDB
                await UserModel.findByIdAndUpdate(userId, { avatarUrl });
                console.log(`✅ Upload thành công: ${file}`);
                console.log("🔗 URL:", uploadResult.secure_url);
            } catch (uploadError) {
                console.error(`❌ Lỗi khi upload ${file}:`, uploadError);
            }
        }

        console.log("🎉 Hoàn tất upload tất cả ảnh!");

    } catch (error) {
        console.error("Lỗi:", error);
    }
})();