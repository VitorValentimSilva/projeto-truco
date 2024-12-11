import express from "express";
import RodadaController from "../controllers/rodadaController.js";

const router = express.Router();

let ctrl = new RodadaController();

router.get("/:id", (req, res) => {
  //#swagger.tags = ['Rodada']
  //#swagger.summary = 'Retorna uma rodada baseado em um código'

  ctrl.obter(req, res);
});

router.post("/", (req, res) => {
  //#swagger.tags = ['Rodada']
  //#swagger.summary = 'Cadastra uma rodada'
  /*  #swagger.requestBody = {
          required: true,
            content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/rodadaModel"
                  }  
              }
          }
      } 
  */

  ctrl.gravar(req, res);
});

export default router;
