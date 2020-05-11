
var docClient=require('../utilities/DynamoDBClient');
let postmodel={}
let object={}




postmodel.getDetails=async()=>{  
    try{
    var paramsgetall = {
        TableName: "post",
        ProjectionExpression: "id,likes, comments"
        };
    console.log("Scanning post table.");
    object=await docClient.scan(paramsgetall).promise();
    console.log(object);
    return object;
    }
    catch(error){
        console.log(error);
        return null;
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////
postmodel.findDetails=async(id)=>{  
    try{
        var paramsfind = {
            TableName:"post",
            Key:{
               id:id
            },
           
        };
    console.log("Scanning post table.");
    object=await docClient.get(paramsfind).promise();
    console.log(object);
    return object.id;
    }
    catch(error){
        console.log(error);
        return null;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////


     postmodel.addDetails= async function(obj){
         try{
        console.log("inside model");
        console.log(obj);
        var paramsput = {
            TableName: "post",
            Item: {
                "id":  obj.id,
                "likes": obj.likes,
                "comments": obj.comments
                 }
            };
         
         object= await docClient.put(paramsput).promise();
            console.log(object);
            return obj.id;;
        }
        catch(error){
            console.log(error);
            return error;
        }
         
            }
    
   //////////////////////////////////////////////////////////////////////////////////////////////////
   
   

            postmodel.deleteDetails=async function(id){
                try{
            var paramsdelete = {
                TableName:"post",
                Key:{
                   id:id
                },
               
            };
            
            console.log("Attempting a conditional delete...");
          object=await docClient.delete(paramsdelete).promise();
          console.log(object);
          return id;
        }
        catch(error){
    console.log(error);
    return null;
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////

postmodel.create=async function(){
    try{
        var params = {
            TableName: 'post',
            AttributeDefinitions: [
                {
                  AttributeName: 'CUSTOMER_ID',
                  AttributeType: 'N'
                },
                {
                  AttributeName: 'CUSTOMER_NAME',
                  AttributeType: 'S'
                }
              ],
            KeySchema: [
                {
                  AttributeName: 'CUSTOMER_ID',
                  KeyType: 'HASH'
                },
               ],
           
         
            ProvisionedThroughput: {
              ReadCapacityUnits: 1,
              WriteCapacityUnits: 1
            },
            
           
          };

console.log("Attempting to create table...");
  return new Promise((resolve, reject) => {
    docClient.createTable(params, (err, data) => {
      if(err) reject(err);
      else resolve(data);
    })
  })



}
catch(error){
console.log(error);
return null;
}
}


 /////////////////////////////////////////////////////////////////////////////////////////////////////////// 




module.exports=postmodel;