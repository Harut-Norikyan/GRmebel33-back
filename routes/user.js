const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

router.post("/add-user", UserController.registration);
router.get("/login", UserController.login);
router.get("/get-users", auth, UserController.getUsers);
router.put("/update-user-by-id", auth, UserController.updateUserById);
router.delete("/remove-user", auth, UserController.removeUserById);

module.exports = router;