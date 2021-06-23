const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        maxlength: [60, "`{PATH}` alanı `{VALUE}`, `{MAXLENGTH}`'den küçük olmalıdır."],
        minlength: 4
    },
    surname: String,
    bio: String,
    crearedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema); 