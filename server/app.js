const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/graphqlSchema');
const mongoose=require('mongoose');
const cors=require('cors')

//allow cross origin requests
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/graphql_node');
mongoose.connection.once('open',()=>console.log('connected to db'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
const port = 4000;
app.listen(port, () => {
    console.log('server started at ', port)
})