const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

require("./connectionDb")

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    try {
        res.status(200).json({ success: true, message: "welcome to stake" });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err });
    }
})

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const agriRoutes = require('./routes/agriLandRoutes');
app.use('/agri', agriRoutes);

const apartmentRoutes = require('./routes/apartmentRoutes');
app.use('/apartment', apartmentRoutes);

app.listen(port, () => console.log("Server is running on port:", port));