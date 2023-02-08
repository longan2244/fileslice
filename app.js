
const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express()
const { log } = require('console')
const uploader = require('express-fileupload')
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static(path.join(__dirname, '../serve/static')));
app.use('/', express.static(path.join(__dirname, '../serve/dist')));
app.use(uploader()) //files处理中间件
app.post('/uploadBig', (req, res) => {
  let { msg } = req.body
  try {
    let { data } = req.files.file
    fs.appendFileSync(`./static/${msg}`, data) //追加数据流
  } catch (error) {
  }
  return res.send({
    code: 0,
    data: {
      url: `http://192.168.31.139:5139/static/${msg}`
    }
  })
})
app.listen(5139, () => {
  log('ok');
})