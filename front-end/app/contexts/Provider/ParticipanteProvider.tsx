"use client";

import { useState } from "react";
import useContexts, { DadosParticipante } from "../Context";
import axios from "axios";
import { useDadosUsuarioContext } from "../useContext";
import { linkBackEnd } from "./UsuarioProvider";

export const ParticipanteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [participantes, setParticipantes] = useState<DadosParticipante | null>(
    null
  );
  const { setMensagemErro } = useDadosUsuarioContext();

  const cadastroParticipante = async (dadosParticipante: DadosParticipante) => {
    try {
      let response;
      const url = `${linkBackEnd}/participantes/`;

      response = await axios.post(url, dadosParticipante);

      console.log("Dados enviados com sucesso:", response.data);

      setParticipantes(response.data.participante);
    } catch (error: unknown) {
      console.error("Erro:", error);

      if (axios.isAxiosError(error)) {
        setMensagemErro(
          error.response?.data?.msg ||
            "Erro ao enviar os dados. Tente novamente mais tarde."
        );
      } else {
        setMensagemErro("Erro desconhecido. Tente novamente.");
      }
    }
  };

  const fimDeJogo = async (id: number, dtSaida: string) => {
    try {
      const url = `${linkBackEnd}/participantes/`;

      const response = await axios.patch(url, {
        id: id,
        dtSaida: dtSaida,
      });

      console.log(
        "Saída do participante realizada com sucesso:",
        response.data
      );

      setParticipantes(response.data.participante);
    } catch (error: unknown) {
      console.error("Erro ao realizar a saída do participante:", error);

      if (axios.isAxiosError(error)) {
        setMensagemErro(
          error.response?.data?.msg ||
            "Erro ao realizar a saída do participante. Tente novamente mais tarde."
        );
      } else {
        setMensagemErro("Erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <useContexts.DadosParticipanteContext.Provider
      value={{
        participantes,
        setParticipantes,
        cadastroParticipante,
        fimDeJogo,
      }}
    >
      {children}
    </useContexts.DadosParticipanteContext.Provider>
  );
};
