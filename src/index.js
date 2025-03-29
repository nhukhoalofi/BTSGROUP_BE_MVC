const express = require('express');
const fs = require('fs');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3001;

// Hàm đọc dữ liệu từ file JSON
const readUsers = () => {
    const data = fs.readFileSync(__dirname + '/users.json', 'utf-8');
    return JSON.parse(data);
};

// Hàm ghi dữ liệu vào file JSON
const writeUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
};

// Trang chính
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Lấy danh sách người dùng
app.get('/users', (req, res) => {
    const users = readUsers();
    res.send(users);
});

// Lấy thông tin chi tiết của một người dùng
app.get('/user/:id', (req, res) => {
    const users = readUsers();
    let idUser = Number(req.params.id);
    let user_selected = users.find(user => user.id === idUser);

    if (!user_selected) {
        return res.status(404).send({ error: "User not found" });
    }

    res.send(user_selected);
});

// Thêm người dùng
app.post('/users/', (req, res) => {
    const users = readUsers();
    let user = {
        id: Number(req.body.id),
        name: String(req.body.name),
        age: Number(req.body.age)
    };
    users.push(user);
    writeUsers(users); // Lưu dữ liệu vào file
    res.send(users);
});

// Xóa người dùng
app.delete('/users/:id', (req, res) => {
    let users = readUsers();
    let idUser = Number(req.params.id);
    let users1 = users.filter(user => user.id !== idUser);

    writeUsers(users1); // Lưu dữ liệu vào file
    res.send(users1);
});

// Sửa thông tin người dùng
app.put('/users/:id', (req, res) => {
    let users = readUsers();
    let idUser = Number(req.params.id);
    let nameUser = req.body.name;
    let ageUser = req.body.age;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === idUser) {
            if (nameUser !== undefined) {
                users[i].name = nameUser;
            }
            if (ageUser !== undefined) {
                users[i].age = ageUser;
            }
        }
    }

    writeUsers(users); // Lưu dữ liệu vào file
    res.send(users);
});

// Sắp xếp danh sách người dùng
app.get('/user_sort/:choice', (req, res) => {
    let users = readUsers();
    let choice = req.params.choice;

    if (choice === "acs") {
        users.sort((a, b) => a.id - b.id);
    } else if (choice === "dcs") {
        users.sort((a, b) => b.id - a.id);
    } else {
        return res.status(400).send("Invalid sorting option");
    }

    res.send(users);
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
