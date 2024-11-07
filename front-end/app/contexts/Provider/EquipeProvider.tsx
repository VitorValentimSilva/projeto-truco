"use client";

import { useState } from "react";
import useContexts, { DadosEquipe } from "../Context";
import axios from "axios";
import { linkBackEnd } from "./UsuarioProvider";

export const EquipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [equipes, setEquipes] = useState<DadosEquipe[] | null>(null);
  const [equipe, setEquipe] = useState<DadosEquipe | null>(null);

  const todasEquipes = async () => {
    try {
      const url = `${linkBackEnd}/equipes/`;
      const response = await axios.get(url);

      console.log("Todas as equipes:", response.data);

      setEquipes(response.data);
    } catch (error: unknown) {
      console.error("Erro ao buscar as equipes:", error);
    }
  };

  return (
    <useContexts.DadosEquipeContext.Provider
      value={{ equipe, setEquipe, equipes, setEquipes, todasEquipes }}
    >
      {children}
    </useContexts.DadosEquipeContext.Provider>
  );
};
