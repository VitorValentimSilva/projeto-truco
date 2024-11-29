import { useState, useEffect } from "react";
import styled from "styled-components";
import CampoJogador from "../CampoJogador";
import CampoCartasJogo from "../CampoCartasJogo";
import CampoCartasJogador from "../CampoCartasJogador";
import {
  useDadosEquipeContext,
  useDadosJogoContext,
  useDadosMaoContext,
} from "@/app/contexts/useContext";

const SectionEstilizado = styled.section`
  background-color: #0d5c1d;
  border: 5px solid #2d1810;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
  width: 70%;
  padding: 50px 0;

  .divsEstilizadas {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  #divEquipes {
    color: white;
    font-size: 22px;
  }

  #divValor {
    background-color: #d97706;
    border-radius: 5px;
    padding: 7px 15px;
  }

  #divPrincipal {
    width: 100%;
  }
`;

export interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

async function criarDeck(): Promise<string> {
  const response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await response.json();
  return data.deck_id;
}

const CARTAS_VALIDAS = [
  "3S",
  "3D",
  "3H",
  "3C",
  "2S",
  "2D",
  "2H",
  "2C",
  "AS",
  "AD",
  "AH",
  "AC",
  "KS",
  "KD",
  "KH",
  "KC",
  "JS",
  "JD",
  "JH",
  "JC",
  "QS",
  "QD",
  "QH",
  "QC",
  "7S",
  "7D",
  "7H",
  "7C",
  "6S",
  "6D",
  "6H",
  "6C",
  "5S",
  "5D",
  "5H",
  "5C",
  "4S",
  "4D",
  "4H",
  "4C",
];

async function comprarCartas(
  deckId: string,
  count: number,
  excluir: string[] = []
): Promise<Card[]> {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
  );
  const data = await response.json();

  let cartas = data.cards.filter(
    (carta: Card) =>
      CARTAS_VALIDAS.includes(carta.code) && !excluir.includes(carta.code)
  );

  while (cartas.length < count) {
    const adicional = await comprarCartas(
      deckId,
      count - cartas.length,
      excluir
    );
    cartas = [...cartas, ...adicional];
  }

  return cartas;
}

export default function CampoJogo() {
  const [vira, setVira] = useState<Card | null>(null);
  const [deckId, setDeckId] = useState<string | null>(null);
  const [cartasJogadas, setCartasJogadas] = useState<Card[]>([]);
  const [jogadorCartas, setJogadorCartas] = useState<Card[]>([]);
  const [bot1Cartas, setBot1Cartas] = useState<Card[]>([]);
  const [bot2Cartas, setBot2Cartas] = useState<Card[]>([]);
  const [bot3Cartas, setBot3Cartas] = useState<Card[]>([]);
  const [turno, setTurno] = useState<number>(0);
  const HIERARQUIA = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];
  const [resultadosTurno, setResultadosTurno] = useState<number[]>([]);
  const [vencedorRodada, setVencedorRodada] = useState<string | null>(null);
  const { equipe } = useDadosEquipeContext();
  const { cadastroMao, setMaos } = useDadosMaoContext();
  const { jogos } = useDadosJogoContext();
  const [pontosEquipe1, setPontosEquipe1] = useState<number>(0);
  const [pontosEquipe2, setPontosEquipe2] = useState<number>(0);
  const [rodadaAtual, setRodadaAtual] = useState<number>(1);

  const reiniciarRodada = async () => {
    try {
      if (!deckId) return;

      setCartasJogadas([]);
      setTurno(0);
      setResultadosTurno([]);

      const [novaVira] = await comprarCartas(deckId, 1);
      setVira(novaVira);

      const jogador = await comprarCartas(deckId, 3);
      const bot1 = await comprarCartas(deckId, 3);
      const bot2 = await comprarCartas(deckId, 3);
      const bot3 = await comprarCartas(deckId, 3);

      setJogadorCartas(jogador);
      setBot1Cartas(bot1);
      setBot2Cartas(bot2);
      setBot3Cartas(bot3);
    } catch (error) {
      console.error("Erro ao reiniciar a rodada: ", error);
    }
  };

  useEffect(() => {
    const inicializarJogo = async () => {
      try {
        const novoDeckId = await criarDeck();
        setDeckId(novoDeckId);

        const [cartaVira] = await comprarCartas(novoDeckId, 1);
        setVira(cartaVira);

        const jogador = await comprarCartas(novoDeckId, 3);
        const bot1 = await comprarCartas(novoDeckId, 3);
        const bot2 = await comprarCartas(novoDeckId, 3);
        const bot3 = await comprarCartas(novoDeckId, 3);

        setJogadorCartas(jogador);
        setBot1Cartas(bot1);
        setBot2Cartas(bot2);
        setBot3Cartas(bot3);
      } catch (error) {
        console.error("Erro ao inicializar o jogo: ", error);
      }
    };

    inicializarJogo();
  }, []);

  const jogarCarta = (carta: Card) => {
    setCartasJogadas((prev) => [...prev, carta]);
  };

  const botJogarCarta = (
    botCartas: Card[],
    setBotCartas: React.Dispatch<React.SetStateAction<Card[]>>
  ) => {
    if (botCartas.length === 0) return;

    const cartaSelecionada = botCartas[0];
    setBotCartas((prev) => prev.slice(1));
    jogarCarta(cartaSelecionada);
    setTurno((prev) => (prev === 3 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (turno !== 0) {
      const delay = setTimeout(() => {
        if (turno === 1) botJogarCarta(bot1Cartas, setBot1Cartas);
        else if (turno === 2) botJogarCarta(bot2Cartas, setBot2Cartas);
        else if (turno === 3) botJogarCarta(bot3Cartas, setBot3Cartas);
      }, 4000);

      return () => clearTimeout(delay);
    }
  }, [turno]);

  const handleJogarCarta = (carta: Card): void => {
    if (turno !== 0) return;
    setJogadorCartas((prev) => prev.filter((c) => c.code !== carta.code));
    jogarCarta(carta);
    setTurno(1);
  };

  const getManilhaValue = (vira: Card | null): string | null => {
    if (!vira) return null;
    const index = HIERARQUIA.indexOf(vira.value);
    if (index === -1) return null;
    return HIERARQUIA[(index + 1) % HIERARQUIA.length];
  };

  const determinarVencedorTurno = (
    cartasJogadas: Card[],
    vira: Card | null
  ): number => {
    const manilha = vira ? getManilhaValue(vira) : null;

    let vencedorIndex = 0;
    let cartaMaisForte = cartasJogadas[0];

    cartasJogadas.forEach((carta, index) => {
      const isManilhaAtual = carta.value === manilha;
      const isManilhaMaisForte = cartaMaisForte.value === manilha;

      if (isManilhaAtual && !isManilhaMaisForte) {
        cartaMaisForte = carta;
        vencedorIndex = index;
      } else if (
        (!isManilhaAtual && !isManilhaMaisForte) ||
        (isManilhaAtual && isManilhaMaisForte)
      ) {
        if (
          HIERARQUIA.indexOf(carta.value) >
          HIERARQUIA.indexOf(cartaMaisForte.value)
        ) {
          cartaMaisForte = carta;
          vencedorIndex = index;
        }
      }
    });

    setResultadosTurno((prev) => [...prev, vencedorIndex]);
    return vencedorIndex;
  };

  useEffect(() => {
    if (cartasJogadas.length === 4 && vira) {
      const vencedorTurno = determinarVencedorTurno(cartasJogadas, vira);

      const delay = setTimeout(() => {
        if (
          jogadorCartas.length === 0 &&
          bot1Cartas.length === 0 &&
          bot2Cartas.length === 0 &&
          bot3Cartas.length === 0
        ) {
          setRodadaAtual((prev) => prev + 1);

          const ordem = 1;
          const trucada = "N";

          const jogoId = jogos?.id;
          const equipeVencedora = 3;
          const codigoBaralho = deckId ?? undefined;

          const dadosMao = {
            ordem,
            codigoBaralho,
            trucada,
            valor: 1,
            jogoId,
            equipeVencedora,
          };

          cadastroMao(dadosMao);

          reiniciarRodada();
        } else {
          setTurno(vencedorTurno);
        }

        setCartasJogadas([]);
      }, 3000);

      return () => clearTimeout(delay);
    }
  }, [cartasJogadas, vira, jogadorCartas, bot1Cartas, bot2Cartas, bot3Cartas]);

  return (
    <SectionEstilizado>
      <div className="divsEstilizadas" id="divEquipes">
        <p>
          Equipe 1: <strong>9</strong>
        </p>

        <div id="divValor">
          <h4>Valor: {rodadaAtual}</h4>
        </div>

        <p>
          Equipe 2: <strong>11</strong>
        </p>
      </div>

      <div id="divPrincipal">
        <div className="divsEstilizadas">
          <CampoJogador
            numeroJogador="J1"
            nomeJogador={equipe?.descricao === "Equipe 1" ? "Você" : "Pedro"}
            ativo={
              (turno === 0 && equipe?.descricao === "Equipe 1") ||
              (turno === 1 && equipe?.descricao === "Equipe 2")
            }
          />
          <CampoJogador
            numeroJogador="J3"
            nomeJogador={equipe?.descricao === "Equipe 1" ? "Pedro" : "Murilo"}
            ativo={
              (turno === 1 && equipe?.descricao === "Equipe 1") ||
              (turno === 2 && equipe?.descricao === "Equipe 2")
            }
          />
        </div>

        <CampoCartasJogo cartaVira={vira} cartasJogadas={cartasJogadas} />

        <div className="divsEstilizadas">
          <CampoJogador
            numeroJogador="J4"
            nomeJogador={equipe?.descricao === "Equipe 2" ? "Você" : "Murilo"}
            ativo={
              (turno === 0 && equipe?.descricao === "Equipe 2") ||
              (turno === 3 && equipe?.descricao === "Equipe 1")
            }
          />
          <CampoJogador
            numeroJogador="J2"
            nomeJogador={equipe?.descricao === "Equipe 2" ? "Maria" : "Maria"}
            ativo={
              (turno === 3 && equipe?.descricao === "Equipe 2") ||
              (turno === 2 && equipe?.descricao === "Equipe 1")
            }
          />
        </div>
      </div>

      <CampoCartasJogador
        cartas={jogadorCartas}
        onJogarCarta={handleJogarCarta}
      />
    </SectionEstilizado>
  );
}
