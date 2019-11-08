const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/house',{ useNewUrlParser: true, useUnifiedTopology: true  });
 mongoose.connection.on("connected",err=>{
	if (!err) {
		console.log("数据库开启成功")
	}
	
})
 const Let = mongoose.model("let",{
  	imgArr:Array,
	type:String, //出租类型
	name:String, //名称
	housetype:String, //户型
	bedroomcount:Number,//卧室数量
	floor:Number, //楼层
	houseArea:Number, //面积
	direction:String, //朝向
	price:Number, //价钱
	appellation:String, //称呼
	tel:String, //联系方式
	introduce:String, //描述
	address:String,//详细地址
	Area:String,//区域
	facility:Array, //配套设置
  	time:{
  		type:Date,
  		default:new Date()
  	}
  });
  async function one(){
  	let a={ type: { $in: [ '单间' ] } }
  	 let one =await Let.find(a)
  	 console.log(a)
 	 console.log(one)
  }
 one()
