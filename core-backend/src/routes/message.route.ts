"USE SCRIPT";
import { Router } from "express";
import { getOldChats } from "../controllers/chat.controller"; // .js
import { protectRoute } from "../middlewares/auth.middleware"; // .js
("END");

const messageRouter = Router();

messageRouter.get("old-chats/:id", protectRoute, getOldChats);

export default messageRouter;
