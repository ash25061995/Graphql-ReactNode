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