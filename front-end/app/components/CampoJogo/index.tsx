import { useState, useEffect } from "react";
import styled from "styled-components";
import CampoJogador from "../CampoJogador";
import CampoCartasJogo from "../CampoCartasJogo";
import CampoCartasJogador from "../CampoCartasJogador";
import { useDadosEquipeContext } from "@/app/contexts/useContext";

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
    const cartaSelecionada = botCartas[0];
    setBotCartas((prev) => prev.slice(1));
    jogarCarta(cartaSelecionada);
    setTurno((prev) => (prev + 1) % 4);
  };

  useEffect(() => {
    if (turno !== 0) {
      const delay = setTimeout(() => {
        if (turno === 1) botJogarCarta(bot1Cartas, setBot1Cartas);
        else if (turno === 2) botJogarCarta(bot2Cartas, setBot2Cartas);
        else if (turno === 3) botJogarCarta(bot3Cartas, setBot3Cartas);
      }, 2000);

      return () => clearTimeout(delay);
    }
  }, [turno]);

  const handleJogarCarta = (carta: Card) => {
    if (turno !== 0) return;
    setJogadorCartas((prev) => prev.filter((c) => c.code !== carta.code));
    jogarCarta(carta);
    setTurno(1);
  };

  const getManilhaValue = (vira: string) => {
    const index = HIERARQUIA.indexOf(vira);
    return index >= 0 ? HIERARQUIA[(index + 1) % HIERARQUIA.length] : null;
  };

  const determinarVencedorTurno = (
    cartasJogadas: Card[],
    vira: Card | null
  ) => {
    const manilha = vira ? getManilhaValue(vira.value) : null;
    let vencedorIndex = 0;
    let cartaMaisForte = cartasJogadas[0];

    cartasJogadas.forEach((carta, index) => {
      const isManilhaAtual = carta.value === manilha;
      const isManilhaMaisForte = cartaMaisForte.value === manilha;

      if (
        (isManilhaAtual && !isManilhaMaisForte) ||
        (!isManilhaAtual &&
          !isManilhaMaisForte &&
          HIERARQUIA.indexOf(carta.value) >
            HIERARQUIA.indexOf(cartaMaisForte.value))
      ) {
        cartaMaisForte = carta;
        vencedorIndex = index;
      }
    });

    return vencedorIndex;
  };

  useEffect(() => {
    if (cartasJogadas.length === 4 && vira) {
      const vencedorTurno = determinarVencedorTurno(cartasJogadas, vira);
      setResultadosTurno((prev) => [...prev, vencedorTurno]);

      const delay = setTimeout(() => {
        setTurno(vencedorTurno);
        setCartasJogadas([]);

        const equipe1Turnos = resultadosTurno.filter(
          (res) => res === 0 || res === 2
        ).length;
        const equipe2Turnos = resultadosTurno.filter(
          (res) => res === 1 || res === 3
        ).length;

        if (equipe1Turnos === 2) {
          setVencedorRodada("Equipe 1");
        } else if (equipe2Turnos === 2) {
          setVencedorRodada("Equipe 2");
        }
      }, 3000);

      return () => clearTimeout(delay);
    }
  }, [cartasJogadas, vira]);

  return (
    <SectionEstilizado>
      <div className="divsEstilizadas" id="divEquipes">
        <p>
          Equipe 1: <strong>9</strong>
        </p>

        <div id="divValor">
          <h4>Valor: 3</h4>
        </div>

        <p>
          Equipe 2: <strong>11</strong>
        </p>
      </div>

      <div id="divPrincipal">
        <div className="divsEstilizadas">
          {equipe?.descricao === "Equipe 2" ? (
            <>
              <CampoJogador
                numeroJogador="J3"
                nomeJogador="Voce"
                ativo={turno === 0}
              />

              <CampoJogador
                numeroJogador="J4"
                nomeJogador="Maria"
                ativo={turno === 1}
              />
            </>
          ) : (
            <>
              <CampoJogador
                numeroJogador="J1"
                nomeJogador="Voce"
                ativo={turno === 0}
              />

              <CampoJogador
                numeroJogador="J2"
                nomeJogador="Pedro"
                ativo={turno === 1}
              />
            </>
          )}
        </div>

        <CampoCartasJogo cartaVira={vira} cartasJogadas={cartasJogadas} />

        <div className="divsEstilizadas">
          {equipe?.descricao === "Equipe 1" ? (
            <>
              <CampoJogador
                numeroJogador="J1"
                nomeJogador="Voce"
                ativo={turno === 0}
              />

              <CampoJogador
                numeroJogador="J2"
                nomeJogador="Pedro"
                ativo={turno === 1}
              />
            </>
          ) : (
            <>
              <CampoJogador
                numeroJogador="J3"
                nomeJogador="Joao"
                ativo={turno === 2}
              />

              <CampoJogador
                numeroJogador="J4"
                nomeJogador="Maria"
                ativo={turno === 3}
              />
            </>
          )}
        </div>
      </div>

      <CampoCartasJogador
        cartas={jogadorCartas}
        onJogarCarta={handleJogarCarta}
      />
    </SectionEstilizado>
  );
}
