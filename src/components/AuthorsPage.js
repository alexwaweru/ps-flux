import React, { useState, useEffect } from "react";
import authorStore from "../stores/authorStore";
import AuthorList from "./AuthorList";
import { Link } from "react-router-dom";
import { loadAuthors, deleteAuthor } from "../actions/authorAction";
import { toast } from "react-toastify";

const AuthorsPage = (props) => {
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authorStore.getAuthors().length === 0) loadAuthors();
    return () => authorStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  const handleDelete = (id) => {
    deleteAuthor(id).then(() => {
      toast.success("Author deleted!");
    });
  };

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/author">
        Add Author
      </Link>
      <AuthorList authors={authors} onDelete={handleDelete} />
    </>
  );
};

export default AuthorsPage;
