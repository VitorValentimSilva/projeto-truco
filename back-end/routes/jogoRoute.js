import express from "express";
import JogoController from "../controllers/jogoController.js";

const router = express.Router();

let ctrl = new JogoController();

router.get("/", (req, res) => {
  // #swagger.tags = ['Jogo']
  // #swagger.summary = 'Endpoint para retornar todos os jogos'

  ctrl.listar(req, res);
});

router.get("/:id", (req, res) => {
  //#swagger.tags = ['Jogo']
  //#swagger.summary = 'Retorna um jogo baseado em um código'

  ctrl.obter(req, res);
});

router.post("/", (req, res) => {
  //#swagger.tags = ['Jogo']
  //#swagger.summary = 'Cadastra um jogo'
  /*  #swagger.requestBody = {
          required: true,
            content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/jogoModel"
                  }  
              }
          }
      } 
  */

  ctrl.gravar(req, res);
});

export default router;
