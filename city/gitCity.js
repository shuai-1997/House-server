 var fs=require("fs")
 fs.readFile("./sqlcity.txt","utf-8",function(err,data){
		
		var city=data.match(/\((.+?)\)/g).join('|').replace(/\(/g,'').replace(/\)/g,'').replace(/'/g,'').replace(/\s*/g,"")
        fs.writeFile("./purity-city.txt",city, err=>{
			if(!err){
				console.log("写入成功")
			}
		 })
		
//		console.log(city)
 })