const { TodoServices } = require("@services");
const formatResponseAPI = require("@utils");

const getAllTodoController = async (req, res) => {
  const userId = req.user.id;
  try {
    const todos = await TodoServices.getAllTodos(userId);

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
  const userId = req.user.id;
  const { id } = req.params;

  if (typeof parseInt(id) !== "number") {
    return res.status(400).send(formatResponseAPI.error("Invalid todo id"));
  }

  try {
    const todo = await TodoServices.getTodoById(parseInt(id), userId);

    if (!todo) {
      return res.status(400).send(formatResponseAPI.error("Todo not found"));
    }

    return res.send(
      formatResponseAPI.success("Todo fetched successfully", todo)
    );
  } catch (error) {
    return res
      .status(500)
      .send(formatResponseAPI.error("Internal server error", error));
  }
};

const postTodoController = async (req, res) => {
  const userId = req.user.id;
  const { title, description, archived } = req.body;

  if (!title) {
    return res
      .status(422)
      .send(formatResponseAPI.error("Please provide all required fields"));
  }

  try {
    const todo = await TodoServices.createTodo({
      title,
      description,
      archived,
      userId,
    });

    return res
      .status(201)
      .send(formatResponseAPI.success("Todo created", todo));
  } catch (error) {
    return res
      .status(500)
      .send(formatResponseAPI.error("Internal server error", error));
  }
};

const putTodoController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, description, archived } = req.body;

  if (typeof parseInt(id) !== "number") {
    return res.status(400).send(formatResponseAPI.error("Invalid todo id"));
  }

  if (!title) {
    return res
      .status(422)
      .send(formatResponseAPI.error("Please provide all required fields"));
  }

  try {
    const todo = await TodoServices.updateTodo(parseInt(id), {
      title,
      description,
      archived,
      userId,
    });

    if (!todo) {
      return res.status(400).send(formatResponseAPI.error("Todo not found"));
    }

    return res.send(formatResponseAPI.success("Todo updated", todo));
  } catch (error) {
    return res
      .status(500)
      .send(formatResponseAPI.error("Internal server error", error));
  }
};

const deleteTodoController = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  if (typeof parseInt(id) !== "number") {
    return res.status(400).send(formatResponseAPI.error("Invalid todo id"));
  }

  try {
    const todo = await TodoServices.deleteTodo(parseInt(id), userId);

    if (!todo) {
      return res.status(400).send(formatResponseAPI.error("Todo not found"));
    }

    return res.send(formatResponseAPI.success("Todo deleted", todo));
  } catch (error) {
    return res
      .status(500)
      .send(formatResponseAPI.error("Internal server error", error));
  }
};

const deleteAllTodoController = async (req, res) => {
  const userId = req.user.id;

  try {
    const todo = await TodoServices.deleteAllTodos(userId);

    return res.send(formatResponseAPI.success("All todo deleted", todo));
  } catch (err) {
    return res.status(500).send(formatResponseAPI.error(err.message, err));
  }
};

module.exports = {
  getAllTodoController,
  getTodoByIdController,
  postTodoController,
  putTodoController,
  deleteTodoController,
  deleteAllTodoController,
};
