require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors")
const authRoute = require('./router/auth_router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');
const contactRoute = require ('./router/contact_router');
const errorMiddleware = require('./middlewares/error_middleware');

const connectDb = require("./utils/db");

const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, HEAD, PATCH",
    credentials: true,
}
app.use(cors(corsOption));
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);
app.use('/api/admin', adminRoute);

app.use(errorMiddleware);
app.get('/', (req, res) => {
    res.status(200).send('Welcome to my website');
});

connectDb().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});
