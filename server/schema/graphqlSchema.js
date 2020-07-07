const Author = require('../models/author')
const Book = require('../models/book')
const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLList, 
        GraphQLNonNull 
} = require('graphql');


// const bookArray = [
//     {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
//     {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
//     {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
//     {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
//     {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
//     {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
//   ]

// const authorArray = [
//     { id: "1", name: "Mr Bean", age: 56 },
//     { id: "2", name: "J K Rowling", age: 65 },
//     { id: "3", name: "David J", age: 70 }
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {

                return Author(args).save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Book(args).save();
            }

        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})