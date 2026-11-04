import * as Yup from "yup";
import Product from "./../models/Product.js";

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // //  REMOVIDO O 'id' DAQUI (ele vem do banco, não do body)
    const { name, price, category_id, offer } = request.body;
    const { filename } = request.file;

    // //  REMOVIDO O 'id' DAQUI TAMBÉM
    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path: filename,
      offer,
    });

    // // O 'newProduct' já vai retornar com o ID gerado pelo PostgreSQL automaticamente!
    return response.status(201).json(newProduct);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // //  REMOVIDO O 'id' DAQUI (ele vem do banco, não do body)
    const { name, price, category_id, offer } = request.body;
    const { id } = request.params;

    let path;
    if (request.file) {
      const { filename } = request.file;
      path = filename;
    }
    // //  REMOVIDO O 'id' DAQUI TAMBÉM
    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: {
          id,
        },
      },
    );

    // // O 'newProduct' já vai retornar com o ID gerado pelo PostgreSQL automaticamente!
    return response.status(201).json();
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: {
        model: "Category",
        as: "category",
        attributes: ["id", "name"],
      },
    });

    return response.status(200).json(products);
  }
}

export default new ProductController();
