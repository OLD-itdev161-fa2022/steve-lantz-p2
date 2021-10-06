
import mongoose from 'mongoose';  //Import mongoose module

const UserSchema = new mongoose.Schema({  //User schema to to hold user info
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', UserSchema); //Create a model named user.  (Object?)

export default User;  //Exporting the user model so it can be accessed by the application