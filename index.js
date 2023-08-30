const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

require("./connectionDb")

const port = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const agriRoutes = require('./routes/agriLandRoutes');
app.use('/agriculture-land', agriRoutes);

const apartmentRoutes = require('./routes/apartmentRoutes');
app.use('/apartment', apartmentRoutes);

const farmhouseRoutes = require('./routes/farmhouserRoutes');
app.use('/farmhouse', farmhouseRoutes);

const landRoutes = require('./routes/landRoutes');
app.use('/land', farmhouseRoutes);

const resortRoutes = require('./routes/resortRoutes');
app.use('/resort', resortRoutes);

const shopRoutes = require('./routes/shopRoutes');
app.use('/shop', shopRoutes);

const villaRoutes = require('./routes/villaRoutes');
app.use('/villa', villaRoutes);

app.get('/', (req, res) => {
    try {
        res.status(200).json({ success: true, message: "welcome to stake" });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err });
    }
})

app.listen(port, () => console.log("Server is running on port:", port));