import styled from "styled-components";

const SectionEstilizado = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 400px;
  background-color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    height: auto;
    padding: 50px 20px;
  }
`;

const DivEstilizada = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 350px;
  text-align: center;
  padding: 0 30px;

  div {
    background-color: #d1fae5;
    padding: 15px;
    border-radius: 100%;

    svg {
      width: 40px;
      height: 40px;
      color: #059669;

      @media (max-width: 768px) {
        width: 30px;
        height: 30px;
      }
    }
  }

  h3 {
    font-size: 25px;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  p {
    font-size: 17px;

    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
`;

export default function InformacoesDoSite() {
  return (
    <SectionEstilizado>
      <DivEstilizada>
        <div>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <h3>Salas Personalizadas</h3>
        <p>
          Crie salas privadas e desafie seus amigos para partidas emocionantes
        </p>
      </DivEstilizada>

      <DivEstilizada>
        <div>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h3>Totalmente Gratuito</h3>
        <p>Ambiente seguro e moderado para sua diversão</p>
      </DivEstilizada>

      <DivEstilizada>
        <div>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <h3>Rápido e Responsivo</h3>
        <p>Jogue em qualquer dispositivo sem travamentos</p>
      </DivEstilizada>
    </SectionEstilizado>
  );
}
