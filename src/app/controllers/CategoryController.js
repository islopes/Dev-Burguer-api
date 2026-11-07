import * as Yup from "yup";
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
    const { filename } = request.file; // Obtém o arquivo enviado na requisição (se houver)

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
      path: filename, // Salva o nome do arquivo no campo "package" do modelo Category
    });

    // // O 'newProduct' já vai retornar com o ID gerado pelo PostgreSQL automaticamente!
    return response.status(201).json(newCategory);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // //  REMOVIDO O 'id' DAQUI (ele vem do banco, não do body)
    const { name } = request.body;
    const { id } = request.params; // Obtém o ID da categoria a ser atualizada a partir dos parâmetros da rota

    let path;
    if (request.file) {
      const { filename } = request.file; // Obtém o arquivo enviado na requisição (se houver)
      path = filename;
    }

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return response.status(400).json({ error: "Category already exists" });
    }

    // //  REMOVIDO O 'id' DAQUI TAMBÉM
    await Category.update(
      {
        name,
        path, // Salva o nome do arquivo no campo "package" do modelo Category
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
    const categories = await Category.findAll();

    return response.status(200).json(categories);
  }
}

export default new CategoryController();
