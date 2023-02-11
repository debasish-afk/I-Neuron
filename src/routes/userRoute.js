const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/userModel");
const UserModel = require("../models/userModel");
const {createValidation,updateValidation}=require("../validator/validation")

router.post("/create",createValidation, async (req, res) => {
  const user = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
  });

  try {
    const createdUser = await user.save();
    return res.status(201).send({ status: true, data: createdUser });
  } catch (err) {
    return res.status(500).send({ status: false, Message: err.Message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const userDoc = await UserModel.findById(req.params.id);
    return res.status(200).send({ status: true, data: userDoc });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
});

router.put("/update/:id",updateValidation, async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).send({ status: true, data: updatedUser });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: { isDeleted: true } },
      { new: true }
    );
    return res.status(200).send({ status: true, data: deletedUser });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
});

module.exports = router;
