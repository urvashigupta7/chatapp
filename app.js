var express=require("express");
var app=express();
var socket=require("socket.io");
var bodyparser=require("body-parser")
var people=[];

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static('public'));
app.get('/',function(req,res)
{
    res.render("user.ejs");
})
app.post("/start",function(req,res)
{
    // var username=req.body.newuser;
    // var friend=req.body.friendname;
    var data={
        username:req.body.newuser,
        friend:req.body.friend
    }
    res.render("index.ejs",{data:data});
})
var server=app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("server has started");
})
var io=socket(server);
io.on("connection",function(socket)
{
    console.log('a user connected'+socket.id)
    //   people.push(socket.id)

    socket.on('chat',function(data)
    {
       
        console.log(people[data.friend])
        // people[data.handle]=socket.id;
         console.log(data.handle+":"+data.message);
         io.to(people[data.friend]).emit('chat',data);
          io.to(people[data.handle]).emit('chat',data);
        // io.sockets.emit('chat',data);
    })
    socket.on('join',function(data) {
        people[data.handle]=socket.id;
        console.log(socket.id);
         io.to(people[data.friend]).emit('join',data);
         
        
        // socket.broadcast.emit('join',data);
        
    })
    
    // socket.on('disconnect',function(data) {
    //     socket.broadcast.emit('left',data);
    // })
    socket.on('typing',function(data)
    {
         io.to(people[data.friend]).emit('typing',data);
          
    })
  
})