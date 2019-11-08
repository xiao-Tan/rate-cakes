const express = require("express");
const app = express();
app.listen(8000, () => console.log("listening on port 8000"));

//static file
app.use(express.static(__dirname + "/static"));

//for ejs templates
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//for post data
app.use(express.urlencoded({ extended: true }));

//for reading json
app.use(express.json());

//for session
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

//show validation error
const flash = require('express-flash');
app.use(flash());

//for angular app
app.use(express.static(__dirname + '/public/dist/public'));

//require Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cake', { useNewUrlParser: true });

const RateSchema = new mongoose.Schema({
    stars: { type: Number, required: [true, "Star is required"] },
    comment: { type: String, required: true, minlength: [3, "Comment must have at least 3 characters"] },
}, { timestamps: true });

const CakeSchema = new mongoose.Schema({
    baker_name: { type: String, required: true, minlength: [2, "Comment must have at least 2 characters"] },
    image_url: { type: String, required: true },
    rates: [RateSchema]
}, { timestamps: true });

const Rate = mongoose.model("Rate", RateSchema);
const Cake = mongoose.model("Cake", CakeSchema);

app.get('/cakes', (request, response) => {
    Cake.find()
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.get('/cake/:id', (request, response) => {
    Cake.findOne({ _id: request.params.id })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.post('/cake', (request, response) => {
    const one_cake = new Cake(request.body);
    one_cake.save()
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.post('/cake/:id', (request, response) => {
    const one_rate = new Rate(request.body);
    Cake.findOneAndUpdate({ _id: request.params.id }, { $push: { rates: one_rate } }, { runValidators: true })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

