import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { toast } from "react-toastify";
import authorStore from "../stores/authorStore";
import courseStore from "../stores/courseStore";
import * as authorActions from "../actions/authorAction";
import * as courseActions from "../actions/courseAction";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });
  const [authorSelectOptions, setAuthorSelectOptions] = useState([]);

  // Handle authors dropdown list change
  useEffect(() => {
    authorStore.addChangeListener(onAuthorsChange);
    if (authorSelectOptions.length === 0) {
      authorActions.loadAuthors();
    }
    return () => authorStore.removeChangeListener(onAuthorsChange);
  }, [authorSelectOptions.length]);

  const onAuthorsChange = () => {
    setAuthorSelectOptions(authorStore.getAuthors());
  };

  // Handle courses and course changes
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // get slug from the path `/courses/:slug`
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  const onChange = () => {
    setCourses(courseStore.getCourses());
  };

  const handleChange = ({ target }) => {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
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
        authorListSelectOptions={authorSelectOptions}
      />
    </>
  );
};

export default ManageCoursePage;
