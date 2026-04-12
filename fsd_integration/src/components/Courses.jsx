import React, { useEffect, useState } from "react";
import { getAllCourses, addCourse, updateCourse, deleteCourse } from "../api";
import { FaPlus, FaEdit, FaTrash, FaBook } from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ code: "", name: "", description: "", duration: "", fee: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingCode, setEditingCode] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllCourses();
      setCourses(res);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.code || !form.name) {
      setError("Code and Name are required");
      return;
    }

    try {
      setError("");
      const courseData = {
        ...form,
        duration: Number(form.duration),
        fee: Number(form.fee)
      };

      if (editingCode) {
        await updateCourse(editingCode, courseData);
        setSuccessMsg("✅ Course updated successfully!");
        setEditingCode(null);
      } else {
        await addCourse(courseData);
        setSuccessMsg("✅ Course added successfully!");
      }

      setForm({ code: "", name: "", description: "", duration: "", fee: "" });
      fetchCourses();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setError(editingCode ? "Failed to update course" : "Failed to add course");
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        setError("");
        await deleteCourse(code);
        setSuccessMsg("✅ Course deleted successfully!");
        fetchCourses();
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        console.error(err);
        setError("Failed to delete course");
      }
    }
  };

  const startEdit = (course) => {
    setForm(course);
    setEditingCode(course.code);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setForm({ code: "", name: "", description: "", duration: "", fee: "" });
    setEditingCode(null);
  };

  return (
    <div className="courses-page">
      <h1 className="page-title">Course Management</h1>

      {successMsg && (
        <div className="alert alert-success">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card form-card">
        <div className="card-header">
          <FaPlus className="header-icon" />
          <h2>{editingCode ? "Edit Course" : "Add New Course"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="code">Course Code *</label>
              <input
                id="code"
                className="input"
                placeholder="Enter Course Code"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                disabled={editingCode}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Course Name *</label>
              <input
                id="name"
                className="input"
                placeholder="Enter Course Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="input"
              placeholder="Enter Course Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="3"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration (months)</label>
              <input
                id="duration"
                className="input"
                type="number"
                placeholder="Enter Duration"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fee">Fee ($)</label>
              <input
                id="fee"
                className="input"
                type="number"
                step="0.01"
                placeholder="Enter Fee"
                value={form.fee}
                onChange={(e) => setForm({ ...form, fee: e.target.value })}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="button button-primary">
              {editingCode ? "Update Course" : "Add Course"}
            </button>
            {editingCode && (
              <button type="button" className="button button-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <div className="card-header">
          <FaBook className="header-icon" />
          <h2>All Courses</h2>
        </div>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="empty-state">
            <FaBook className="empty-icon" />
            <p>No courses found. Add your first course above!</p>
          </div>
        ) : (
          <div className="grid">
            {courses.map((c) => (
              <div key={c.code} className="course-card">
                <div className="card-content">
                  <h3>{c.name}</h3>
                  <div className="card-details">
                    <p><span className="label">Code:</span> <strong>{c.code}</strong></p>
                    <p><span className="label">Duration:</span> <strong>{c.duration} months</strong></p>
                    <p><span className="label">Fee:</span> <strong>${c.fee}</strong></p>
                    {c.description && <p><span className="label">Description:</span> {c.description}</p>}
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    className="button button-edit"
                    onClick={() => startEdit(c)}
                    title="Edit course"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="button button-delete"
                    onClick={() => handleDelete(c.code)}
                    title="Delete course"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;