var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({    
    name:  {
        type: Schema.Types.String,
        ref: 'users',
        required: true 
    },
    password:  {
        type: Schema.Types.String,
        ref: 'users',
        required: true 
    },
    email:  {
        type: Schema.Types.String,
        ref: 'users'
    },
    phone:  {
        type: Schema.Types.Number,
        ref: 'users',
        required: true 
    },
    licence:  {
        type: Schema.Types.String,
        ref: 'users'
    },
    address:  {
        type: Schema.Types.String,
        ref: 'users'
    },
    username :{
        type: Schema.Types.String,
        ref: 'users'
    }
}, {
    timestamps: true
});


userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);

module.exports = User;