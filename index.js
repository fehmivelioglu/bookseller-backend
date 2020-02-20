let express=require("express");
let mongoose=require("mongoose");
let bodyParser=require("body-parser");
let cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();

let port=process.env.port;
let dbcon=process.env.cloud_mongodb_con;
let apiRouter=require("./api-router");

let app=new express();
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect(dbcon,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var con=mongoose.connection;
if(!con){console.log("veritabanına bağlanılamadı")}
else{console.log("veritabanına bağlanıldı")}

//http://localhost/api
app.use("/api",apiRouter)
app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log("node js sorunsuz olarak çalıştı");
})