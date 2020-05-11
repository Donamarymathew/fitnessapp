const express=require('express');
const bodyParser=require('body-parser');
const postRouter=require('./routes/Routes');
const errorLogger=require('./utilities/ErrorLogger');
const requestLogger=require('./utilities/RequestLogger');
const cors=require("cors");
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/post', postRouter);
app.use(errorLogger);


console.log("Server listening in port 4000");
app.listen(4000);
module.exports=app;