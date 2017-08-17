var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    created_at: {type: Date, default: Date.now}
});
var postSchema = new Schema({
    post: String,
    username : String,
    created_at: { type: Date, default: Date.now }
});

mongoose.model('User', userSchema);
mongoose.model('Post', postSchema);