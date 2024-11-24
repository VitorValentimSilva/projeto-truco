import { createContext } from "react";

export interface DadosUsuario {
  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
}

interface DadosUsuarioType {
  usuario: DadosUsuario | null;
  setUsuario: (usuario: DadosUsuario | null) => void;
  autenticarUsuario: (
    dados: DadosUsuario,
    tipo: "Cadastrar" | "Entrar"
  ) => Promise<void>;
  mensagemErro: string | null;
  setMensagemErro: (mensagemErro: string | null) => void;
  alterarDadosUsuario: (
    dados: DadosUsuario,
    tipo: "TodosDados" | "AlgumDado"
  ) => Promise<void>;
}

interface AutenticacaoContextType {
  isAutenticado: boolean;
  setIsAutenticado: (valor: boolean) => void;
  acessarPagina: () => void;
  logout: () => void;
}

export interface DadosSala {
  id?: number;
  nome?: string;
  usuarioId?: number;
}

interface DadosSalaType {
  salas: DadosSala[] | null;
  setSalas: (sala: DadosSala[] | null) => void;
  cadastroSala: (dados: DadosSala) => Promise<void>;
  todasSalas: () => Promise<void>;
  salaEscolhida: DadosSala | null;
  setSalaEscolhida: (salaEscolhida: DadosSala | null) => void;
}

export interface DadosEquipe {
  id?: number;
  descricao?: string;
}

interface DadosEquipeType {
  equipes: DadosEquipe[] | null;
  setEquipes: (equipes: DadosEquipe[] | null) => void;
  equipe: DadosEquipe | null;
  setEquipe: (equipe: DadosEquipe | null) => void;
  todasEquipes: () => Promise<void>;
}

export interface DadosJogo {
  id?: number;
  dtInicio?: Date;
  dtFim?: Date | null;
  salaId?: number;
}

interface DadosJogoType {
  jogos: DadosJogo | null;
  setJogos: (jogo: DadosJogo | null) => void;
  cadastroJogo: (dados: DadosJogo) => Promise<void>;
  sairDoJogo: (id: number, dtFim: string) => Promise<void>;
}

export interface DadosParticipante {
  id?: number;
  dtEntrada?: Date;
  dtSaida?: Date | null;
  usuarioId?: number;
  salaId?: number;
  equipeId?: number;
}

interface DadosParticipanteType {
  participantes: DadosParticipante | null;
  setParticipantes: (participante: DadosParticipante | null) => void;
  cadastroParticipante: (dados: DadosParticipante) => Promise<void>;
  fimDeJogo: (id: number, dtSaida: string) => Promise<void>;
}

interface SalaJogoType {
  isSalaJogo: boolean;
  setIsSalaJogo: (valor: boolean) => void;
}

export interface DadosMao {
  id?: number;
  ordem?: number;
  codigoBaralho?: string;
  trucada?: string;
  valor?: number;
  jogoId?: number;
  equipeVencedora?: number;
}

interface DadosMaoType {
  maos: DadosMao | null;
  setMaos: (maos: DadosMao | null) => void;
  cadastroMao: (dados: DadosMao) => Promise<void>;
}

const DadosUsuarioContext = createContext<DadosUsuarioType>({
  usuario: null,
  setUsuario: () => {},
  autenticarUsuario: async () => {},
  mensagemErro: null,
  setMensagemErro: () => {},
  alterarDadosUsuario: async () => {},
});

const AutenticacaoContext = createContext<AutenticacaoContextType>({
  isAutenticado: false,
  setIsAutenticado: () => {},
  acessarPagina: () => {},
  logout: () => {},
});

const DadosSalaContext = createContext<DadosSalaType>({
  salas: null,
  setSalas: () => {},
  cadastroSala: async () => {},
  todasSalas: async () => {},
  salaEscolhida: null,
  setSalaEscolhida: () => {},
});

const DadosEquipeContext = createContext<DadosEquipeType>({
  equipes: null,
  setEquipes: () => {},
  equipe: null,
  setEquipe: () => {},
  todasEquipes: async () => {},
});

const DadosJogoContext = createContext<DadosJogoType>({
  jogos: null,
  setJogos: () => {},
  cadastroJogo: async () => {},
  sairDoJogo: async () => {},
});

const DadosParticipanteContext = createContext<DadosParticipanteType>({
  participantes: null,
  setParticipantes: () => {},
  cadastroParticipante: async () => {},
  fimDeJogo: async () => {},
});

const SalaJogoContext = createContext<SalaJogoType>({
  isSalaJogo: false,
  setIsSalaJogo: () => {},
});

const DadosMaoContext = createContext<DadosMaoType>({
  maos: null,
  setMaos: () => {},
  cadastroMao: async () => {},
});

DadosUsuarioContext.displayName = "DadosUsuario";
AutenticacaoContext.displayName = "Autenticacao";
DadosSalaContext.displayName = "DadosSala";
DadosEquipeContext.displayName = "DadosEquipe";
DadosJogoContext.displayName = "DadosJogo";
DadosParticipanteContext.displayName = "DadosParticipante";
SalaJogoContext.displayName = "SalaJogos";
DadosMaoContext.displayName = "DadosMao";

const Contexts = {
  DadosUsuarioContext,
  AutenticacaoContext,
  DadosSalaContext,
  DadosEquipeContext,
  DadosJogoContext,
  DadosParticipanteContext,
  SalaJogoContext,
  DadosMaoContext,
};

export default Contexts;
