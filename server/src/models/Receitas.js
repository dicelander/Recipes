import mongoose from "mongoose";

const schemaReceitas = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  ingredientes: [
    {
      type: String,
      required: true,
    },
  ],
  instrucoes: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
  tempoPreparo: {
    type: Number,
    required: true,
  },
  usuarioDono: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ModeloReceitas = mongoose.model("Receitas", schemaReceitas);