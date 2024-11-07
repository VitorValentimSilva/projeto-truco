"use client";

import Formulario from "@/app/components/Formulario";
import { useAutenticacaoContext } from "@/app/contexts/useContext";
import { useEffect } from "react";
import PaginaBase from "@/app/pageBase";
import styled from "styled-components";

const MainEstilizado = styled.main`
  height: 100vh;
  background-color: #1a1a1a;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default function CriarPagina() {
  const inputs = [
    {
      tipo: "text",
      obrigatorio: true,
      placeholder: "Digite o nome da sala...",
      nomeInput: "nomeSala",
      nomeLabel: "Nome da Sala",
    },
  ];
  const { acessarPagina } = useAutenticacaoContext();

  useEffect(() => {
    acessarPagina();
  }, [acessarPagina]);

  return (
    <PaginaBase>
      <MainEstilizado>
        <Formulario
          titulo="Criar Nova Sala"
          inputs={inputs}
          linkUrl="area-do-jogador"
          linkTexto={{
            pergunta: "",
            resposta: "Voltar para a área do jogador",
          }}
          textoSubmit="Criar Sala"
          texto="Digite um nome para sua sala de truco"
        />
      </MainEstilizado>
    </PaginaBase>
  );
}
