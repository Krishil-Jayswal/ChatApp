"USE SCRIPT";
import { Router } from "express";
import authRouter from "./auth.route"; // .js
import messageRouter from "./message.route"; // .js
import userRouter from "./user.route"; // .js
import conversationRouter from "./conversation.route";
("END");

const V1Router = Router();

V1Router.use("/auth", authRouter);

V1Router.use("/user", userRouter);

V1Router.use("/chat", messageRouter);

V1Router.use("/conversation", conversationRouter);

export default V1Router;
