const express = require('express');
const fileUpload = require('express-fileupload');
const { createClient } = require("webdav");


const fs = require('fs');
const app = express();
const port = 8000

const client = createClient("https://tubcloud.tu-berlin.de/remote.php/webdav/", {
    username: "",
    password: ""
});



// default options
app.use(fileUpload({
    useTempFiles : false
}));

app.post('/upload', async function(req, res) {
    console.log(req)
    console.log(req.files.sampleFile.name)
    await client.putFileContents(req.files.sampleFile.name, req.files.sampleFile.data, { onUploadProgress: progress => {
        console.log(`Uploaded ${progress.loaded} bytes of ${progress.total}`);
    } });
    console.log("upload finished")
    res.send()
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
