"use client";

import { useState } from "react";
import useContexts, { DadosRodada } from "../Context";
import axios from "axios";
import { useDadosUsuarioContext } from "../useContext";
import { linkBackEnd } from "./UsuarioProvider";

export const RodadaProvider = ({ children }: { children: React.ReactNode }) => {
  const [rodadas, setRodadas] = useState<DadosRodada | null>(null);
  const { setMensagemErro } = useDadosUsuarioContext();

  const cadastroRodada = async (dadosRodada: DadosRodada) => {
    try {
      let response;
      const url = `${linkBackEnd}/rodadas/`;

      response = await axios.post(url, dadosRodada);

      console.log("Dados enviados com sucesso:", response.data);

      setRodadas(response.data.rodada);
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

  return (
    <useContexts.DadosRodadaContext.Provider
      value={{
        rodadas,
        setRodadas,
        cadastroRodada,
      }}
    >
      {children}
    </useContexts.DadosRodadaContext.Provider>
  );
};
