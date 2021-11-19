import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import { getAuthors } from "../api/authorApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  const [authorListSelectOptions, setAuthorListSelectOptions] = useState([]);
  useEffect(() => {
    getAuthors()
      .then((authorList) => setAuthorListSelectOptions(authorList))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = ({ target }) => {
    debugger;
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    courseApi.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved!");
    });
  };

  const formIsValid = () => {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author is required";
    if (!course.category) _errors.category = "Category is required";
    setErrors(_errors);
    // form is valid id _errors has no properties
    return Object.keys(_errors).length === 0;
  };

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
        authorListSelectOptions={authorListSelectOptions}
      />
    </>
  );
};

export default ManageCoursePage;
