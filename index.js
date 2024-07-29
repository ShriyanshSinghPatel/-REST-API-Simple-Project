const express = require("express");
const app = express();
const port = 8080;
const path= require("path");
const {v4:uuidv4}=require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id: uuidv4(),
        username: "Shriyansh",
        content: "love Gaming"
    },
    {
        id: uuidv4(),
        username: "Rohit",
        content: "love Circket"
    },
    {
        id: uuidv4(),
        username: "Jonathan",
        content: "love Esport"
    }
];



app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts")
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs" ,{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log("port  is listining");
});






// const express = require("express");
// const app = express();
// const port = 3000;

// app.set("view engine","ejs");


// app.listen(port,()=>{
//     console.log(`port is listining ${port}`)
// });
// app.use((req,res)=>{
//     console.log("request received");
//     res.send("<h1>THIS is web response</h1>");
// })
// app.get("/",(req,res)=>{
//     res.send("this is a root path");
// })
// app.get("/apple",(req,res)=>{
//     res.send("this is a apple path");
// })
// app.get("/orange",(req,res)=>{
//     res.send("this is a orange path");
// })
// app.get("/banana",(req,res)=>{
//     res.send("this is a banana path");
// })
// app.post("/",(req,res)=>{
//     res.send("this is post request");
// })

// app.get("/:username",(req,res)=>{
//     let {username} = req.params;
//     let htmlcode=`<h1>welcome to the page @${username}</h1>`
//     res.send(htmlcode)
// })

// app.get("/ejs",(req,res)=>{
//     res.render("home.ejs");
// })