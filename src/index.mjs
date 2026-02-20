import express from "express";
const app = express();

const PORT = 3000;

const users = [
    {id:1, user_name: "navi"},
     {id:2, user_name: "john"},
      {id:3, user_name: "jabez"},
       {id:4, user_name: "onion"},
        {id:5, user_name: "domar"},
]

app.get('/',(req,res)=>{
    res.send({msg : "Root"});
})
//http://localhost:3000/api/users?filter=user_name&value=go
app.get('/api/users',(req,res)=>{

    const {query:{filter, value}}=req;
    console.log(filter,value);
    if(filter && value){
        res.send(users.filter(((user)=>user[filter].toLowerCase().includes(value))))
    }
    res.send(users);
})

app.get('/api/users/:id',(req,res)=>{
    const id = Number.parseInt(req.params.id);
    if(Number.isNaN(id)){
       return res.status(400).send({
            msg:"Bad Request, Invalid ID"
        }) 
    }
    const user =users.find((user)=> user.id===id);
    console.log(user)
    if(user){
        return res.send(user);
    }
    return res.status(404).send("User Not Found")

})
app.use(express.json());

app.post('/api/users',(req,res)=>{
    console.log(req.body)
    const {body}= req;
    const newUser={id: users[users.length-1].id+1, ...body};
    users.push(newUser);
    return res.status(201).send(newUser);
});

//put - update (Complete Update)
app.put('api/users/:id',(req,res)=>{
     const id = Number.parseInt(req.params.id);
    if(Number.isNaN(id)){
       return res.status(400).send({
            msg:"Bad Request, Invalid ID"
        }) 
    }
    const user =users.find((user)=> user.id===id);
    console.log(user)
    if(userIndex === -1){
        return res.status(404).send("User Not Found");
    }
    users[userIndex]={id: id,}

})

app.patch('/api/users/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send({ msg: "Invalid ID" });

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) return res.status(404).send("User Not Found");

    // Merge the existing user data with the new body data
    users[userIndex] = { ...users[userIndex], ...req.body };

    return res.status(200).send(users[userIndex]);
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send({ msg: "Invalid ID" });

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) return res.status(404).send("User Not Found");

    // Remove 1 element at the found index
    users.splice(userIndex, 1);

    return res.sendStatus(200); // Or 204 (No Content)
});

app.listen(PORT , ()=>{
    console.log(`App is running on Port ${PORT}`);
})