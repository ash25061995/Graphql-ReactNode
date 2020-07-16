import {gql} from 'apollo-boost';



export const getAuthors=gql`{
    authors{
        id
        name
    }
}`

export const getBooks = gql`{
    books{
        id
        name
        author{
            name
        }
    }
}`

export const addBookMutation=gql`
mutation addBookMutation($name:String!,$genre:String!,$authorId:ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
        name
        id
    }
    
}`

export const addAuthorMutation=gql`
mutation addAuthorMutation($name:String!,$age:Int!){
    addAuthor(name:$name,age:$age){
        name
        id
    }
}`

export const getBookQuery=gql`
query getBookQuery($id:ID!){
    book(id:$id){
        id
        name
        genre
        author{
            id
            name
            books{
                id
                name
                genre
            }
        }
    }

}`