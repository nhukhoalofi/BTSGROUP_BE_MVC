import express from 'express';
import connectDB from './database/database.connection.js'; // nếu chưa có, mình sẽ gợi ý tạo
import errorHandler from './middleware/error.middleware.js';
import authRouter from './apis/auth/auth_router.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB().then(() => {
  app.use('/api/auth', authRouter); // ví dụ: /api/auth/register
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect DB", err);
});
