const express = require('express');
const app = express();
const mongoose =require('mongoose');
const cors = require("cors")

const CarsModel = require("./car")
var router = express.Router();



app.use(express.json());
app.use(cors())
app.use(router)
mongoose.connect("mongodb://localhost:27017",{
    useNewUrlParser: true
})

const conSuccess = mongoose.connection
conSuccess.once('open',_ =>{
    console.log("Database connected");
})

router.route('/addCar').post(async(req,res)=>{
    const name = req.body.name;
      const detail = req.body.detail;
      const price = req.body.price;
    //   const detail = new UserModel(user);
    const newCar = new CarsModel({name: name, detail: detail, price:price});
      await newCar.save();
    
      res.json({msg:'success'});
    })
    

    router.route('/.getCar').get(async(req,res)=>{
        CarsModel.find({}, (err, result) => {
            if (err) {
              res.json(err);
            } else {
              res.json(result);
            }
    });
    });

    app.get('/',(req,res)=>{
        console.log('abcd');
    })

app.listen('3003',()=>{
    console.log('server started');
})








// app.post("/createUser", async (req, res) => {
//       const name = req.body.name;
//       const detail = req.body.detail;
//       const price = req.body.price;
//     //   const detail = new UserModel(user);
//     const newCar = new CarsModel({name: name, detail: detail, price:price});
//       await newCar.save();
    
//       res.json({msg:'success'});
//     });
// app.get("/getCar", (req, res) => {
//     CarsModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });



// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const UserModel = require("./models/Users");

// const cors = require("cors");

// app.use(express.json());
// app.use(cors());

// mongoose.connect(
//   "mongodb+srv://user123:Password123Tech@cluster0.j7fql.mongodb.net/merntutorial?retryWrites=true&w=majority"
// );

// app.get("/getUsers", (req, res) => {
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.post("/createUser", async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();

//   res.json(user);
// });

// app.listen(3001, () => {
//   console.log("SERVER RUNS PERFECTLY!");
// });