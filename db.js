const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        var url = 'mongodb://localhost:27017/GRmebel33';
        await mongoose.connect(url, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
};
module.exports = connectDb;
