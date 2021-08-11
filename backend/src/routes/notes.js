const { Router } = require("express");
const router = Router();

const {
  getNotes,
  creatNotes,
  updateNotes,
  deletedNotes,
  getNote,
} = require("../controllers/notes.Controllers");
router
  .route("/")

  .get(getNotes)
  .post(creatNotes);

router.route("/:id").get(getNote).put(updateNotes).delete(deletedNotes);

module.exports = router;
