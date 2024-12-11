"use client";

import CampoEquipe from "@/app/components/CampoEquipe";
import { ErrorMessage } from "@/app/components/Formulario";
import {
  useDadosEquipeContext,
  useDadosJogoContext,
  useDadosParticipanteContext,
  useDadosSalaContext,
  useDadosUsuarioContext,
} from "@/app/contexts/useContext";
import PaginaBase from "@/app/pageBase";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MainEstilizado = styled.main`
  min-height: 100vh;
  background-color: #14532d;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;

  @media (max-width: 768px) {
    padding: 40px 0;
  }

  @media (max-width: 480px) {
    padding: 20px 0;
  }
`;

const SectionEstilizado = styled.section`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  padding: 30px 20px;
  width: 80%;
  border-radius: 20px;

  h2 {
    font-size: 32px;

    @media (max-width: 768px) {
      font-size: 28px;
    }

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }

  button {
    border-radius: 10px;
    padding: 15px 35px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    background-color: #059669;
    color: white;
    transition: background-color 0.3s ease;

    @media (max-width: 768px) {
      padding: 12px 30px;
    }

    @media (max-width: 480px) {
      padding: 10px 25px;
      font-size: 14px;
    }
  }
`;

export default function EscolherEquipe() {
  const [selectedEquipe, setSelectedEquipe] = useState<string | null>(null);
  const { todasEquipes, equipes, setEquipe } = useDadosEquipeContext();
  const { salaEscolhida } = useDadosSalaContext();
  const { cadastroJogo } = useDadosJogoContext();
  const { cadastroParticipante } = useDadosParticipanteContext();
  const { mensagemErro, setMensagemErro, usuario } = useDadosUsuarioContext();
  const [dataFormatada, setDataFormatada] = useState<string | null>(null);

  useEffect(() => {
    todasEquipes();
    setMensagemErro(null);
  }, [setMensagemErro]);

  const isClick = () => {
    if (selectedEquipe) {
      const equipeSelecionada = equipes?.find(
        (equipe: any) => equipe.descricao === selectedEquipe
      );

      if (equipeSelecionada) {
        setEquipe(equipeSelecionada);

        const dataAtual = new Date();

        const dataAtualFormatada = dataAtual.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        setDataFormatada(dataAtualFormatada);

        const dadosParticipante = {
          id: 0,
          dtEntrada: dataAtual,
          dtSaida: null,
          usuarioId: usuario?.id,
          salaId: salaEscolhida?.id,
          equipeId: equipeSelecionada.id,
        };

        cadastroParticipante(dadosParticipante);

        const dadosJogo = {
          id: 0,
          dtInicio: dataAtual,
          dtFim: null,
          salaId: salaEscolhida?.id,
        };

        cadastroJogo(dadosJogo);
      }
    }
  };

  return (
    <PaginaBase>
      <MainEstilizado>
        <SectionEstilizado>
          <h2>Escolha sua Equipe</h2>

          {equipes && equipes.length > 0 ? (
            equipes.map((equipe: any, index: number) => (
              <CampoEquipe
                key={index}
                nomeEquipe={equipe.descricao}
                nomeJogador1={
                  equipe.descricao === "Equipe 1" ? "Jogador 1" : "Jogador 3"
                }
                nomeJogador2={
                  equipe.descricao === "Equipe 1" ? "Jogador 2" : "Jogador 4"
                }
                isSelected={selectedEquipe === equipe.descricao}
                onClick={() => setSelectedEquipe(equipe.descricao)}
              />
            ))
          ) : (
            <p>Carregando equipes...</p>
          )}

          {mensagemErro && <ErrorMessage>{mensagemErro}</ErrorMessage>}

          <button onClick={isClick} disabled={!selectedEquipe}>
            Pronto
          </button>
        </SectionEstilizado>
      </MainEstilizado>
    </PaginaBase>
  );
}
