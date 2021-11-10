const express = require('express');
const fileUpload = require('express-fileupload');
const { createClient } = require("webdav");

const fs = require('fs');
const app = express();
const port = 8000

const client = createClient("https://tubcloud.tu-berlin.de/remote.php/dav/files/[...]/", {
    username: "",
    password: ""
});



// default options
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.post('/upload', function(req, res) {
    console.log(req.files.sampleFile.name)




     fs
    .createReadStream(req.files.sampleFile.tempFilePath)
    .pipe(client.createWriteStream(req.files.sampleFile.name));


    console.log("finished")

    

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
