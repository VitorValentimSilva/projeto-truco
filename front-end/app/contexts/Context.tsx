import { createContext } from "react"

export interface DadosUsuario{
  id?: number
  nome?: string
  email?: string
  senha?: string
}

interface DadosUsuarioType{
  usuario: DadosUsuario | null
  setUsuario: (usuario: DadosUsuario | null) => void
  autenticarUsuario: (dados: DadosUsuario, tipo: "Cadastrar" | "Entrar") => Promise<void>
  mensagemErro: string | null
  setMensagemErro: (mensagemErro: string | null) => void
}

interface AutenticacaoContextType{
  isAutenticado: boolean
  setIsAutenticado: (valor: boolean) => void
  acessarPagina: () => void
}

export interface DadosSala{
  id?: number
  nome?: string
  usuarioId?: number
}

interface DadosSalaType{
  salas: DadosSala[] | null
  setSalas: (sala: DadosSala[] | null) => void
  cadastroSala: (dados: DadosSala) => Promise<void>
  todasSalas: () => Promise<void>
  salaEscolhida: DadosSala | null
  setSalaEscolhida: (salaEscolhida: DadosSala | null) => void
}

const DadosUsuarioContext = createContext<DadosUsuarioType>({
  usuario: null,
  setUsuario: () => {},
  autenticarUsuario: async () => {},
  mensagemErro: null,
  setMensagemErro: () => {}
})

const AutenticacaoContext = createContext<AutenticacaoContextType>({
  isAutenticado: false,
  setIsAutenticado: () => {},
  acessarPagina: () => {}
})

const DadosSalaContext = createContext<DadosSalaType>({
  salas: null,
  setSalas: () => {},
  cadastroSala: async () => {},
  todasSalas: async () => {},
  salaEscolhida: null,
  setSalaEscolhida: () => {}
})

DadosUsuarioContext.displayName = "DadosUsuario"
AutenticacaoContext.displayName = "Autenticacao"
DadosSalaContext.displayName = "DadosSala"

const Contexts = {
  DadosUsuarioContext,
  AutenticacaoContext,
  DadosSalaContext
};

export default Contexts