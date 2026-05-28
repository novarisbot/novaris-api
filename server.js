const express =
require("express");

const fs =
require("fs");

const cors =
require("cors");

const app =
express();

app.use(cors());

app.use(express.json());

/* announcement */

app.post(
"/api/announcement",
(req,res)=>{

const data =
req.body;

fs.writeFileSync(
"./announcement.json",
JSON.stringify(
data,
null,
2
)
);

res.json({
success:true
});

});

/* get announcement */

app.get(
"/api/announcement",
(req,res)=>{

const data =
JSON.parse(
fs.readFileSync(
"./announcement.json"
)
);

res.json(data);

});

app.listen(
3000,
()=>{

console.log(
"API aktif"
);

});