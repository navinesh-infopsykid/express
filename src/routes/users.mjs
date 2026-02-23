import { Router } from "express";

const router = Router();
const users = [
    {id:1, user_name: "navi"},
     {id:2, user_name: "john"},
      {id:3, user_name: "jabez"},
       {id:4, user_name: "onion"},
        {id:5, user_name: "domar"},
]
router.get(
    '/',(req,res)=>{
    res.send({msg : "Root"});
}
)

router.get('/api/users',(req,res)=>{

    const {query:{filter, value}}=req;
    console.log(filter,value);
    if(filter && value){
        res.send(users.filter(((user)=>user[filter].toLowerCase().includes(value))))
    }
    res.send(users);
})

export default router;