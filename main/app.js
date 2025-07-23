const express=require("express");
require('dotenv').config({ path: __dirname + '/.env' });
const jwt =require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const path =require("path");
const cors=require("cors");
const fs = require("fs").promises;
const db = require("./db.js")
const bcrypt=require("bcrypt")

const PORT=process.env.PORT || 3000

const app =express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:`http://localhost:${PORT}` , credentials: true}));
app.use(express.static(path.join(__dirname, "frontend")));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function checkPassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

//*FRONTEND

//scermata home
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

//schermata login
app.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "login.html"));
});

app.get("/signin", async (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "signin.html"));
});


//*API

//logout
app.post("/api/logout", async (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.json({ ok: true });
});


//checktoken
app.get("/api/checktoken", async (req,res)=>{
  jwt.verify(req.cookies.token||false, process.env.JWT_KEY,(err,decoded)=>{
    if (err) {
      res.clearCookie("token", { path: "/" });
      return res.status(403).json({ok: false});
    }
    
    res.json({ok: true});
  })
});

//login
app.post("/api/login", async (req,res)=>{
  const username=req.body.username
  const password=req.body.password

  if (!username || !password){
    return res.status(400).json({ok: false})
  }
  let userdata= await db.getUserLoginData(username);

  if (!userdata){
    return res.status(401).json({ok: false})
  }

  if (await checkPassword(password, userdata.password)){
    const token = jwt.sign({ id: userdata.id }, process.env.JWT_KEY, { expiresIn: '7d' });
   
    res.cookie('token', token, {
      httpOnly: true,   
      secure: false,                //! DA CAMBIARE QUANDO METTI HTTPS
      maxAge: 1000*60*60*24*7   
    });
    res.json({ ok: true });

  }else{
    return res.status(401).json({ok: false})
  }
});

//singin
app.post("/api/signin", async (req,res)=>{
  const {username, name, surname, email, password}=req.body

  if (!username || !password || !name || !surname || !email){
    return res.status(400).json({ok: false, err:"Tutti i campi sono obbligatori"})
  }
  
//da qua va implementato signin

  if (await checkPassword(password, userdata.password)){
    const token = jwt.sign({ id: userdata.id }, process.env.JWT_KEY, { expiresIn: '7d' });
   
    res.cookie('token', token, {
      httpOnly: true,   
      secure: false,                //! DA CAMBIARE QUANDO METTI HTTPS
      maxAge: 1000*60*60*24*7   
    });
    res.json({ ok: true });

  }else{
    return res.status(401).json({ok: false})
  }
});
