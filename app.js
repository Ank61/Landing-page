const express= require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https=require("https")
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  var first = req.body.fn;
  var last = req.body.ln;
  var e  =req.body.email;
  var data={
    members: [
      {
        email_address:e,
        status: "subscribed",
        merge_fields:{
          FNAME: first,
          LNAME: last
        }
            }
    ]
  };
  var jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/759443401e";
  const options= {
    method:"post",
    auth:"Ankit:d619668b17a046367f6dc2d03a662b3b-us14"
  }
  const request = https.request(url, options ,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

})
app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT||3000, function(){//no 3000 is used as now heroku will use theirs!
  console.log(" Server is running");
});
// d619668b17a046367f6dc2d03a662b3b-us14
//759443401e
