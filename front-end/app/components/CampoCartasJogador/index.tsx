import styled from "styled-components";
import { Card } from "../CampoJogo";

const DivEstilizada = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  p {
    font-size: 20px;
    color: white;
  }

  img {
    width: 200px;
    height: 270px;
    cursor: pointer;
    transition: transform 0.2s;
  }

  img:hover {
    transform: scale(1.1);
  }
`;

interface CampoCartasJogadorProps {
  cartas: Card[];
  onJogarCarta: (carta: Card) => void;
}

export default function CampoCartasJogador({
  cartas,
  onJogarCarta,
}: CampoCartasJogadorProps): JSX.Element {
  return (
    <DivEstilizada>
      {cartas.length === 0 ? (
        <p>Você não possui cartas!</p>
      ) : (
        <>
          {cartas.map((carta) => (
            <div key={carta.code} className="carta">
              <img
                src={carta.image}
                alt={`${carta.value} of ${carta.suit}`}
                onClick={() => onJogarCarta(carta)}
              />
            </div>
          ))}
        </>
      )}
    </DivEstilizada>
  );
}
