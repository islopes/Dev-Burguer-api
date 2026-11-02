import Sequelize, { Model } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "categories",
      },
    );
    return this; // Retorna o próprio Model (boa prática do Sequelize)
  }
}

export default Category;
