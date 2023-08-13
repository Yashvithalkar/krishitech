// const express = require("express");
// const hbs = require("hbs");
// const app = express();
// const path = require("path");
// const LogInCollection = require("./routes/mongo");

// const routes = require('./routes/main');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use('/static', express.static("public"));
// app.use('', routes);

// app.set('view engine', 'hbs');
// app.set("views", "views");
// hbs.registerPartials("views/partials");

// app.post('/signup', async (req, res) => {
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     };

//     try {
//         const checking = await LogInCollection.findOne({ name: req.body.name });

//         if (checking && checking.password === req.body.password) {
//             res.send("User details already exist");
//         } else {
//             await LogInCollection.create(data);
//             console.log('Data inserted successfully');
//         }

//         res.status(201).render("login", {
//             naming: req.body.name
//         });
//     } catch {
//         res.send("Wrong inputs");
//     }
// });

// app.post('/login', async (req, res) => {
//     try {
//         const check = await LogInCollection.findOne({ name: req.body.name });

//         if (check && check.password === req.body.password) {
//             res.status(201).render("index", { naming: `${req.body.password}+${req.body.name}` });
//         } else {
//             res.send("Incorrect password");
//         }
//     } catch (e) {
//         res.send("Wrong details");
//     }
// });

// app.listen(process.env.PORT || 5556, () => {
//     console.log("Server started");
// });
