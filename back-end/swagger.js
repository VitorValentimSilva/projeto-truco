import swaggerAutogen from "swagger-autogen"
import UsuarioEntity from "./entities/usuarioEntity.js"

const doc = {
  info: {
    title: "Projeto FIPPTruco",
    description: "API criada utilizando o padrão REST para o Projeto FIPPTruco"
  },
  host: 'localhost:5000',
  components: {
    schemas: {
        usuarioModel: new UsuarioEntity(0, "Vitor Valentim", "vitorvalentin840@gmail.com", 12345).toJSON()
    },
    securitySchemes:{
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
}

const outputJson = "./swagger-output.json"
const routes = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
  await import('./server.js')
})