import express from 'express';
import Cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';


require('dotenv').config();

//app setup 1

const app = express();
const port = 8001;
const connection_url = process.env.MONGODB_URL;

// middleware 

app.use(express.json());
app.use(Cors());

// DB Config

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as any)


// api routes
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)

app.listen(port, () => {
    console.log(`Server started. Listening to port - ${port}`);
});