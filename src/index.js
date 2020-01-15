const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://federal:<godfederal>@cluster0-shard-00-00-up92e.mongodb.net:27017,cluster0-shard-00-01-up92e.mongodb.net:27017,cluster0-shard-00-02-up92e.mongodb.net:27017/week?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

app.use(express.json());
app.use(routes);

app.listen(3333);