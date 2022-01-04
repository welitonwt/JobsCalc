const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"


const profile = {

    name: "Weliton",
    avatar: "https://avatars.githubusercontent.com/u/95891521?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
    

}



routes.get('/', (require, res) => res.render(views + "index"))
routes.get('/job', (require, res) => res.render(views + "job"))
routes.get('/job/edit', (require, res) => res.render(views + "job-edit"))
routes.get('/profile', (require, res) => res.render(views + "profile", { profile }))



module.exports = routes;