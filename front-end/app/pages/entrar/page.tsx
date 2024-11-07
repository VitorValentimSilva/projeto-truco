"use client";

import Formulario from "@/app/components/Formulario";
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

export default function Entrar() {
  const inputs = [
    {
      tipo: "email",
      obrigatorio: true,
      placeholder: "seu@email.com",
      nomeInput: "email",
      nomeLabel: "Email",
    },
    {
      tipo: "password",
      obrigatorio: true,
      placeholder: "********",
      nomeInput: "senha",
      nomeLabel: "Senha",
    },
  ];

  return (
    <PaginaBase>
      <MainEstilizado>
        <Formulario
          titulo="Entrar no FIPPTruco"
          inputs={inputs}
          linkUrl="cadastrar"
          linkTexto={{
            pergunta: "Ainda não tem uma conta?",
            resposta: "Cadastre-se aqui",
          }}
          textoSubmit="Entrar"
        />
      </MainEstilizado>
    </PaginaBase>
  );
}
