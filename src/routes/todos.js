const {
  getAllTodoController,
  getTodoByIdController,
  postTodoController,
  putTodoController,
  deleteTodoController,
  deleteAllTodoController,
} = require("../controllers/todo");

const express = require("express");

const router = express.Router();

router.get("/", getAllTodoController);
router.get("/:id", getTodoByIdController);
router.post("/", postTodoController);
router.put("/:id", putTodoController);
router.delete("/:id", deleteTodoController);
router.delete("/", deleteAllTodoController);

module.exports = router;
