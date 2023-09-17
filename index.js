import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path"
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
const port = 3000;
const passToSecrets = "ILoveProgramming";
var userAuth = false;
app.use(bodyParser.urlencoded({extended: true}));

function passwordCheck(req,res,next){
    if(req.body["password"]===passToSecrets){
        userAuth = true;
    }
    next();
}

app.use(passwordCheck);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/check",(req,res)=>{
    if(userAuth){
        res.sendFile(__dirname+"/public/secret.html");
    }else{
        res.redirect("/");
    }
})


app.listen(port,()=>{
    console.log(`Server listening at port ${port}`);
})