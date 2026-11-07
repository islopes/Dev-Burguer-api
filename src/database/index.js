import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import User from "../app/models/User.js";
import databaseConfig from "../config/database.cjs";
import Product from "../app/models/Product.js";
import Category from "../app/models/Category.js";

const models = [User, Product, Category]; // Array contendo todos os modelos (models) da aplicação, que serão inicializados e associados ao banco de dados

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      ); // Inicializa os modelos e associações, se houver com o operador ternário para verificar se o método associate existe antes de chamá-lo
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/devburguer",
    );
  }
}

export default new Database();
