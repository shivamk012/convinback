import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import express from 'express';
import cors from "cors";
import {insertUser , login , updateCards , addCard , updateHistory} from './services.js';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// require('./routes')(app)
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./build")));

const port = process.env.PORT || '8000';

let dbClient = null;

app.get(/^(?!\/api).+/, (req,res)=>{
    res.sendFile(path.join(__dirname, './build/index.html'));
})

async function main(){
    console.log(port);
    const uri = process.env.MONGODB;
    console.log(uri);
    const client = new MongoClient(uri);
    try{
        await client.connect();

        dbClient = client;
        console.log('connected');
    }catch(err){
        console.log(err);
    }
}

app.post('/api/setUser' , (req,res)=>{
    insertUser(dbClient , req.body).then((res1)=>{
        // console.log(res1);
        // res1.data = res1.insertedId;
        res.send(res1);
    })
})

app.post('/api/loginUser' , (req,res)=>{
    login(dbClient , req.body).then((res1)=>{
        res.send(res1);
    })
})

app.post('/api/updateCards' , (req,res)=>{
    console.log(req.body);
    updateCards(dbClient , req.body).then((res1)=>{
        res.send(res1);    
    })
})

app.post('/api/addNewCard' , (req,res)=>{
    addCard(dbClient , req.body).then((res1)=>{
        console.log(res1);
        res.send(res1);
    });
})

app.post('/api/updateUserHistory' , (req , res)=>{
    updateHistory(dbClient , req.body).then(result=>{
        res.send(result);
    })
})

main();
app.listen(port);