const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require('multer');
const jwt = require('jsonwebtoken');
const secret = "1234567890";
const User = require('./Models/User')

const app = express()
const port = 4000
const routes = require('./Routes/admin')

app.use(cors()) //allow this port open security for other
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/fileUpload')))
app.use(express.static(path.join(__dirname, '../public/fileUpload')))

app.use(cookieParser());
app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1h expire
        sameSite: true,
        secure: false
    },
    secret: "this is a secret key",
    name: 'sid'
}));

let imgName; //to store name file for db
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/fileUpload'); //put path for file
    },
    filename: (req, file, cb) => { //put original name for file
        const { originalname } = file;
        imgName = originalname;
        cb(null, originalname);
    }
})
const upload = multer({ storage });

app.post('/updateProfile/:userId', upload.single('photo'), (req, res) => {
    const userId = req.params.userId;

    User.findByIdAndUpdate(userId)
        .then((user) => {
            user.profile = imgName;
            const myUser = { id: userId, username: user.username, email: user.email, profile: imgName };
            //create token for user
            const token = jwt.sign({
                data: myUser
            }, secret, { expiresIn: 60 * 60 * 4 });
            res.json({ "token": token });
            return user.save();
        })
        .catch(err => {
            console.log(err);
        })
});

app.post('/postFile', upload.array('files'), (req, res) => {
    res.json({ success: true })
});

app.use(routes)

mongoose.connect('mongodb+srv://user1:User1234@cluster0.cqgou.mongodb.net/Online_Classroom?retryWrites=true&w=majority', { useFindAndModify: false, useNewUrlParser: true })
    .then(result => {
        console.log("Db is connected");
        app.listen(port);
    }).catch(err => {
        console.log(err);
    })