const express = require('express');
const fileUpload = require('express-fileupload');
const { createClient } = require("webdav");

// const { createAdapter } = require("webdav-fs");

const fs = require('fs');
const app = express();
const port = 8000





// default options
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.post('/upload', function(req, res) {
    console.log(req.files.sampleFile.name)





    

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
