import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ id }) => {
  const res = useQuery(getBookQuery, {
    variables: { id },
  });
  console.log(res.data);
  const renderBookDetails = () => {
    if (!id) return <p>No books selected</p>;
    if (res.loading) return <p>Loading...</p>;
    if (res.error) return <p>Error :(</p>;

    return (
      <>
        <h2>{res.data.book.name}</h2>
        <p>Genre: {res.data.book.genre}</p>
        <p>Author: {res.data.book.author.name}</p>
        <h2>All books by this author:</h2>
        <ul>
          {res.data.book.author.books.map((book) => {
            return <li key={book.id}>{book.name}</li>;
          })}
        </ul>
      </>
    );
  };
  return <div>{renderBookDetails()}</div>;
};

export default BookDetails;
