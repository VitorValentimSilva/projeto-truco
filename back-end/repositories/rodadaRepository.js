import RodadaEntity from "../entities/rodadaEntity.js";
import BaseRepository from "./baseRepository.js";

export default class RodadaRepository extends BaseRepository {
  constructor(db) {
    super(db);
  }

  async obter(id) {
    let sql = "SELECT * FROM tb_rodada WHERE rod_id = ?";
    let valores = [id];
    let row = await this.db.ExecutaComando(sql, valores);

    return this.toMap(row[0]);
  }

  async gravar(entidade) {
    let sql = "INSERT INTO tb_rodada (mao_id, eqp_vencedora) VALUES (?, ?)";
    let valores = [entidade.maoId, entidade.equipeVencedora];
    let insertId = await this.db.ExecutaComandoLastInserted(sql, valores);

    if (insertId) {
      return await this.obter(insertId);
    } else {
      return null;
    }
  }

  toMap(rows) {
    if (rows && typeof rows.length == "number") {
      let lista = [];

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let rodada = new RodadaEntity();

        rodada.id = row["rod_id"];
        rodada.maoId = row["mao_id"];
        rodada.equipeVencedora = row["eqp_vencedora"];

        lista.push(rodada);
      }

      return lista;
    } else if (rows) {
      let rodada = new RodadaEntity();

      rodada.id = rows["rod_id"];
      rodada.maoId = rows["mao_id"];
      rodada.equipeVencedora = rows["eqp_vencedora"];

      return rodada;
    } else {
      return null;
    }
  }
}
