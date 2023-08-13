require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const Book = require("./models/books");
const hbs = require("hbs");
const path = require("path");
const app = express()
const PORT = process.env.PORT || 3000
const LogInCollection = require("./src/routes/mongo");

const routes = require('./src/routes/main');



mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static("public"));
app.use('', routes);

app.set('view engine', 'hbs');
app.set("views", "views");
hbs.registerPartials("views/partials");


app.post('/signup', async (req, res) => {
  const data = {
      name: req.body.name,
      password: req.body.password
  };

  try {
      const checking = await LogInCollection.findOne({ name: req.body.name });

      if (checking && checking.password === req.body.password) {
          res.send("User details already exist");
      } else {
          await LogInCollection.create(data);
          console.log('Data inserted successfully');
      }

      res.status(201).render("login", {
          naming: req.body.name
      });
  } catch {
      res.send("Wrong inputs");
  }
});


app.post('/login', async (req, res) => {
  try {
      const check = await LogInCollection.findOne({ name: req.body.name });

      if (check && check.password === req.body.password) {
          res.status(201).render("index", { naming: `${req.body.password}+${req.body.name}` });
      } else {
          res.send("Incorrect password");
      }
  } catch (e) {
      res.send("Wrong details");
  }
});




//Routes go here
// app.get('/', (req,res) => {
//     res.send({ title: 'Books' });
// })

// app.get('/books', async (req,res)=> {

//   const book = await Book.find();

//   if (book) {
//     res.json(book)
//   } else {
//     res.send("Something went wrong.");
//   }
  
// });

// app.get('/add-note', async (req,res) => {
//   try {
//     await Book.insertMany([
//       {
//         title: "bajoriya",
//         body: "Body text goes here...",
//       },
//       {
//         title: "Games of Thrones",
//         body: "Body text goes here...",
//       }
//     ]);
//     res.json({"Data":"Added"})
//   } catch (error) {
//     console.log("err", + error);
//   }
// })

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})