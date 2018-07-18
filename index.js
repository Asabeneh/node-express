const express = require("express");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const getIP = require("ipware")().get_ip;
const os = require('os');


const mailInfo = {};
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'asabeneh@gmail.com',
        pass:'xyaz'
    }

})

console.log('what dir',__dirname)

const students = [
    {
        name:'Susansa',
        gender:'female',
        country:'Finland'
    },
    {
        name:'Jaya',
        gender:'Male',
        country:'Finland'
    }
    ,{
        name:'Shora',
        gender:'male',
        country:'Finland'
    }
]

const app = express();
const studentList = [];

app.use(express.static("public/css"));

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',(req,res) => {
     res.sendFile(__dirname + '/'+'index.html')
});

app.get('/students',(req,res) => {
    res.json(students)
});
app.get('/add-student',(req,res) =>{
    res.sendFile(__dirname + '/' + 'add-student.html')
})
app.post('/students-info', (req,res) =>{
let {firstName,lastName, email, subject,message} = req.body;

console.log(req.body)
studentList.push({firstName, lastName, email, subject, message});
console.log(studentList)
const userFeedBack = `<h3>${firstName} ${lastName}, Thank so for contacting us</h3><p> We will contact you soon.<p>`;
const userMessage = `<h4>${subject}</h4> <h3>Sender First name: ${firstName}
<h3>Sender Last name: ${lastName}</h3>

<p>Message</p>:
${message}`;

const mailOptions = {
  from: email,
  to: email,
  subject: subject,
  html: userMessage
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Email sent:", info.response);
  }
});
    res.send(userFeedBack)
})

app.listen(3000, ()=> {
console.log('Server is running on port 3000...')
});

