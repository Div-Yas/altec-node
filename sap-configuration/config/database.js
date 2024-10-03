const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB is connected to the host: ${con.connection.host} `);
    });
};
// // Enable query logging
// mongoose.set('debug', (collectionName, method, query, doc) => {
//   console.log(
//     `Collection: ${collectionName}, Method: ${method}, Query: ${JSON.stringify(query)}`
//   );
// });

module.exports = connectDatabase;
