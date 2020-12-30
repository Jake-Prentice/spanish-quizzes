const router = require("express").Router({mergeParams: true});

router.get("/", (req,res) => {
    res.json("configs area")
})

module.exports = router;