import Sequelize, { Model } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/category-files/${this.path}`; // Retorna a URL completa do arquivo do produto, combinando o caminho base com o valor do campo "path"
          },
        },
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
