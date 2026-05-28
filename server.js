const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "./announcement.json";

if(!fs.existsSync(FILE)){
  fs.writeFileSync(FILE,"[]");
}

app.get("/api/announcement",(req,res)=>{

  const data =
  JSON.parse(
    fs.readFileSync(FILE)
  );

  res.json(data);

});

app.post("/api/announcement",(req,res)=>{

  const data =
  JSON.parse(
    fs.readFileSync(FILE)
  );

  const newAnnouncement = {
    id: Date.now(),
    ...req.body
  };

  data.push(newAnnouncement);

  fs.writeFileSync(
    FILE,
    JSON.stringify(data,null,2)
  );

  res.json({
    success:true
  });

});

app.delete("/api/announcement/:id",(req,res)=>{

  const id =
  Number(req.params.id);

  let data =
  JSON.parse(
    fs.readFileSync(FILE)
  );

  data =
  data.filter(
    x => x.id !== id
  );

  fs.writeFileSync(
    FILE,
    JSON.stringify(data,null,2)
  );

  res.json({
    success:true
  });

});

app.put("/api/announcement/:id",(req,res)=>{

  const id =
  Number(req.params.id);

  let data =
  JSON.parse(
    fs.readFileSync(FILE)
  );

  data =
  data.map(a=>{

    if(a.id === id){
      return {
        ...a,
        ...req.body
      };
    }

    return a;

  });

  fs.writeFileSync(
    FILE,
    JSON.stringify(data,null,2)
  );

  res.json({
    success:true
  });

});

app.listen(3000,()=>{
  console.log("API aktif");
});
