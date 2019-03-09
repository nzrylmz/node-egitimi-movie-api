const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://heroku_q9dfm6jn:heroku_q9dfm6jn@ds117681.mlab.com:17681/heroku_q9dfm6jn', {useNewUrlParser:true, useCreateIndex:true});
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    }).on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
};