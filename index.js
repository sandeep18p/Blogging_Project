const express = require('express');
const mongoose = require('mongoose');


const router = require('./routes');



mongoose.connect('mongodb+srv://sandeeppansari98:san72111@cluster0.xjtdbyi.mongodb.net/?retryWrites=true&w=majority')
.then(res =>{console.log("connected to mongose")})
.catch(err=>{console.log(err)})

const app = express();
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(router)


app.listen(3000,()=>{
    console.log('listening to port')
})