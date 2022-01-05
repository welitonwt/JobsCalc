const express = require('express');
const req = require('express/lib/request');
const routes = express.Router()

const views = __dirname + "/views/"


const profile = {

    name: "Weliton",
    avatar: "https://avatars.githubusercontent.com/u/95891521?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
    

}

const Job = {

    data:[
        
            {
                id: 1,
                name: "Pizzaria Guloso",
                "daily-hours": 2,
                "total-hours": 1,
                created_at: Date.now()
            },
            {
                id: 2,
                name: "OneTwo Project",
                "daily-hours": 3,
                "total-hours": 47,
                created_at: Date.now() 
            }
        
    ],

    controllers: {
        index(req, res){    
                const updatedJobs = Job.data.map((job) => {
            
                    const remaining = Job.services.remainingDays(job)
                    const status = remaining <= 0 ? 'done' : 'progress'
            
                    return {
                        ...job,
                        remaining,
                        status,
                        budget: profile["value-hour"] * job["total-hours"]
            
                    }
                })
                    
               return res.render(views + "index", {jobs: updatedJobs})            
            },


        create(req, res) {

            const lastId = Job.data[Job.data.length - 1]?.id || 1;
            
            Job.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
        
            })
        
        
            return res.redirect('/')
        
        }
        },

        services:{
            remainingDays(job){

                const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            
                const createdDate = new Date(job.created_at)
                const dueDay = createdDate.getDate() + Number(remainingDays)
                const dueDateInMs = createdDate.setDate(dueDay)
            
                const timeDiffInMs = dueDateInMs - Date.now()
            
                //transformar milli em dias
                const dayInMs = 1000 * 60 * 60 * 24
                const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            
            // restam x dias
                return dayDiff
            
            }
        }
    }




routes.get('/', Job.controllers.index)

routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', Job.controllers.create)
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))



module.exports = routes;