import express from "express";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import cors from "cors";
import routerAutenticacao from "./routes/autenticacaoRoute.js";
import routerUsuarios from "./routes/usuarioRoute.js";
import routerSala from "./routes/salaRoute.js";
import routerEquipe from "./routes/equipeRoute.js";
import routerJogo from "./routes/jogoRoute.js";
import routerParticipante from "./routes/participanteRoute.js";

const app = express();
const port = process.env.PORT || 5000

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));

app.use("/auth", routerAutenticacao);
app.use("/usuarios", routerUsuarios);
app.use("/salas", routerSala);
app.use("/equipes", routerEquipe);
app.use("/jogos", routerJogo);
app.use("/participantes", routerParticipante);

app.listen(port, function () {
  console.log("Servidor Web em Funcionamento!");
});
