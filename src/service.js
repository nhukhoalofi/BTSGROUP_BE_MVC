//service.js: có
import express from 'express';

const app=express();
app.use(express.json())
const user=[];
app.post('/register',(req,res)=>{
    const {username, password}=req.body;
    user.push({username,password});
    res.send("Success")
})
// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
