import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        category: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-files/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: "products",
      },
    );
    return this; // Retorna o próprio Model (boa prática do Sequelize)
  }
}

export default Product;
