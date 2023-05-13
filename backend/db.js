const mongoose= require('mongoose');
const mongoURI = "mongodb+srv://aryanmakhija0407:Jl9lMb8wzcdzc7DD@inotebook.yqlfjvm.mongodb.net/?retryWrites=true&w=majority";
// const mongoURI = `mongodb+srv://{procee.env.REACT_APP_ID}:{procee.env.REACT_APP_PASSWORD}@inotebook.yqlfjvm.mongodb.net/?retryWrites=true&w=majority`;



const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectToMongo;