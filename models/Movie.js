const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var date = new Date();
var thisYear = date.getFullYear();

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunludur!'],
        maxlength: [20, '{PATH} alanı en fazla `{MAXLENGTH}´ karakter içerebilir!'],
        minlength: [2, '{PATH} alanı en az `{MINLENGTH}´ karakter içermelidir!']
    },
    category: {
        type: String,
        maxlength: [20, '{PATH} alanı en fazla `{MAXLENGTH}´ karakter içerebilir!'],
        minlength: [2, '{PATH} alanı en az `{MINLENGTH}´ karakter içermelidir!']
    },
    country: {
        type: String,
        maxlength: [20, '{PATH} alanı en fazla `{MAXLENGTH}´ karakter içerebilir!'],
        minlength: [2, '{PATH} alanı en az `{MINLENGTH}´ karakter içermelidir!']
    },
    year: {
        type: Number,
        max: [thisYear, '{PATH} alanı en fazla {MAX} olabilir!'],
        min: [1945, '{PATH} alanı en az {MIN} olabilir!']
    },
    imdb_score: {
        type: Number,
        required: [true, '{PATH} alanı zorunludur!'],
        max: [10.0, '{PATH} alanı maksimum {MAX} olabilir!'],
        min: [0.1, '{PATH} alanı minimum {MİN} olabilir!']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);