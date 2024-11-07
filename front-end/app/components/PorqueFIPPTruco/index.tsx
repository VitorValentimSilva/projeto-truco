import CampoMotivosFIPPTruco from "../CampoMotivosFIPPTruco";
import { SectionEstilizado } from "../JogueOndeQuiser";

export default function PorqueFIPPTruco() {
  return (
    <SectionEstilizado style={{ backgroundColor: `#F3F4F6` }}>
      <h3>Por que Escolher o FIPPTruco?</h3>

      <div id="todasDivs">
        <CampoMotivosFIPPTruco
          svg="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          titulo="Salas Personalizadas"
          texto1="Crie salas privadas"
          texto2="Personalize as regras"
          texto3="Convide amigos por link"
        />

        <CampoMotivosFIPPTruco
          svg="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          titulo="Totalmente Gratuito"
          texto1="Sem custos ocultos"
          texto2="Sem limite de partidas"
          texto3="Recursos premium gratuitos"
        />

        <CampoMotivosFIPPTruco
          svg="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          titulo="Experiência Premium"
          texto1="Interface moderna"
          texto2="Sem anúncios"
          texto3="Suporte prioritário"
        />
      </div>
    </SectionEstilizado>
  );
}
