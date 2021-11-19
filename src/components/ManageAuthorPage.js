import React, { useState, useEffect } from "react";
import AuthorForm from "./AuthorForm";
import { toast } from "react-toastify";
import authorStore from "../stores/authorStore";
import * as authorActions from "../actions/authorAction";

const ManageAuthorPage = (props) => {
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [author, setAuthor] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    const id = props.match.params.authorId; // get id from the path `/author/:id`
    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (id) {
      setAuthor(authorStore.getCourseById(id));
    }
    return () => authorStore.removeChangeListener(onChange);
  }, [authors.length, props.match.params.authorId]);

  const onChange = () => {
    setAuthors(authorStore.getAuthors());
  };

  const handleChange = ({ target }) => {
    setAuthor({
      ...author,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    authorActions.saveAuthor(author).then(() => {
      props.history.push("/authors");
      toast.success("Author saved!");
    });
  };

  const formIsValid = () => {
    const _errors = {};
    if (!author.name) _errors.name = "Name is required";
    setErrors(_errors);
    // form is valid id _errors has no properties
    return Object.keys(_errors).length === 0;
  };

  return (
    <>
      <h2>Manage Course</h2>
      <AuthorForm
        errors={errors}
        author={author}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageAuthorPage;
