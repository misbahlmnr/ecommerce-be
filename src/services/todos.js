const prisma = require("../config/prisma");

class TodoServices {
  static getAllTodos = async (userId) => {
    try {
      const todos = await prisma.todos.findMany({
        where: {
          userId,
        },
      });
      return todos;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getTodoById = async (todoId, userId) => {
    try {
      const todo = await prisma.todos.findUnique({
        where: {
          id: todoId,
          userId,
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

  static deleteTodo = async (todoId, userId) => {
    try {
      const todo = await prisma.todos.delete({
        where: {
          id: todoId,
          userId,
        },
      });
      return todo;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static deleteAllTodos = async (userId) => {
    try {
      const todos = await prisma.todos.deleteMany({
        where: {
          userId,
        },
      });
      return todos;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = TodoServices;
