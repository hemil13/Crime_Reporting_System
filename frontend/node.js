// require the installed packages
var express = require('express')
var multer = require('multer');
//CREATE EXPRESS APP
var app = express();
app.use(express.static(__dirname, { index: 'report.html' }));
// SET STORAGE
var store = multer.diskStorage({
    destination: "multiple",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})
var upload = multer({ storage: store })
app.post('/uploadfile', upload.single('report'), (req, res) => {
    const files = req.files
    if (files) {
        res.set("content-type", "text/html")
        res.write("<h2>Your Report has been uploaded </h2>")
        res.send()
    }
})
app.listen(6788);