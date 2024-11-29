"use client";

import { useState } from "react";
import useContexts, { DadosMao } from "../Context";
import axios from "axios";
import { useDadosUsuarioContext } from "../useContext";
import { linkBackEnd } from "./UsuarioProvider";

export const MaoProvider = ({ children }: { children: React.ReactNode }) => {
  const [maos, setMaos] = useState<DadosMao | null>(null);
  const { setMensagemErro } = useDadosUsuarioContext();

  const cadastroMao = async (dadosMao: DadosMao) => {
    try {
      console.log(dadosMao)
      let response;
      const url = `${linkBackEnd}/maos/`;

      response = await axios.post(url, dadosMao);

      console.log("Dados enviados com sucesso:", response.data);

      setMaos(response.data.mao);
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
    <useContexts.DadosMaoContext.Provider
      value={{
        maos,
        setMaos,
        cadastroMao,
      }}
    >
      {children}
    </useContexts.DadosMaoContext.Provider>
  );
};
