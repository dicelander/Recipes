import express from "express";
import mongoose from "mongoose";
import { ModeloReceitas } from "../models/Receitas.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await ModeloReceitas.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Cria nova receita
router.post("/", verifyToken, async (req, res) => {
  const receita = new ModeloReceitas({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    image: req.body.image,
    ingredientes: req.body.ingredientes,
    instrucoes: req.body.instrucoes,
    imageUrl: req.body.imageUrl,
    tempoPreparo: req.body.tempoPreparo,
    usuarioDono: req.body.usuarioDono,
  });
  console.log(receita);

  try {
    const result = await receita.save();
    res.status(201).json({
      receitaCriada: {
        nome: result.nome,
        image: result.image,
        ingredientes: result.ingredientes,
        instrucoes: result.instrucoes,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

export { router as routerReceitas };