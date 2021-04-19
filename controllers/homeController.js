var courses = [
    {
        title: "Raspberry Cake",
        cost: 50
    },
    {
        title: "Artichocke",
        cost: 20
    },
    {
        title: "Burger",
        cost: 100
    },
]
module.exports = {
    index: (req, res) => {
        res.render("index");
    }
}