import { ObjectId } from 'mongodb'

export async function insertUser(client , userData){
    try{
        const result = await client.db("ContentCreator").collection("User").insertOne(userData);
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
}

export async function login(client , userData){
    try{
        const result = await client.db("ContentCreator").collection("User").findOne({
            username : userData.username , 
            password : userData.password
        });
        return result;
    }catch(err){
        console.log(err);
    }
}

export async function updateCards(client , userData){
    try{
        const id = new ObjectId(userData.clientId);
        const result = await client.db("ContentCreator").collection("User").updateOne({_id:id} , {$set:{
            cards : userData.cards
        }});
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
}

export async function addCard(client , proData){
    try{
        const result = await client.db("ContentCreator").collection("card").insertOne(proData);
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
        return err;
    }
}

export async function updateHistory(client , data){
    try{
        const id = new ObjectId(data._id);
        const result = await client.db("ContentCreator").collection("User").updateOne({_id:id} , {$set:{
            history : data.history
        }});
        return result;
    }catch(err){
        console.log(err);
    }
}
