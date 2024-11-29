import mysql from "mysql2";

export default class Database {
  #conexao;

  get conexao() {
    return this.#conexao;
  }
  set conexao(conexao) {
    this.#conexao = conexao;
  }

  constructor() {
    this.#conexao = mysql.createPool({
      host: "database-1.cbe62gymiqoh.us-east-1.rds.amazonaws.com",
      port: 3306,
      database: "projeto_truco",
      user: "admin",
      password: "valentim123",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  Rollback() {
    var cnn = this.#conexao;

    return new Promise(function (res, rej) {
      cnn.query("ROLLBACK", function (error, results, fields) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
    });
  }

  Commit() {
    var cnn = this.#conexao;

    return new Promise(function (res, rej) {
      cnn.query("COMMIT", function (error, results, fields) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
    });
  }

  ExecutaComando(sql, valores) {
    var cnn = this.#conexao;

    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
    });
  }

  ExecutaComandoNonQuery(sql, valores) {
    var cnn = this.#conexao;

    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) {
          rej(error);
        } else {
          res(results.affectedRows > 0);
        }
      });
    });
  }

  ExecutaComandoLastInserted(sql, valores) {
    var cnn = this.#conexao;

    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) {
          rej(error);
        } else {
          res(results.insertId);
        }
      });
    });
  }
}
