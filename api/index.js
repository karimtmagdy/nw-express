// import 'dotenv/config'
import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'
// import express from 'express'

// const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/favicon.ico", (req, res) => {
  res.status(204).send();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})