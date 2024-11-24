import styled from "styled-components";

const DivEstilizado = styled.div<{ ativo: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;

  div {
    border-radius: 100%;
    background-color: ${({ ativo }) => (ativo ? "#22c55e" : "#374151")};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
  }
`;

interface CampoJogadorProps {
  numeroJogador: string;
  nomeJogador: string;
  ativo: boolean;
}

export default function CampoJogador({
  numeroJogador,
  nomeJogador,
  ativo,
}: CampoJogadorProps): JSX.Element {
  return (
    <DivEstilizado ativo={ativo}>
      <div>
        <p>{numeroJogador}</p>
      </div>

      <p>{nomeJogador}</p>
    </DivEstilizado>
  );
}
