require('dotenv').config();
const multer = require('multer');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const File = require('./models/file.js')

const app = express();
const upload = multer({ dest: 'uploads/'})
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.DATABASE_URL)

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Upload route
app.post('/upload',upload.single('file') , async (req, res) => {
    // res.send("File uploaded");

    const fileData ={
        path: req.file.path,
        originalName: req.file.originalname,
    }
    if(req.body.password != null && req.body.password !== ''){
        fileData.password = await bcrypt.hash(req.body.password, 10)
    }
    const file = await File.create(fileData);
    // console.log(file)

    // res.(file.originalName)
    res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
    // req.headers.origin will give the base url of the website. For example, if the website is running on localhost:3000, it will return http://localhost:3000. Then we append /file/${file.id} to create a link to the uploaded file.
    
});




// get he file after shareing the link
// app.get('/file/:id', handleDownload)
// app.post('/file/:id', handleDownload)

// calling both diff -> have more efficient way
app.route('/file/:id').get(handleDownload).post(handleDownload)

async function handleDownload(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).send("File not found")
  }

  const file = await File.findById(req.params.id)
  if (!file) {
    return res.status(404).send("File not found")
  }

  if (file.password != null) {
    const password = req.body?.password
    if (password == null) {
      res.render("password")
      return
    }

    if (!(await bcrypt.compare(password, file.password))) {
      res.render("password", { error: true })
      return
    }
  }

  file.downloadCount++
  await file.save()
  console.log(file.downloadCount)

  res.download(file.path, file.originalName)
}

app.listen((process.env.PORT), () => {
    console.log("Server running on port " + process.env.PORT);
});
