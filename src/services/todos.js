const prisma = require("@config/prisma");

class TodoServices {
  static getAllTodos = async () => {
    try {
      const todos = await prisma.todos.findMany();
      return todos;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getTodoById = async (id) => {
    try {
      const todo = await prisma.todos.findUnique({
        where: {
          id,
        },
      });
      return todo;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static createTodo = async (data) => {
    try {
      const todo = await prisma.todos.create({
        data: {
          ...data,
        },
      });
      return todo;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static updateTodo = async (id, data) => {
    try {
      const todo = await prisma.todos.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
      return todo;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static deleteTodo = async (id) => {
    try {
      const todo = await prisma.todos.delete({
        where: {
          id,
        },
      });
      return todo;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = TodoServices;
