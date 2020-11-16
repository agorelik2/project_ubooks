const router = require("express").Router();
const favoritesController = require("../../controllers/favoritesController");

router
  .route("/")
  .get(favoritesController.findAll)
  .post(favoritesController.create);

router
  .route("/:id")
  .get(favoritesController.findById)
  .put(favoritesController.remove)
  .delete(favoritesController.remove);

module.exports = router;
