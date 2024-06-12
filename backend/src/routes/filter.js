const { Router } = require("express");
const Hospital = require("../models/hospital.js");
const router = Router();

router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find({
      category: { $in: req.query.catName },
    });
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
