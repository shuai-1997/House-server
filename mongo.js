let City = require('./city/createCityMongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/house',{ useNewUrlParser: true, useUnifiedTopology: true  });
 mongoose.connection.on("connected",err=>{
	if (!err) {
		console.log("数据库开启成功")
	}
	
})
//楼盘信息
const Houses = mongoose.model("houses",{
	name:String, //楼盘名
    Area:String, //区域
    address:String,//楼盘地址
    SellingAddress:String, //销售部地址
    ageLimit:String,//产权年限
	totalPrice:Number, // 总价格
	unitPrice:Number ,  //单价
	houseType:Array, //户型
	
	houseTypeImg:String,//户型图
	type:String, //类型：写字楼，商铺 住宅
	SellingTime:Date, //开售时间
	publicityImg:String,//宣传图
	contactTel:String,//联系方式
    state:String, //销售状态
    fitment:String, //装修状况
    floorArea:String,//占地面积
    coveredArea:String,//建筑面积
    towerCount:String,//楼栋总数
    tenementCost:String,//物业费详情
    afforest:String//绿化率
  });
  //房子信息
  const House = mongoose.model("house",{
  	belongHousesID:String,//所属楼盘ID
	belongHouses:String,//所属楼盘
	acreage:Number, //面积
	houseType:String, //户型
	bedroomNum:Number, //卧室数量
	
  });
  //二手房
  const resoldApartment = mongoose.model("resoldApartment",{
  	imgArr:Array,//图片
  	name:String,//名称
  	Area:String, //区域
  	address:String,//房屋地址
  	price:Number,//价格
  	houseType:String,//户型
  	bedroomcount:Number,//卧室数量
  	direction:String,//朝向
  	acreage:Number, //面积
  	age:Number,//楼龄
  	fitment:String,//装修状态
  	floor:Number,//楼层
  	tel:String,	//电话
  	introduce:String,//评价
  	appellation:String,//称呼
  	downPayment:Number,//首付
  	time:{
  		type:Date,
  		default:new Date()
  	}
  });
   //出租
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
 module.exports={City,Houses,House,resoldApartment,Let}