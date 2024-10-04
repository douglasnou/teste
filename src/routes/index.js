import express from "express";
import adms from "./adm.routes.js";
import users from "./user.routes.js";

const routes = (app)=>{
    app.route("/").get((re, res)=> res.status(200).send("Success to connect"));

    app.use(express.json(), adms, users);
};

export default routes;