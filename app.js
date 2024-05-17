const { MongoClient } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express();
const uri = 'mongodb+srv://cse20201062:FZE2OmnQZq8Z2Ls3@cluster0.jkzpqf7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);
const database = client.db('root');
const admins = database.collection('admins');
const artworks = database.collection('artworks');

app.use(express.json())
app.use(cors());
app.get('/admins',async (req,res)=>{
    const namee = req.query.name;
    const passworde= req.query.password;
    
  const resu = await admins.findOne({name: namee})
  
  if(!resu){
    res.json({message: "no such user"}).status(404);
  }else{
    if(resu.password!= passworde){
        res.json({message: "incorrect password"});

    }else{
        res.json({message: "login ok"}).status(200);
    }
  }
})


app.get('/artworks',async (req,res)=>{
    
    
  const resu = await artworks.find({}).toArray()
  console.log(resu)
  
  res.json({artworks : resu}).status(200);
    
  }
)

app.post('/upload',async (req,res)=>{
    const data = req.body
    
    const resu = await artworks.findOne({title: data.title});
    console.log(resu)
    if(!resu){
     const res2 = artworks.insertOne(data)
     res.json({message: "added successfully"})
    }else{
        res.json({message: "artwork already present"})
    }
})

app.listen(4000, async()=>{
    console.log("Listening at 4000 port")
    

 const x = await client.connect();

})