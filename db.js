const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        var url = 'mongodb://localhost:27017/GRmebel33';
        // var url = 'mongodb://5.63.152.244:27017/GRmebel33';
        // var url = 'mongodb+srv://GRmebel:GagikRoman889@cluster0.t8qsa.mongodb.net/GRmebel33';
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
