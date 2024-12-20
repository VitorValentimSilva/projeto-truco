import MaoEntity from "../entities/maoEntity.js";
import EquipeRepository from "../repositories/equipeRepository.js";
import JogoRepository from "../repositories/jogoRepository.js";
import MaoRepository from "../repositories/maoRepository.js";

export default class MaoController {
  async obter(req, res) {
    try {
      let { id } = req.params;
      let mao = new MaoRepository();
      let result = await mao.obter(id);

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "Mão não encontrado!" });
      }
    } catch (ex) {
      res.status(500).json({ msg: ex.message });
    }
  }

  async gravar(req, res) {
    try {
      let { ordem, codigoBaralho, trucada, valor, jogoId, equipeVencedora } =
        req.body;

      if (
        ordem !== undefined &&
        codigoBaralho !== undefined &&
        trucada !== undefined &&
        valor !== undefined &&
        jogoId > 0 &&
        equipeVencedora > 0
      ) {
        let jogoRepo = new JogoRepository();
        let jogo = await jogoRepo.obter(jogoId);

        if (!jogo) {
          return res.status(404).json({ msg: "Jogo não encontrada!" });
        }

        let equipeRepo = new EquipeRepository();
        let equipe = await equipeRepo.obter(equipeVencedora);

        if (!equipe) {
          return res.status(404).json({ msg: "Equipe não encontrada!" });
        }

        let repo = new MaoRepository();
        let entidade = new MaoEntity(
          0,
          ordem,
          codigoBaralho,
          trucada,
          valor,
          jogoId,
          equipeVencedora
        );
        let result = await repo.gravar(entidade);

        if (result) {
          res
            .status(201)
            .json({ msg: "Mão gravado com sucesso!", mao: result });
        } else {
          throw new Error("Erro ao inserir a mão no banco de dados");
        }
      } else {
        res
          .status(400)
          .json({ msg: "Parâmetros não informados corretamente!" });
      }
    } catch (ex) {
      console.error("Erro ao gravar mão:", ex);
      res.status(500).json({ msg: ex.message });
    }
  }

  async alteracaoParcial(req, res) {
    try {
      let {
        id,
        ordem,
        codigoBaralho,
        trucada,
        valor,
        jogoId,
        equipeVencedora,
      } = req.body;

      if (
        id &&
        (ordem !== undefined ||
          codigoBaralho !== undefined ||
          trucada !== undefined ||
          valor !== undefined ||
          (jogoId > 0 && equipeVencedora > 0))
      ) {
        let entidade = new MaoEntity(
          id,
          ordem,
          codigoBaralho,
          trucada,
          valor,
          jogoId,
          equipeVencedora
        );
        let repo = new MaoRepository();
        let maoAtualizado = await repo.alteracaoParcial(entidade);

        if (maoAtualizado) {
          res.status(200).json({
            msg: "Alteração parcial realizada com sucesso!",
            mao: maoAtualizado,
          });
        } else {
          throw new Error("Erro ao executar a atualização no banco de dados");
        }
      } else {
        res.status(400).json({ msg: "Informe os parâmetros corretamente!" });
      }
    } catch (ex) {
      res.status(500).json({ msg: ex.message });
    }
  }
}
