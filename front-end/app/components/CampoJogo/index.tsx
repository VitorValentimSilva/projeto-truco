import { useState, useEffect } from "react";
import styled from "styled-components";
import CampoJogador from "../CampoJogador";
import CampoCartasJogo from "../CampoCartasJogo";
import CampoCartasJogador from "../CampoCartasJogador";
import {
  useDadosEquipeContext,
  useDadosJogoContext,
  useDadosMaoContext,
  useDadosParticipanteContext,
  useDadosRodadaContext,
} from "@/app/contexts/useContext";
import { useRouter } from "next/navigation";

const SectionEstilizado = styled.section`
  min-height: 100vh;
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

const BotaoTruco = styled.button`
  background-color: #d97706;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #000000;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #b85e04;
    transform: scale(1.1);
  }

  &:active {
    background-color: #944c03;
    transform: scale(0.95);
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const VencedorContainer = styled.div`
  background-color: #1a1a2e;
  border: 2px solid #16213e;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
  color: #eaeaea;
  max-width: 400px;
  margin: 20px auto;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #f5a623;
  }

  button {
    background-color: #f5a623;
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #d4881c;
      transform: scale(1.05);
    }

    &:active {
      background-color: #b36c15;
      transform: scale(0.95);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 5px 2px rgba(245, 166, 35, 0.5);
    }
  }
`;

const MensagemTruco = styled.p`
  background-color: #f4f4f4;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  text-align: center;
  line-height: 1.5;

  strong {
    color: #d97706;
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
  const [turno, setTurno] = useState<number>(1);
  const [jogadorAtual, setJogadorAtual] = useState<number>(0);
  const HIERARQUIA = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];
  const [resultadosTurno, setResultadosTurno] = useState<number[]>([]);
  const [vencedorRodada, setVencedorRodada] = useState<string | null>(null);
  const { equipe } = useDadosEquipeContext();
  const { cadastroMao, alterarMao, maos } = useDadosMaoContext();
  const { cadastroRodada } = useDadosRodadaContext();
  const [pontosEquipe1, setPontosEquipe1] = useState<number>(0);
  const [pontosEquipe2, setPontosEquipe2] = useState<number>(0);
  const [carregando, setCarregando] = useState(true);
  const [trucoSolicitado, setTrucoSolicitado] = useState(false);
  const [respostaTruco, setRespostaTruco] = useState<string | null>(null);
  const [trucoResolvido, setTrucoResolvido] = useState(false);
  const [pontoDaRodada, setPontoDaRodada] = useState<number>(1);
  const [jogoTerminado, setJogoTerminado] = useState(false);
  const [mensagemVitoria, setMensagemVitoria] = useState<string | null>(null);
  const { sairDoJogo, jogos } = useDadosJogoContext();
  const { fimDeJogo, participantes } = useDadosParticipanteContext();
  const router = useRouter();

  const sairDaPartida = async () => {
    const dataAtual = new Date();
    const dataAtualFormatada = dataAtual.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    if (jogos?.id && participantes?.id) {
      await fimDeJogo(participantes?.id, dataAtualFormatada);
      await sairDoJogo(jogos?.id, dataAtualFormatada);
    } else {
      console.log("Jogo ou Participante não encontrados!");
    }

    router.push("area-do-jogador");
  };

  const calcularVitorias = (resultadosTurno: number[]) => {
    const equipe1Vitorias = resultadosTurno.filter(
      (res) => res === 0 || res === 2
    ).length;
    const equipe2Vitorias = resultadosTurno.filter(
      (res) => res === 1 || res === 3
    ).length;
    return { equipe1Vitorias, equipe2Vitorias };
  };

  const pedirTruco = () => {
    if (jogadorAtual !== 0 || trucoSolicitado) return;
    setTrucoSolicitado(true);

    setTimeout(() => {
      const aceitar = Math.random() < 0.5;
      setRespostaTruco(aceitar ? "Aceito" : "Recusado");

      if (!aceitar) {
        console.log("Bot recusou o truco. Rodada encerrada.");
        setPontosEquipe1((prev) => prev + 1);
        reiniciarRodada();
      } else {
        console.log("Bot aceitou o truco. Valor da rodada aumenta para 3.");
        setPontoDaRodada(3);
      }

      setTrucoResolvido(true);
    }, 2000);
  };

  const getCardValue = (card: Card): number => {
    const faceValues: { [key: string]: number } = {
      A: 8,
      K: 7,
      Q: 5,
      J: 6,
      7: 4,
      6: 3,
      5: 2,
      4: 1,
      3: 10,
      2: 9,
    };

    return faceValues[card.value] || 0;
  };

  const reiniciarRodada = async () => {
    console.log("Reiniciando rodada...");

    try {
      console.log("Criando um novo baralho...");
      const novoDeckId = await criarDeck();
      setDeckId(novoDeckId);

      setTrucoSolicitado(false);
      setRespostaTruco(null);
      setTrucoResolvido(false);

      const [novaVira] = await comprarCartas(novoDeckId, 1);
      console.log("Nova Vira:", novaVira);
      setVira(novaVira);

      setCartasJogadas([]);
      setResultadosTurno([]);
      setTurno(1);
      setPontoDaRodada(1);

      console.log("Distribuindo novas cartas...");
      const jogador = await comprarCartas(novoDeckId, 3);
      const bot1 = await comprarCartas(novoDeckId, 3);
      const bot2 = await comprarCartas(novoDeckId, 3);
      const bot3 = await comprarCartas(novoDeckId, 3);

      if (
        jogador.length !== 3 ||
        bot1.length !== 3 ||
        bot2.length !== 3 ||
        bot3.length !== 3
      ) {
        throw new Error("Erro na distribuição das cartas!");
      }

      setJogadorCartas(jogador);
      setBot1Cartas(bot1);
      setBot2Cartas(bot2);
      setBot3Cartas(bot3);

      console.log("Cartas distribuídas com sucesso!");
    } catch (error) {
      console.error("Erro ao reiniciar rodada:", error);
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
      } finally {
        setCarregando(false);
      }
    };

    inicializarJogo();
  }, []);

  const jogarCarta = (carta: Card) => {
    setCartasJogadas((prev) => [...prev, carta]);
    setJogadorAtual((prev) => (prev + 1) % 4);
  };

  const botJogarCarta = (
    botCartas: Card[],
    setBotCartas: React.Dispatch<React.SetStateAction<Card[]>>
  ) => {
    if (botCartas.length === 0) {
      console.error("Bot não tem cartas para jogar!");
      return;
    }

    const cartaSelecionada = botCartas[0];
    setBotCartas((prev) => prev.slice(1));
    jogarCarta(cartaSelecionada);
  };

  const handleJogarCarta = (carta: Card): void => {
    if (jogadorAtual !== 0) return;
    setJogadorCartas((prev) => prev.filter((c) => c.code !== carta.code));
    jogarCarta(carta);
  };

  const getManilhaValue = (vira: Card | null): string | null => {
    if (!vira) return null;
    const index = HIERARQUIA.indexOf(vira.value);
    if (index === -1) return null;
    return HIERARQUIA[(index + 1) % HIERARQUIA.length];
  };

  const determinarVencedorTurno = (
    cartasJogadas: Card[],
    vira: Card | null,
    jogadorInicial: number
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

    const vencedorReal = (jogadorInicial + vencedorIndex) % 4;

    console.log("Vencedor do turno:", vencedorReal, cartaMaisForte);

    setResultadosTurno((prev) => [...prev, vencedorReal]);

    return vencedorReal;
  };

  useEffect(() => {
    if (cartasJogadas.length === 4) {
      const vencedorTurno = determinarVencedorTurno(
        cartasJogadas,
        vira,
        jogadorAtual
      );

      setTimeout(() => {
        setCartasJogadas([]);
        setJogadorAtual(vencedorTurno);
        setTurno((prev) => prev + 1);
      }, 3000);
    }
  }, [cartasJogadas, vira]);

  useEffect(() => {
    if (jogadorAtual !== 0 && cartasJogadas.length < 4) {
      const { equipe1Vitorias, equipe2Vitorias } =
        calcularVitorias(resultadosTurno);

      if (equipe1Vitorias === 2 || equipe2Vitorias === 2) return;

      const delay = setTimeout(() => {
        if (jogadorAtual === 1 && bot1Cartas.length > 0) {
          botJogarCarta(bot1Cartas, setBot1Cartas);
        } else if (jogadorAtual === 2 && bot2Cartas.length > 0) {
          botJogarCarta(bot2Cartas, setBot2Cartas);
        } else if (jogadorAtual === 3 && bot3Cartas.length > 0) {
          botJogarCarta(bot3Cartas, setBot3Cartas);
        } else {
          console.error(`Bot ${jogadorAtual} não tem cartas para jogar!`);
        }
      }, 4000);

      return () => clearTimeout(delay);
    }

    if (jogadorAtual !== 0 && cartasJogadas.length === 0) {
      console.log("Bot começando a rodada.");
      if (jogadorAtual === 1 && bot1Cartas.length > 0) {
        botJogarCarta(bot1Cartas, setBot1Cartas);
      } else if (jogadorAtual === 2 && bot2Cartas.length > 0) {
        botJogarCarta(bot2Cartas, setBot2Cartas);
      } else if (jogadorAtual === 3 && bot3Cartas.length > 0) {
        botJogarCarta(bot3Cartas, setBot3Cartas);
      } else {
        console.error(
          `Bot ${jogadorAtual} não tem cartas para jogar no início da rodada!`
        );
      }
    }
  }, [
    jogadorAtual,
    cartasJogadas.length,
    resultadosTurno,
    bot1Cartas,
    bot2Cartas,
    bot3Cartas,
  ]);

  useEffect(() => {
    const { equipe1Vitorias, equipe2Vitorias } =
      calcularVitorias(resultadosTurno);

    if (equipe1Vitorias === 2 || equipe2Vitorias === 2) {
      console.log("Finalizando rodada...");

      const { equipe1Vitorias, equipe2Vitorias } =
        calcularVitorias(resultadosTurno);
      const equipeVencedora = equipe1Vitorias > equipe2Vitorias ? 3 : 4;

      console.log(
        `Equipe vencedora da rodada: ${
          equipeVencedora === 3 ? "Equipe 1" : "Equipe 2"
        }`
      );

      const dadosMao = {
        ordem: 1,
        codigoBaralho: deckId ? deckId : undefined,
        trucada: trucoSolicitado ? "S" : "N",
        valor: jogadorCartas.reduce(
          (acc, carta) => acc + getCardValue(carta),
          0
        ),
        jogoId: jogos?.id || 0,
        equipeVencedora,
      };

      cadastroMao(dadosMao);

      const dadosRodada = {
        maoId: maos?.id,
        equipeVencedora,
      };

      cadastroRodada(dadosRodada);
      if (equipe1Vitorias === 2) {
        setPontosEquipe1((prev) => prev + pontoDaRodada);
        setVencedorRodada("Equipe 1");
      } else if (equipe2Vitorias === 2) {
        setPontosEquipe2((prev) => prev + pontoDaRodada);
        setVencedorRodada("Equipe 2");
      }
      console.log("Estado antes de reiniciar:");
      console.log({
        jogadorCartas,
        bot1Cartas,
        bot2Cartas,
        bot3Cartas,
        vira,
      });
      reiniciarRodada();
      console.log("Estado após reiniciar:");
      console.log({
        jogadorCartas,
        bot1Cartas,
        bot2Cartas,
        bot3Cartas,
        vira,
      });
      setResultadosTurno([]);
    }
  }, [resultadosTurno]);

  useEffect(() => {
    if (pontosEquipe1 >= 12) {
      setJogoTerminado(true);
      setMensagemVitoria("Equipe 1 venceu o jogo!");
    } else if (pontosEquipe2 >= 12) {
      setJogoTerminado(true);
      setMensagemVitoria("Equipe 2 venceu o jogo!");
    }
  }, [pontosEquipe1, pontosEquipe2]);

  return (
    <SectionEstilizado>
      {jogoTerminado ? (
        <VencedorContainer>
          <h2>{mensagemVitoria}</h2>
          <button onClick={sairDaPartida}>Sair do jogo</button>
        </VencedorContainer>
      ) : (
        <>
          <div className="divsEstilizadas" id="divEquipes">
            <p>
              Equipe 1: <strong>{pontosEquipe1}</strong>
            </p>
            <div id="divValor">
              <h4>Valor: {pontoDaRodada}</h4>
            </div>
            <p>
              Equipe 2: <strong>{pontosEquipe2}</strong>
            </p>
          </div>
          <div id="divPrincipal">
            <div className="divsEstilizadas">
              <CampoJogador
                numeroJogador="J1"
                nomeJogador="Você"
                ativo={jogadorAtual === 0}
              />
              <CampoJogador
                numeroJogador="J3"
                nomeJogador="Murilo"
                ativo={jogadorAtual === 1}
              />
            </div>
            {vira ? (
              <CampoCartasJogo cartaVira={vira} cartasJogadas={cartasJogadas} />
            ) : (
              <p>Carregando cartas...</p>
            )}
            <div className="divsEstilizadas">
              <CampoJogador
                numeroJogador="J4"
                nomeJogador="Heitor"
                ativo={jogadorAtual === 3}
              />
              <CampoJogador
                numeroJogador="J2"
                nomeJogador="Maria"
                ativo={jogadorAtual === 2}
              />
            </div>
          </div>
          {jogadorCartas.length > 0 ? (
            <CampoCartasJogador
              cartas={jogadorCartas}
              onJogarCarta={handleJogarCarta}
            />
          ) : (
            <p>Preparando cartas do jogador...</p>
          )}
          {trucoResolvido && respostaTruco === "Aceito" ? (
            <MensagemTruco>
              🎉 Bot aceitou o truco! A rodada continua com valor de{" "}
              <strong>3 pontos</strong>.
            </MensagemTruco>
          ) : trucoResolvido && respostaTruco === "Recusado" ? (
            <MensagemTruco>
              ❌ Bot recusou o truco! A rodada foi encerrada.
            </MensagemTruco>
          ) : jogadorAtual === 0 && !trucoSolicitado ? (
            <BotaoTruco onClick={pedirTruco} disabled={trucoSolicitado}>
              Pedir Truco
            </BotaoTruco>
          ) : (
            trucoSolicitado && (
              <MensagemTruco>⏳ Aguardando resposta do Bot...</MensagemTruco>
            )
          )}
        </>
      )}
    </SectionEstilizado>
  );
}
