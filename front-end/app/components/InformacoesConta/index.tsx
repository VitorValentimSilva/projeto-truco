import { useDadosUsuarioContext } from "@/app/contexts/useContext";
import styled from "styled-components";

const DivEstilizada = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  width: 30%;
  height: auto;
  padding: 40px;

  #divNome {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 30px;

    h3 {
      font-size: 28px;
    }

    #campoFoto {
      background-color: #d1fae5;
      border-radius: 100%;
      padding: 28px;

      svg {
        width: 55px;
        height: 55px;
        color: #059669;
      }
    }
  }

  #divEmail {
    display: flex;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      gap: 10px;

      h5 {
        font-weight: 100;
        font-size: 16px;
      }

      p {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 70%;
    padding: 20px;

    #divNome {
      gap: 20px;

      h3 {
        font-size: 24px;
      }

      #campoFoto {
        padding: 20px;
        svg {
          width: 45px;
          height: 45px;
        }
      }
    }

    #divEmail {
      div {
        h5 {
          font-size: 14px;
        }

        p {
          font-size: 16px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 15px;

    #divNome {
      gap: 15px;

      h3 {
        font-size: 20px;
      }

      #campoFoto {
        padding: 15px;

        svg {
          width: 40px;
          height: 40px;
        }
      }
    }

    #divEmail {
      div {
        h5 {
          font-size: 12px;
        }

        p {
          font-size: 14px;
        }
      }
    }
  }
`;

export default function InformacoesConta() {
  const { usuario } = useDadosUsuarioContext();

  return (
    <DivEstilizada>
      <div id="divNome">
        <div id="campoFoto">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <div>
          <h3>{usuario?.nome}</h3>
        </div>
      </div>

      <div id="divEmail">
        <div>
          <h5>Email</h5>
          <p>{usuario?.email}</p>
        </div>
      </div>
    </DivEstilizada>
  );
}
