import BaseEntity from "./baseEntity.js";

export default class RodadaEntity extends BaseEntity {
  #id;
  #maoId;
  #equipeVencedora;

  get id() {
    return this.#id;
  }
  set id(value) {
    this.#id = value;
  }

  get maoId() {
    return this.#maoId;
  }
  set maoId(value) {
    this.#maoId = value;
  }

  get equipeVencedora() {
    return this.#equipeVencedora;
  }
  set equipeVencedora(value) {
    this.#equipeVencedora = value;
  }

  constructor(id, maoId, equipeVencedora) {
    super();
    this.#id = id;
    this.#maoId = maoId;
    this.#equipeVencedora = equipeVencedora;
  }
}
