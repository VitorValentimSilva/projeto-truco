import { useDadosSalaContext } from "@/app/contexts/useContext";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";

const SectionEstilizada = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 45px;

  p {
    font-size: 30px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    gap: 30px;
    width: 50%;

    p {
      font-size: 20px;
    }
  }

  @media (max-width: 468px) {
    width: 80%;
  }
`;

export const DivEstilizada = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 90px;
  width: 800px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.45);
  transition: transform 0.3s ease;
  gap: 10px;

  &:hover {
    transform: translateY(-8px);
  }

  h3 {
    font-size: 22px;
  }

  button {
    border-radius: 10px;
    padding: 10px 30px;
    border: none;
    cursor: pointer;
    font-size: 17px;
    background-color: #059669;
  }

  button:hover {
    background-color: #059668ae;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;

    h3 {
      font-size: 18px;
    }

    button {
      padding: 8px 20px;
      font-size: 15px;
    }
  }
`;

export default function SalasDisponiveis() {
  const { todasSalas, salas, setSalaEscolhida } = useDadosSalaContext();

  useEffect(() => {
    todasSalas();
  }, []);

  return (
    <SectionEstilizada>
      {salas && salas.length > 0 ? (
        salas.map((sala) => (
          <DivEstilizada key={sala.id}>
            <h3>{sala.nome}</h3>
            <Link href="escolher-equipe" onClick={() => setSalaEscolhida(sala)}>
              <button>Entrar</button>
            </Link>
          </DivEstilizada>
        ))
      ) : (
        <p>Nenhuma sala disponível no momento.</p>
      )}
    </SectionEstilizada>
  );
}
