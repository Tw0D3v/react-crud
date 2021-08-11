const userCtrl ={};
const User = require("../models/User");

userCtrl.getUsers = async(req,res)=>{

    const Users = await User.find()
    res.json(Users)
}

userCtrl.createUsers = async(req,res)=>{

   const {username} = req.body;
    newUser = new User({username});
    await newUser.save(); 
   res.json('user create')
}
userCtrl.deleteUsers= async(req,res)=>{
await  User.findByIdAndDelete(req.params.id)
res.json('user deleted')
}


module.exports = userCtrl;