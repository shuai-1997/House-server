var fs=require("fs")
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
 /*
  type : 1省、   2市 、3县 
  * */
 var catSchema = new Schema({
    id: String,  
    pid: String,
    cityname:String,
    type:String
    
  });
const City = mongoose.model("city", catSchema);

   /*fs.readFile("./purity-city.txt","utf-8",function(err,data){
   		var citys=data.split("|").forEach((i)=>{
   			var detailsCity=i.split(",")
   			
   			var city = new City({
			 	  id: detailsCity[0],
			 	  pid:detailsCity[1], 
			 	  cityname:detailsCity[2],
			 	  type:detailsCity[3],
			});
	       	city.save(function (err,ret) {
				if (err) {
						console.log("保存失败")
				} else {
						
						console.log(ret)
				}
			})
			
   		})
		
		

   })*/
  module.exports=City
  