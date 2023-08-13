const express=require('express')
const { route } = require('express/lib/application')

const routes = express.Router()

routes.get("/",(req,res)=> {
  res.render("index")
})

routes.get("/gallery",(req,res)=> {
    res.render("gallery")
})

routes.get("/contact",(req,res)=> {
  res.render("contact")
})

routes.get("/service",(req,res)=> {
  res.render("service")
})

routes.get("/fzsg",(req,res)=> {
  res.render("fzsg")
})

routes.get("/scheme",(req,res)=> {
  res.render("scheme")
})

routes.get("/login",(req,res)=> {
  res.render("login")
})

routes.get("/signup",(req,res)=> {
  res.render("signup")
})


module.exports=routes