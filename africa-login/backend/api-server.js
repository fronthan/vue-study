const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const jwtKey = 'scret';

app.use(bodyParser.json());
app.use(cookieParser());

const members = [
  {
    id: 3,
    name: '도서관',
    loginId: 'lib',
    loginPw: 'africa'
  },
  {
    id: 4,
    name: '심재민',
    loginId: 'jmsim',
    loginPw: '1'
  }
]

app.get('/api/account', (req, res) => {
  console.log(req.cookies)
  if(req.cookies && req.cookies.token) {
    jwt.verify(req.cookies.token, jwtKey, (err, decoded)=> {
      if(err) {
        return res.sendStatus(401);
      } 
      res.send(decoded);      
    });    
  } else {
    res.sendStatus(401);
  }
});

app.post('/api/account', (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;

  const member = members.find(m=> m.loginId === id && m.loginPw === pw);

  if(member) {
    const options = {
      domain: "localhost",
      path: "/",
      httpOnly: true
    }

    const token = jwt.sign({
      id: member.id,
      name: member.name,
    }, jwtKey, {expiresIn: "15m",
      issuer: "mj"
    })
    res.cookie("token", token, options);
    res.send(member);
  } else{
    res.sendStatus(404);
  }
});

app.delete('/api/account', (req, res) => {
  if(req.cookies && req.cookies.token) {
    res.clearCookie("token");
  }

  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})