const { default: mongoose } = require("mongoose");

module.exports = () => {
    // specifies that only fields defined in a schema would be updated in a 'SAVE/UPDATE' query
    mongoose.set("strictQuery", true);
    
    // connecting to mongoDB
    mongoose.connect(process.env.MONGO_DB_URL).then(() => {
        console.log("Connected to DB")
    }).catch(err => {
        console.log("An error occurred while trying to connect to DB.");
        console.log(err);
    })
}