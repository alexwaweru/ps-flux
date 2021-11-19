import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";

const CoursesPage = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses()
      .then((_courses) => setCourses(_courses))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} />
    </>
  );
};

export default CoursesPage;
