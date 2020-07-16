import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthors, addBookMutation, addAuthorMutation, getBooks } from '../queries/queries';



const AddBook = () => {

    const [bookName, setBookName] = useState('')
    const [genre, setGenre] = useState('')
    let [authorId, setAuthorId] = useState('')
    const [newAuthorName, setNewAuthorName] = useState('')
    const [newAuthorAge, setNewAuthorAge] = useState(null)
    const [authorFlag, setAuthorFlag] = useState(false)
    const [NewAuthorFlag, setNewAuthorFlag] = useState(false)
    const [addBook] = useMutation(addBookMutation)
    const [addAuthor] = useMutation(addAuthorMutation)

    const res = useQuery(getAuthors)

    const selectAuthor = () => {
        if (res.loading) {
            return <h1>loading...</h1>
        } else if (res.error) {
            return <h1>Oops something went wrong...</h1>
        }
        return res.data.authors.map(author => {
            return <option key={author.id} value={author.id}>{author.name}</option>
        })
    }
    const addBookSubmit = (e) => {
        e.preventDefault();
        if (authorId === '') {
            authorId = res.data.authors.slice(-1)[0].id
        }

        addBook({
            variables: {
                name: bookName,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{ query: getBooks }]
        })
    }
    const addAuthorSubmit = (e) => {
        e.preventDefault();
        addAuthor({
            variables: {
                name: newAuthorName,
                age: parseInt(newAuthorAge)

            },
            refetchQueries: [{ query: getAuthors }]
        })
    }
    const newAuthflagHandler = (e) => {
        if (e.target.value === "select author") {
            setNewAuthorFlag(false)
        } else {
            setNewAuthorFlag(true)
        }
    }
    const authFlagNameHandler = (e) => {
        if (e.target.value === '' && newAuthorAge === null) {
            setAuthorFlag(false)
        } else {
            setAuthorFlag(true)
        }
    }
    const authFlagAgeHandler = (e) => {
        if (e.target.value === '' && newAuthorName === '') {
            setAuthorFlag(false)
        } else {
            setAuthorFlag(true)
        }
    }
    return (
        <div className="AddBookForm">
            <form id="add-book" onSubmit={addBookSubmit}>
                <h2>Add Book</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Book name: </label></td>
                            <td>
                                <input type="text" onChange={(e) => { setBookName(e.target.value) }} />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Genre: </label></td>
                            <td>
                                <input type="text" onChange={(e) => { setGenre(e.target.value) }} />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Author: </label></td>
                            <td>
                                <select id="author" onChange={(e) => { setAuthorId(e.target.value); newAuthflagHandler(e) }} disabled={authorFlag}>
                                    <option value="select author">select author</option>
                                    {selectAuthor()}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Add New Author</label></td>
                            <td><label>Name: </label>
                                <input type="text" onChange={(e) => { setNewAuthorName(e.target.value); authFlagNameHandler(e) }} disabled={NewAuthorFlag} />
                            </td>
                            <td><label>Age: </label>
                                <input type="text" onChange={(e) => { setNewAuthorAge(e.target.value); authFlagAgeHandler(e) }} disabled={NewAuthorFlag} />
                            </td>
                            <td><input type="submit" onClick={addAuthorSubmit}></input></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">+</button>
            </form>
        </div>
    );
};

export default AddBook;