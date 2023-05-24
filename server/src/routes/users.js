import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js"

const router = express.Router();

router.post("/register", async (req, res) =>{

    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(user){
        return res.json({ message: "Nome de usuário indisponível!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({message: "Usuário registrado!"});
});

export {router as userRouter};