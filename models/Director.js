const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        required: [true, '{PATH} alanı zorunludur!'],
        maxlength: [20, '{PATH} alanı en fazla `{MAXLENGTH}´ karakter içerebilir!'],
        minlength: [2, '{PATH} alanı en az `{MINLENGTH}´ karakter içermelidir!']
    },
    surname: {
        type: String,
        required: [true, '{PATH} alanı zorunludur!'],
        maxlength: [20, '{PATH} alanı en fazla `{MAXLENGTH}´ karakter içerebilir!'],
        minlength: [2, '{PATH} alanı en az `{MINLENGTH}´ karakter içermelidir!']
    },
    bio: {
        type: String,
        maxlength: [300, '{PATH} alanı en fazla `{MAXLENGTH}´ karakter içerebilir!'],
        minlength: [20, '{PATH} alanı en az `{MINLENGTH}´ karakter içermelidir!']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);