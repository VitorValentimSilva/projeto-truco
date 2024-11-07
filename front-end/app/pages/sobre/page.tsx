"use client";

import CampoInicial from "@/app/components/CampoInicial";
import CampoValores from "@/app/components/CampoValores";
import JogueAgora from "@/app/components/JogueAgora";
import NossaHistoria from "@/app/components/NossaHistorio";
import PaginaBase from "@/app/pageBase";
import styled from "styled-components";

const SectionEstilizada = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 100px;
  padding-bottom: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
  }

  @media (max-width: 768px) {
    gap: 20px;
    padding: 20px;
  }
`;

export default function Sobre() {
  return (
    <PaginaBase>
      <main>
        <CampoInicial
          titulo="Sobre o FIPPTruco"
          subTitulo="A melhor experiência de truco online"
        />

        <NossaHistoria />

        <SectionEstilizada>
          <CampoValores
            titulo="Nossa Missão"
            texto="Proporcionar a melhor experiência de truco online, conectando jogadores de todo o Brasil em um ambiente seguro e divertido, preservando a essência do jogo tradicional."
            tipo="Missão"
          />

          <CampoValores titulo="Nossos Valores" tipo="Valores" />
        </SectionEstilizada>

        <JogueAgora />
      </main>
    </PaginaBase>
  );
}
