import mongoose from 'mongoose';  //Import mongoose module

const MovieSchema = new mongoose.Schema({  //Movie schema to to hold user info
    title: {
        type: String,
        required: true
    },
   summary: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true
    }

}
);

const Movies = mongoose.model('movies', MovieSchema); //Create a model named movies.  

export default Movies;  //Exporting the movies model so it can be accessed by the application