import * as Yup from "yup";
import Product from "./../models/Product.js";

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // //  REMOVIDO O 'id' DAQUI (ele vem do banco, não do body)
    const { name, price, category } = request.body;
    const { filename } = request.file;

    // //  REMOVIDO O 'id' DAQUI TAMBÉM
    const newProduct = await Product.create({
      name,
      price,
      category,
      path: filename,
    });

    // // O 'newProduct' já vai retornar com o ID gerado pelo PostgreSQL automaticamente!
    return response.status(201).json(newProduct);
  }

  async index(_request, response) {
    const products = await Product.findAll();

    console.log(_request.userId);

    return response.status(200).json(products);
  }
}

export default new ProductController();
