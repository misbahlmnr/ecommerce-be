const express = require("express");
const {
  getAllTodoController,
  getTodoByIdController,
  postTodoController,
  putTodoController,
  deleteTodoController,
  deleteAllTodoController,
} = require("@controllers/todo");
const upload = require("@middleware/upload");

const router = express.Router();

router.get("/", getAllTodoController);

router.get("/:id", getTodoByIdController);

router.post("/", upload.single("image"), postTodoController);

router.put("/:id", putTodoController);

router.delete("/:id", deleteTodoController);

router.delete("/", deleteAllTodoController);

module.exports = router;
