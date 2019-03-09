const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@ds261155.mlab.com:61155/heroku_fg7l8395', {useNewUrlParser:true, useCreateIndex:true});
    mongoose.connection.on('open', () => {
        //console.log('MongoDB: Connected');
    }).on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
};