import React,{useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {getAuthors} from '../queries/queries';



const AddBook = () => {

    const [bookName,setBookName]=useState('')
    const [genre,setGenre]=useState('')
    const [authorId,setAuthorId]=useState('')

    const res=useQuery(getAuthors)
    
    const selectAuthor=()=>{
        if (res.loading) {
            return <h1>loading...</h1>
        } else if (res.error) {
            return <h1>Oops something went wrong...</h1>
        }
       return res.data.authors.map(author=>{
            return <option key={author.id} value={author.id}>{author.name}</option>
        })
    }
    const addBookSubmit=(e)=>{
        e.preventDefault();
        console.log(bookName)
        console.log(genre)
        console.log(authorId)
    }
    return (
        <div className="AddBookForm">
            <form id="add-book" onSubmit={addBookSubmit}>
                <h2>Add Book</h2>
                <table>
                <tr>
                    <td><label>Book name: </label></td>
                    <td>
                        <input type="text" onChange={(e)=>{setBookName(e.target.value)}}/>
                    </td>
                </tr>
                <tr>
                    <td><label>Genre: </label></td>
                    <td>
                        <input type="text" onChange={(e)=>{setGenre(e.target.value)}}/>
                    </td>
                </tr>
                <tr>
                    <td><label>Author: </label></td>
                    <td> 
                    <select id="author" onChange={(e)=>{setAuthorId(e.target.value)}}>
                        <option>select author</option>
                        {selectAuthor()}
                    </select>
                    </td>
                </tr>
                <button type="submit">+</button>
                </table>
            </form>
        </div>
    );
};

export default AddBook;