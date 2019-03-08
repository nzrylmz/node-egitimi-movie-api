const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, '{PATH} alanı zorunludur!'],
        unique: [true, '`{VALUE}` daha önce alınmış!'],
        maxlength: [20, '{PATH} en fazla `{MAXLENGTH}´ karakter içerebilir!'],
        minlength: [2, '{PATH} en az `{MINLENGTH}´ karakter içermelidir!']
    },
    password: {
        type: String,
        required: [true, '{PATH} alanı zorunludur!'],
        // maxlength: [20, '{PATH} en fazla `{MAXLENGTH}´ karakter içerebilir!'],
        minlength: [2, '{PATH} en az `{MINLENGTH}´ karakter içermelidir!']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);