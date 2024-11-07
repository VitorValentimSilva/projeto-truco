"use client";

import { useState } from "react";
import useContexts, { DadosSala } from "../Context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDadosUsuarioContext } from "../useContext";
import { linkBackEnd } from "./UsuarioProvider";

export const SalaProvider = ({ children }: { children: React.ReactNode }) => {
  const [salas, setSalas] = useState<DadosSala[] | null>(null);
  const router = useRouter();
  const { setMensagemErro } = useDadosUsuarioContext();
  const [salaEscolhida, setSalaEscolhida] = useState<DadosSala | null>(null);

  const cadastroSala = async (dados: DadosSala) => {
    try {
      let response;

      const url = `${linkBackEnd}/salas/`;

      response = await axios.post(url, dados);

      console.log("Dados enviados com sucesso:", response.data);

      router.push("area-do-jogador");
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

  const todasSalas = async () => {
    try {
      const url = `${linkBackEnd}/salas/`;
      const response = await axios.get(url);

      console.log("Todas as salas:", response.data);

      setSalas(response.data);
    } catch (error: unknown) {
      console.error("Erro ao buscar as salas:", error);
    }
  };

  return (
    <useContexts.DadosSalaContext.Provider
      value={{
        salas,
        setSalas,
        cadastroSala,
        todasSalas,
        salaEscolhida,
        setSalaEscolhida,
      }}
    >
      {children}
    </useContexts.DadosSalaContext.Provider>
  );
};
