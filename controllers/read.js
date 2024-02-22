const student = require("../models/newModel");

exports.readData = async (req, res) => {
  try {
    if (!req.user) {
      res.send("unauthorized!");
    }
    const result = await student.find({ createdBy: req.user._id });

    res.setHeader("X-myName", "Vishal");

    // res.status(208).json({
    //   message: "Data fetched successfully",
    // });

    res.render("display", {
      data: result,
    });
  } catch (err) {
    res.status(505).json({
      message: err.message,
    });
  }
};

exports.readDataById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await student.find({ _id: id });

    res.render("unique.ejs", {
      data: result,
    });
  } catch (err) {
    res.status(505).json({
      message: err.message,
    });
  }
};
