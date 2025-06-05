const express = require('express');
const multer = require('multer');
const app = express();
const DBconn = require('./config/dbConn');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const {Server} = require('socket.io');
const http = require('http');
require('dotenv').config();

//Database Connection
DBconn();

const activeUsers = [];

const server = http.createServer(app);
const io = new Server(server);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Socket Logic
io.on('connection',(socket)=>{
    activeUsers.push(socket.id);
    console.log(`\n${activeUsers}`);
    console.log(`Total Users:${activeUsers.length}`)

    socket.on('disconnect',()=>{
        const index = activeUsers.indexOf(socket.id);
        if (index !== -1) activeUsers.splice(index, 1);
        console.log(`\n${activeUsers}`);
        console.log(`Total user: ${activeUsers.length}`);
    })
})

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//routes
app.use('/login',require('./routes/login'));
app.use('/reg',require('./routes/register'));
app.use('/post',require('./routes/post'));
app.use('/imageUpload',require('./routes/imageUpload'));

mongoose.connection.once('open',()=>{
    console.log("Connected To MongoDB ✅🍃")
    server.listen(PORT,()=>{
        console.log(`Server Running on http://localhost:${PORT}`);
    })
})



