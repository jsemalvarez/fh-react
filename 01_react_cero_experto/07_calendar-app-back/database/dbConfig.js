const mongoose = require("mongoose");


const dbConnection = async(uriConnection) => {
    try {
        await mongoose.connect(uriConnection,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });
        
    } catch (error) {
        console.log(error)
        throw new Error('Error database connection');
    }
}

module.exports = {
    dbConnection
}