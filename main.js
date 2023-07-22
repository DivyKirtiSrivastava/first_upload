const express = require("express")
const path = require("path")
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const port = 80;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contact');
  // console.log("we are connected bro")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const contactSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Password: String,
    ConfirmPassword: String,
    EmailId: String,
    Phone: String,
    Address: String
  });

const Contact = mongoose.model('Contact', contactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // for serving static file
app.use(express.urlencoded())

// PUG SPACIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "this is the best website"
    const params = {'title': 'Fill the form', "content": con}
    res.status(200).render('..//views/main.pug', params)
})
app.post('/', (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("this data is saved into database")
  }).catch(()=>{
    res.status(400).send("this data is not saved into database")
  });
    // console.log(req.body)
    // const params = {'message': 'your form is submitted successfully'}
    // res.status(200).render('../Express/views/main.pug', params)
})


//START THE SERVER
app.listen(port, ()=>{
    console.log(`the application start successfully on port ${port}`)
});
