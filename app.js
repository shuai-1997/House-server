let Koa=require('koa')
let server=new Koa();

 var Static=require("koa-static")
   server.use(Static("./src"))



let Router=require('koa-router')
var router=new Router()

let {City,Houses,House,resoldApartment,Let}=require('./mongo')

let body=require("koa-body")
server.use(body())

let cors=require("koa2-cors")
server.use(cors())

let multer = require("koa-multer")


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
 server.use(router.routes())
 server.listen(3000,err=>{
	console.log('后台服务器已监听3000端口号')
})