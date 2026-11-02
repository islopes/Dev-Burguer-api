import * as Yup from "yup";
import Product from "./../models/Product.js";
import Category from "./../models/Category.js";

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // //  REMOVIDO O 'id' DAQUI (ele vem do banco, não do body)
    const { name } = request.body;

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return response.status(400).json({ error: "Category already exists" });
    }

    // //  REMOVIDO O 'id' DAQUI TAMBÉM
    const newCategory = await Category.create({
      name,
    });

    // // O 'newProduct' já vai retornar com o ID gerado pelo PostgreSQL automaticamente!
    return response.status(201).json(newCategory);
  }

  async index(_request, response) {
    const categories = await Category.findAll();

    return response.status(200).json(categories);
  }
}

export default new CategoryController();
