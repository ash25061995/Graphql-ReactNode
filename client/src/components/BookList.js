import React,{useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {getBooks} from '../queries/queries';
import BookDetails from './BookDetails';



const BookList = () => {
    const [id,setId]=useState(null)
    const res = useQuery(getBooks);
    function displayBooks(){
        console.log(res.data)
        if (res.loading) {
            return <h1>loading...</h1>
        } else if (res.error) {
            return <h1>Oops something went wrong...</h1>
        }
        return res.data.books.map(book => {
            return (
                <li key={book.id} onClick={()=>{setId(book.id)}}>{book.name} by author {book.author.name}</li>
                )
        })
    }

    return (
        <div>
            <ul id="book-list">
                 {displayBooks()}
            </ul>
            <BookDetails id={id}/>
        </div>)

};

export default BookList;