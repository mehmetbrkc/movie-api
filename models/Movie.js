//Modals dosyasi oldugundan class isminin bas harfi buyuk

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        maxlength: [20, "(`{PATH}`) alanı (`{VALUE}`), (`{MAXLENGTH}`)'den küçük olmalıdır."],
        minlength: [3, "(`{PATH}`) alanı (`{VALUE}`), (`{MINLENGTH}`)'den büyük olmalıdır."]
    },
    category: {
        type: String,
        maxlength: [10, "(`{PATH}`) alanı (`{VALUE}`), (`{MAXLENGTH}`)'den küçük olmalıdır."]
    },
    country: String,
    year: Number,
    imdb_score: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema); 