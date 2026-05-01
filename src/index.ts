/// <reference path="./types/express.d.ts" />
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./routes";
import { connectDB } from "./database";
import { sendResponse } from "./utils/response";

// ------------------------------------------------------------------------

dotenv.config();

/* ---------- Constants ---------- */
const app = express();
const PORT = process.env.PORT || 5000;


/* ---------- Global Middleware ---------- */
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse URL-encoded
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));


/* ---------- Database Connection ---------- */
connectDB();


/* ---------- Routes ---------- */
app.use("/api/v1", router);


/* ---------- 404 Handler ---------- */
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});


/* ---------- Global Error Handler ---------- */
app.use(
    (err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err); // we can use a logging library instead
        return sendResponse({
            res,
            status: 'error',
            statusCode: err.statusCode || 500,
            message: err.message || "Internal Server Error",
            error: err.errors || err,
        });
    }
);

/* ---------- Server ---------- */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});