const { TodoServices } = require("@services");
const formatResponseAPI = require("@utils");

const getAllTodoController = async (req, res) => {
  try {
    const todos = await TodoServices.getAllTodos();

    return res
      .status(200)
      .send(formatResponseAPI.success("Todos fetched successfully", todos));
  } catch (error) {
    return res
      .status(500)
      .send(formatResponseAPI.error("Internal server error", error));
  }
};

const getTodoByIdController = async (req, res) => {
  const { id } = req.params;

  if (typeof parseInt(id) !== "number") {
    return res.status(400).send(formatResponseAPI.error("Invalid product id"));
  }

  try {
    const todo = await TodoServices.getTodoById(parseInt(id));

    if (!todo) {
      return res.status(400).send(formatResponseAPI.error("Product not found"));
    }

    return res.send(
      formatResponseAPI.success("Product fetched successfully", todo)
    );
  } catch (error) {
    return res
      .status(500)
      .send(formatResponseAPI.error("Internal server error", error));
  }
};

const postTodoController = async (req, res) => {
  const { title, description, archived } = req.body;

  // const imageUrl = req.file
  //   ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  //   : null;

  if (!title || !description) {
    // // hapus file nya jika data tidak lengkap
    // if (req.file) fs.unlinkSync(req.file.path);

    return res
      .status(422)
      .send(formatResponseAPI.error("Please provide all required fields"));
  }

  try {
    const todo = await TodoServices.createTodo({
      title,
      description,
      archived,
    });

    return res
      .status(201)
      .send(formatResponseAPI.success("Product created", todo));
  } catch (error) {
    // // hapus file nya jika ada error
    // if (req.file) fs.unlinkSync(req.file.path);

    return res
      .status(500)
      .send(formatResponseAPI.error("Internal server error", error));
  }
};

const putTodoController = async (req, res) => {
  const { id } = req.params;
  const { title, description, archived } = req.body;

  // const imageUrl = req.file
  //   ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  //   : null;

  if (typeof parseInt(id) !== "number") {
    return res.status(400).send(formatResponseAPI.error("Invalid product id"));
  }

  if (!title || !description) {
    return res
      .status(422)
      .send(formatResponseAPI.error("Please provide all required fields"));
  }

  try {
    const todo = await TodoServices.updateTodo(parseInt(id), {
      title,
      description,
      archived,
    });

    if (!todo) {
      return res.status(400).send(formatResponseAPI.error("Product not found"));
    }

    return res.send(formatResponseAPI.success("Todo updated", todo));
  } catch (error) {
    return res
      .status(500)
      .send(formatResponseAPI.error("Internal server error", error));
  }
};

const deleteTodoController = async (req, res) => {
  const { id } = req.params;

  if (typeof parseInt(id) !== "number") {
    return res.status(400).send(formatResponseAPI.error("Invalid product id"));
  }

  try {
    const todo = await TodoServices.deleteTodo(parseInt(id));

    if (!todo) {
      return res.status(400).send(formatResponseAPI.error("Product not found"));
    }

    return res.send(formatResponseAPI.success("Todo deleted", todo));
  } catch (error) {
    return res
      .status(500)
      .send(formatResponseAPI.error("Internal server error", error));
  }
};

module.exports = {
  getAllTodoController,
  getTodoByIdController,
  postTodoController,
  putTodoController,
  deleteTodoController,
};
