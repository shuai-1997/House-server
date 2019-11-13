let Koa=require('koa')
let server=new Koa();

 var Static=require("koa-static")
   server.use(Static("./src"))



let Router=require('koa-router')
var router=new Router()

let {City,Houses,Housedetails,resoldApartment,Let,admin}=require('./mongo')

let body=require("koa-body")
server.use(body())

let cors=require("koa2-cors")
server.use(cors())

let multer = require("koa-multer")

//登录
router.post("/admin",async (ctx,next)=>{
	let web=ctx.request.body;
	
	let res=await admin.findOne({userName:web.userName})
	if(res){
		if(res.pwd==web.pwd){
			ctx.body='登录成功'
		}else{
			ctx.body='密码错误'
			
		}
	}else{
		
		ctx.body='用户不存在'
	}
	
 	
 })

//处理前段上传来的图片资源
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'src/upload/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})

let upload = multer({storage});

//接收图片
router.post("/upload",upload.single("file"),(ctx,next)=>{
	ctx.body=ctx.req.file.filename//返回文件名
	           
})


//城市
router.get("/city",async (ctx,next)=>{
	let data=ctx.query
 	ctx.body=await City.find({pid:ctx.query.pid})
 	
 })
//发布二手房
router.post("/publishHouse",async (ctx,next)=>{
	let data=ctx.request.body;
	let one = new resoldApartment(data)
	await one.save()
 	ctx.body={state:1}
 	
 })
//发布出租
router.post("/let",async (ctx,next)=>{
	let data=ctx.request.body;
	let one = new Let(data)
	await one.save()
 	ctx.body={state:1}
 	
 })

//出租房条件筛选
router.post("/filtrateLet",async (ctx,next)=>{
	let res=ctx.request.body[0]
	let query=ctx.request.body[1]
	let sort=ctx.request.body[2]
	console.log(res)
	console.log(query)
	let data=await Let.find(res).skip((+query.current-1)*+query.size).limit(+query.size).sort(sort)
	console.log(data)
 	ctx.body=data
 })
//二手房条件筛选
router.post("/filtrateSecond",async (ctx,next)=>{
	let res=ctx.request.body[0]
	let query=ctx.request.body[1]
	let sort=ctx.request.body[2]
	console.log(res)
	console.log(query)
	let data=await resoldApartment.find(res).skip((+query.current-1)*+query.size).limit(+query.size).sort(sort)
	console.log(data)
 	ctx.body=data
 })
//后台出租房
router.get("/findLet",async (ctx,next)=>{
	let res=ctx.query
	console.log(res)
	let data=await Let.find()
	console.log(data)
 	ctx.body=data
 })
//删除出租房
router.delete("/deleteLet",async (ctx,next)=>{
	let _id=ctx.query._id
	 let res=await Let.deleteOne({_id})
		console.log(res)
	if (res) {
		ctx.body="删除成功"
	} else{
		ctx.body="删除失败"
		
	}
 })
//后台二手房
router.get("/findSoldApartment",async (ctx,next)=>{
	let res=ctx.query
	console.log(res)
	let data=await resoldApartment.find()
	console.log(data)
 	ctx.body=data
 })
//删除出租房
router.delete("/deleteSoldApartment",async (ctx,next)=>{
	let _id=ctx.query._id
	 let res=await resoldApartment.deleteOne({_id})
		console.log(res)
	if (res) {
		ctx.body="删除成功"
	} else{
		ctx.body="删除失败"
		
	}
 })
//添加楼盘
router.post("/addhouse",async (ctx,next)=>{
	let data=ctx.request.body
	let one=await  new Houses(data)
	one.save()
	ctx.body=one._id
 })
//添加楼盘内的房屋信息
router.post("/addhousedetails",async (ctx,next)=>{
	let data=ctx.request.body
	let one=await  new Housedetails(data)
	one.save()
	console.log(one)
	ctx.body='添加成功，房屋'
 })
//后台查找楼盘
router.get("/findhouse",async (ctx,next)=>{
	let data=ctx.query
	let one=await  Houses.find()
	
	console.log(one)
	ctx.body=one
 })
//后台删除楼盘
router.delete("/deletehouse",async (ctx,next)=>{
	let data=ctx.query
	let one=await  Houses.deleteOne(data)
	
	console.log(one)
	ctx.body='删除成功'
 })
//后台查找新房
router.get("/findhousedetails",async (ctx,next)=>{
	let data=ctx.query
	console.log(data)
	let one=await  Housedetails.find(data)
	console.log(one)
	ctx.body=one
 })
 server.use(router.routes())
 server.listen(3000,err=>{
	console.log('后台服务器已监听3000端口号')
})