import { Card } from "../CampoJogo";
import styled from "styled-components";

const DivEstilizada = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 150px;
    height: 200px;
    margin: 10px;
  }

  p {
    color: white;
    font-size: 22px;
  }
`;

interface CampoCartasJogoProps {
  cartaVira: Card | null;
  cartasJogadas: Card[];
}

export default function CampoCartasJogo({
  cartaVira,
  cartasJogadas,
}: CampoCartasJogoProps): JSX.Element {
  return (
    <DivEstilizada>
      {cartaVira ? (
        <div>
          <p>Vira</p>
          <img
            src={cartaVira.image || "/path/to/default/image.jpg"} // Adiciona fallback
            alt={`${cartaVira.value} de ${cartaVira.suit}`}
          />
        </div>
      ) : (
        <p>Carregando a vira...</p>
      )}

      <div>
        <p>Cartas Jogadas:</p>
        {cartasJogadas.length > 0 ? (
          cartasJogadas.map((carta, index) => (
            <img
              key={index}
              src={carta.image || "/path/to/default/image.jpg"} 
              alt={`${carta.value} de ${carta.suit}`}
            />
          ))
        ) : (
          <p>Nenhuma carta jogada ainda.</p>
        )}
      </div>
    </DivEstilizada>
  );
}
