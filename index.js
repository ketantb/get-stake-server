const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./models')
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    try {
        res.status(200).json({ success: true, message: "welcome to stake" });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err });
    }
})

const userRouter = require('./routes/userRoutes')
app.use('/user', userRouter);

db.sequelize.sync({ alter: true })
    .then(() => {
        app.listen(port, (err) => {
            console.log(`app listening to port no ${port}`);
            if (err) {
                console.log(err);
            }
        });
    })
    .catch((err) => {
        console.log(err);
    })


// const db = mysql.createConnection(
//     {
//         host: '127.0.0.1',
//         user: 'ketantb',
//         password: 'ketantb',
//         database: 'getstake'
//     }
// )

// db.connect((err) => {
//     if (err) {
//         console.log('unable to connect to DB');
//         console.log(err);
//     }
//     else {
//         console.log('MySQL connection successfull');
//     }
// })