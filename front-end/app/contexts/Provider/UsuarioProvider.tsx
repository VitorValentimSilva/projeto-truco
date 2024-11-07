"use client";

import { useEffect, useState } from "react";
import useContexts from "../Context";
import { DadosUsuario } from "../Context";
import axios from "axios";
import { useRouter } from "next/navigation";

export const linkBackEnd = "https://projeto-truco.onrender.com";

export const UsuarioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [usuario, setUsuario] = useState<DadosUsuario | null>(null);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split("; ").map((cookie) => cookie.trim());
    const tokenCookie = cookies.find((row) => row.startsWith("token="));

    if (tokenCookie) {
      const tokenValue = tokenCookie.split("=")[1];

      if (tokenValue) {
        setIsAutenticado(true);

        const obterDadosUsuario = async () => {
          try {
            console.log("Buscando dados do usuário...");
            const response = await axios.get(`${linkBackEnd}/usuarios/`, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${tokenValue}`,
              },
            });
            const usuarioLogado = response.data.usuarioLogado;

            setUsuario({
              id: usuarioLogado.usu_id,
              nome: usuarioLogado.usu_nome,
              email: usuarioLogado.usu_email,
              senha: usuarioLogado.usu_senha,
            });
          } catch (error) {
            console.error("Erro ao obter dados do usuário:", error);
            document.cookie =
              "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            setIsAutenticado(false);
          }
        };

        obterDadosUsuario();
      } else {
        console.error("Token não encontrado no cookie.");
        setIsAutenticado(false);
      }
    }

    console.log("Cookies atuais:", document.cookie);
  }, []);

  const autenticarUsuario = async (
    dados: DadosUsuario,
    tipo: "Cadastrar" | "Entrar"
  ) => {
    setMensagemErro(null);

    try {
      let response;

      const url =
        tipo === "Cadastrar"
          ? `${linkBackEnd}/usuarios/`
          : `${linkBackEnd}/auth/token`;

      response = await axios.post(url, dados);

      console.log("Dados enviados com sucesso:", response.data);

      document.cookie = `token=${response.data.token}; path=/;`;
      console.log("Cookies após a definição:", document.cookie);

      setUsuario(response.data.usuario);
      setIsAutenticado(true);

      if (tipo == "Cadastrar") {
        router.push("entrar");
      } else {
        router.push("area-do-jogador");
      }
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

  const alterarDadosUsuario = async (
    dados: DadosUsuario,
    tipo: "TodosDados" | "AlgumDado"
  ) => {
    setMensagemErro(null);

    try {
      const url = `${linkBackEnd}/usuarios/`;
      const response =
        tipo == "TodosDados"
          ? await axios.put(url, dados)
          : await axios.patch(url, dados);

      console.log("Dados alterados com sucesso:", response.data);

      setUsuario(response.data.usuario);
      if (response.data.token) {
        document.cookie = `token=${response.data.token}; path=/;`;
      }

      setIsAutenticado(true);
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

  const acessarPagina = () => {
    if (!isAutenticado) {
      router.push("entrar");
    }
  };

  const logout = () => {
    setIsAutenticado(false);
  };

  return (
    <useContexts.DadosUsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
        autenticarUsuario,
        mensagemErro,
        setMensagemErro,
        alterarDadosUsuario,
      }}
    >
      <useContexts.AutenticacaoContext.Provider
        value={{ isAutenticado, setIsAutenticado, acessarPagina, logout }}
      >
        {children}
      </useContexts.AutenticacaoContext.Provider>
    </useContexts.DadosUsuarioContext.Provider>
  );
};
