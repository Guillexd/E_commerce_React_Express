import express from "express";
import productRouter from "./routes/product.router.js";
//env 
import obj from "./config.js";
//Routes imports
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/user.router.js";
//cookie parser
import cookieParser from "cookie-parser";
//utils
import { __dirname } from "./utils/utils.js";
//to solve problems with cors in reactjs
import cors from "cors";
import "./persistencia/dbConfig.js";
// import { jwtValid } from "./middleware/jwt.middleware.js";
const server = express();
//this url is from react, in this later doesn't work well maybe it's because of credentials with jwt (need configuration)
server.use(cors({ origin: 'http://127.0.0.1:5173' }));
// server.use(cors({ origin: 'http://127.0.0.1:5173', credentials: true}));
//default settings to allow json
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//cookie parser
server.use(cookieParser());

//Routes
// server.get("/", (req, res) => res.redirect("/view/login"));
server.use("/api/products", productRouter);
server.use("/api/carts", cartRouter);
server.use("/user", userRouter);

//Endpoints
server.get("*", (req, res) => res.status(400).json({ status: 0, err: "this url doesn't exit"}))
server.post("*", (req, res) => res.status(400).json({ status: 0, err: "this url doesn't exit"}))
server.put("*", (req, res) => res.status(400).json({ status: 0, err: "this url doesn't exit"}))
server.delete("*", (req, res) => res.status(400).json({ status: 0, err: "this url doesn't exit"}))

const PORT = obj.port;

server.listen(PORT, () => {
  console.log("Listening trought PORT:" + PORT);
});
