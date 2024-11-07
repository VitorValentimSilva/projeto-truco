"use client";

import { useState } from "react";
import useContexts, { DadosJogo } from "../Context";
import axios from "axios";
import { useDadosUsuarioContext } from "../useContext";
import { useRouter } from "next/navigation";
import { linkBackEnd } from "./UsuarioProvider";

export const JogoProvider = ({ children }: { children: React.ReactNode }) => {
  const [jogos, setJogos] = useState<DadosJogo | null>(null);
  const router = useRouter();
  const { setMensagemErro } = useDadosUsuarioContext();
  const [isSalaJogo, setIsSalaJogo] = useState(false);

  const cadastroJogo = async (dadosJogo: DadosJogo) => {
    try {
      let response;
      const url = `${linkBackEnd}/jogos/`;

      response = await axios.post(url, dadosJogo);

      console.log("Dados enviados com sucesso:", response.data);

      setJogos(response.data.jogo);
      setIsSalaJogo(true);

      router.push("jogo");
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

  const sairDoJogo = async (id: number, dtFim: string) => {
    try {
      const url = `${linkBackEnd}/jogos/`;

      const response = await axios.patch(url, {
        id: id,
        dtFim: dtFim,
      });

      console.log("Fim do jogo realizada com sucesso:", response.data);

      setJogos(response.data.jogo);

      setIsSalaJogo(false);
    } catch (error: unknown) {
      console.error("Erro ao realizar a saída do jogo:", error);

      if (axios.isAxiosError(error)) {
        setMensagemErro(
          error.response?.data?.msg ||
            "Erro ao realizar a saída do jogo. Tente novamente mais tarde."
        );
      } else {
        setMensagemErro("Erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <useContexts.DadosJogoContext.Provider
      value={{
        jogos,
        setJogos,
        cadastroJogo,
        sairDoJogo,
      }}
    >
      <useContexts.SalaJogoContext.Provider
        value={{ isSalaJogo, setIsSalaJogo }}
      >
        {children}
      </useContexts.SalaJogoContext.Provider>
    </useContexts.DadosJogoContext.Provider>
  );
};
