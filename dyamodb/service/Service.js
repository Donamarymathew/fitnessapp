const postdb=require('../model/Model');
let postservice={}




//get all details 
postservice.getDetails=()=>{
    return postdb.getDetails().then( async data=>{
        console.log("returned data is",data);   
        if(data==null){
            let err=new Error("No detail available!");
            err.status=404;
            throw err;
        }
        else{
            console.log("inside service");
            return data;
        }
    })
}




//add details
postservice.addDetails=((obj)=>{
            return postdb.findDetails(obj.id).then((data)=>{
                if(data){
                    console.log("already",data);
                    let err= new Error("Already inserted");
                    err.status=500;
                    throw err;
                }
                else{
                    return postdb.addDetails(obj).then((data)=>{
                        console.log("data",data);
                        if(data){
                        return {"message": "Successfully added details with ID: "+data}
                    }
                        else{
                            let err= new Error("Sorry not Inserted");
                            err.status=500;
                            throw err;
                        }
                    })
                }
            })
    
          })

// //delete employee
postservice.deleteDetails=(id)=>{
    
     
    return postdb.deleteDetails(id).then(data=>{

        if(data){
            return {"message":"Deleted details with ID: "+data};
        }
        else{
            let err=new Error("Failed to delete ");
            err.status=403;
            throw err;
        }
    })

    
}

//creata table
postservice.create=((obj)=>{
  
        
            return postdb.create().then((data)=>{
                console.log("data",data);
                if(data){
                return {"message": "Successfully created table"}
            }
                else{
                    let err= new Error("Sorry not Inserted");
                    err.status=500;
                    throw err;
                }
            })
        
    })



module.exports=postservice;