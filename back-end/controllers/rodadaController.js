import RodadaEntity from "../entities/rodadaEntity.js";
import EquipeRepository from "../repositories/equipeRepository.js";
import MaoRepository from "../repositories/maoRepository.js";
import RodadaRepository from "../repositories/rodadaRepository.js";

export default class RodadaController {
  async obter(req, res) {
    try {
      let { id } = req.params;
      let rodada = new RodadaRepository();
      let result = await rodada.obter(id);

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "Rodada não encontrado!" });
      }
    } catch (ex) {
      res.status(500).json({ msg: ex.message });
    }
  }

  async gravar(req, res) {
    try {
      let { maoId, equipeVencedora } = req.body;

      if (maoId > 0 && equipeVencedora > 0) {
        let maoRepo = new MaoRepository();
        let mao = await maoRepo.obter(maoId);

        if (!mao) {
          return res.status(404).json({ msg: "Mão não encontrada!" });
        }

        let equipeRepo = new EquipeRepository();
        let equipe = await equipeRepo.obter(equipeVencedora);

        if (!equipe) {
          return res.status(404).json({ msg: "Equipe não encontrada!" });
        }

        let repo = new RodadaRepository();
        let entidade = new RodadaEntity(0, maoId, equipeVencedora);
        let result = await repo.gravar(entidade);

        if (result) {
          res
            .status(201)
            .json({ msg: "Rodada gravado com sucesso!", rodada: result });
        } else {
          throw new Error("Erro ao inserir a rodada no banco de dados");
        }
      } else {
        res
          .status(400)
          .json({ msg: "Parâmetros não informados corretamente!" });
      }
    } catch (ex) {
      console.error("Erro ao gravar rodada:", ex);
      res.status(500).json({ msg: ex.message });
    }
  }
}
