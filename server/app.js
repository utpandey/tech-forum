const express = require('express');
const cors = require("cors");
const server = require('./models');
const serverConfig = require('./config');
const mongoose = require('mongoose');
require('./models/User');
const resolvers = require("./resolvers");
const typeDefs = require("./types");
const { ApolloServer } = require('apollo-server-express');


const startServer = async() => {
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    const app = express();
    apolloServer.applyMiddleware({ app });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    mongoose.connect(server.connectionUri, server.connectionOptions)
        .then(() => console.log('Connection to database has been established'))
        .catch((error) => console.log('Connection could not be established', error));
    mongoose.connection.on('connected', () => {
        console.log("connected to mongo")
    })
    mongoose.connection.on('error', (err) => {
        console.log("This is error", err)
    })

    app.listen(serverConfig.port, () => {
        console.log("Server running: " + serverConfig.port)
    })
};

startServer();