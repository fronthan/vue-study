const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const db = require('./database');

app.use(bodyParser.json());

app.get('/api/memos', async (req, res) => {
  const result = await db.run("SELECT * FROM memos");
  res.send(result)
})

app.post('/api/memos', async (req, res) => {
  await db.run('INSERT INTO memos "content" = ?', [req.body.content]);
  const result = await db.run("SELECT * FROM memos")

  // memos.push(req.body.content);
  res.send(result)
});

app.put('/api/memos/:id', async (req, res) => {
  await db.run('UPDATE memos SET content = ? WHERE id = ?', [req.body.content, req.params.id]);
  
  const result = await db.run("SELECT * FROM memos");
  
  //[req.params.id] = req.body.content;

  res.send(result);
})

app.delete('/api/memos/:id', async (req, res) => {
  await db.run('DELETE FROM memos WHERE id = ?', [req.params.id]);

  const result = await db.run('SELECT * FROM memos');

  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
