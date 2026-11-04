import Sequelize, { Model } from "sequelize";

class Product extends Model {
  // Define os campos da tabela de produtos e suas propriedades
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-files/${this.path}`; // Retorna a URL completa do arquivo do produto, combinando o caminho base com o valor do campo "path"
          },
        },
      },
      {
        sequelize,
        tableName: "products", // nome da tabela no banco de dados
      },
    );
    return this; // Retorna o próprio Model (boa prática do Sequelize)
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id", // chave estrangeira na tabela de produtos que referencia a tabela de categorias
      as: "category", // nome do relacionamento (para acessar a categoria de um produto, por exemplo)
    });
  }
}

export default Product; // Exporta o Model Product para ser utilizado em outras partes da aplicação
