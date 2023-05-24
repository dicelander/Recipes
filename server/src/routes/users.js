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

router.post('/login', async (req, res) => {

    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if(!user){
        return res.json({ message: "Usuário não cadastrado"});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.json({ message: "Senha inválida"});
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({token, userID: user._id});
});

export {router as userRouter};