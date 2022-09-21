const express = require("express");
const router = express.Router();
const fs = require("fs");

function readSports() {
    const sportsFile = fs.readFileSync("./data/sports.json");
    const sportsData = JSON.parse(sportsFile);
    return sportsData;
}

// GET endpoint for list of sports offered
router.get("/sports", (req, res) => {
    const sports = readSports();
    const sportsList = sports.map(sport => {
        return (
            {
                "id": sport.id,
                "sport": sport.sport,
                "image": sport.image,
                "hoverImage": sport.hoverImage,
            }
        );
    });
    res.status(200).json(sportsList);
})

router.get("/sports/:sportId", (req, res) => {
    const sports = readSports();
    const specificSportData = sports.find(sport => sport.id === req.params.sportId);

    if (!specificSportData) {
        return res.status(404).json({error: "Sport not found. Please enter a valid sport id"})
    }

    return res.status(200).json(specificSportData);
})

module.exports = router;