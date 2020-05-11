const express=require('express');
const router=express.Router();
const postService=require('../service/Service');
const postModel=require('../model/post');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());





// get all  detail
router.get('',(req,res,next)=>{
    postService.getDetails().then((response)=>{
        res.json(response);
    }).catch((err)=>next(err));
})


//add details
router.post('', (req, res, next) => {
    const obj = new postModel(req.body);
  
    postService.addDetails(obj).then((response) => {
        res.json( response.message);
    }).catch((err) => next(err))
})


// //get delete an employee  based on empId
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    
     postService.deleteDetails(id).then((response) => {
        res.json(response.message);
    }).catch((err) => next(err))
})


//create table
router.post('/create', (req, res, next) => {
    
  
    postService.create().then((response) => {
        res.json( response.message);
    }).catch((err) => next(err))
})
    module.exports=router;
    