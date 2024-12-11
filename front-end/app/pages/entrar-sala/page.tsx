"use client";

import CamposSalaPesquisa from "@/app/components/CampoSalasPesquisa";
import SalasDisponiveis from "@/app/components/SalasDisponiveis";
import { useAutenticacaoContext } from "@/app/contexts/useContext";
import PaginaBase from "@/app/pageBase";
import { useEffect } from "react";
import styled from "styled-components";

const MainEstilizado = styled.main`
  min-height: 100vh;
  background-color: #f0f1f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  gap: 100px;

  @media (max-width: 768px) {
    padding: 40px 20px;
    gap: 50px;
  }
`;

export default function EntrarSala() {
  const { acessarPagina } = useAutenticacaoContext();

  useEffect(() => {
    acessarPagina();
  }, [acessarPagina]);

  return (
    <PaginaBase>
      <MainEstilizado>
        <CamposSalaPesquisa />
        <SalasDisponiveis />
      </MainEstilizado>
    </PaginaBase>
  );
}
