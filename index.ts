import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import userRouter from "./Routes/userRouter";
import tenantsRouter from "./Routes/tenantsRouter";
import cors from 'cors';

const app = express();
const PORT = 4000;


app.use(cookieParser());

app.use(express.json());


const corsOptions = {
    origin: 'http://localhost:5173',  // Allow requests from this origin
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
};


app.use(cors(corsOptions));


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// This route is used for the Authentication
app.use('/api/auth', userRouter);


// This route is used for the tenants
app.use('/api', tenantsRouter);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
