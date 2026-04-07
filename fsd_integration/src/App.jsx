import React, { useEffect, useState } from "react";
import { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent } from "./api";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaSync, FaUserGraduate, FaTimes, FaCheck } from "react-icons/fa";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", course: "" });
  const [searchId, setSearchId] = useState("");
  const [singleStudent, setSingleStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllStudents();
      setStudents(res);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentByIdHandler = async () => {
    if (!searchId) {
      setError("Please enter a student ID");
      return;
    }

    try {
      setError("");
      const res = await getStudentById(searchId);
      setSingleStudent(res);
    } catch (err) {
      console.error(err);
      setSingleStudent(null);
      setError("Student not found");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id || !form.name || !form.course) {
      setError("All fields are required");
      return;
    }

    try {
      setError("");
      const studentData = {
        ...form,
        id: Number(form.id),
      };

      if (editingId) {
        await updateStudent(editingId, studentData);
        setSuccessMsg("✅ Student updated successfully!");
        setEditingId(null);
      } else {
        await addStudent(studentData);
        setSuccessMsg("✅ Student added successfully!");
      }

      setForm({ id: "", name: "", course: "" });
      fetchStudents();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setError(editingId ? "Failed to update student" : "Failed to add student");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        setError("");
        await deleteStudent(id);
        setSuccessMsg("✅ Student deleted successfully!");
        fetchStudents();
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        console.error(err);
        setError("Failed to delete student");
      }
    }
  };

  const startEdit = (student) => {
    setForm(student);
    setEditingId(student.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setForm({ id: "", name: "", course: "" });
    setEditingId(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <FaUserGraduate className="logo-icon" />
            <h1>Student Manager</h1>
          </div>
          <p className="subtitle">Manage your students with ease</p>
        </div>
      </header>

      {/* Alert Messages */}
      {successMsg && (
        <div className="alert alert-success">
          <FaCheck className="alert-icon" />
          {successMsg}
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          <FaTimes className="alert-icon" />
          {error}
        </div>
      )}

      <div className="container">
        {/* Add/Edit Student Form */}
        <div className="card form-card">
          <div className="card-header">
            <FaPlus className="header-icon" />
            <h2>{editingId ? "Edit Student" : "Add New Student"}</h2>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="id">Student ID *</label>
              <input
                id="id"
                className="input"
                placeholder="Enter Student ID"
                type="number"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                disabled={editingId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                className="input"
                placeholder="Enter Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="course">Course *</label>
              <input
                id="course"
                className="input"
                placeholder="Enter Course Name"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="button button-primary">
                <FaCheck /> {editingId ? "Update Student" : "Add Student"}
              </button>
              {editingId && (
                <button type="button" className="button button-secondary" onClick={cancelEdit}>
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search Student */}
        <div className="card">
          <div className="card-header">
            <FaSearch className="header-icon" />
            <h2>Search Student</h2>
          </div>
          <div className="search-group">
            <input
              className="input"
              placeholder="Enter Student ID to search..."
              type="number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button className="button button-primary" onClick={fetchStudentByIdHandler}>
              <FaSearch /> Search
            </button>
          </div>

          {singleStudent && (
            <div className="result-box">
              <h3>{singleStudent.name}</h3>
              <div className="result-details">
                <p><span className="label">ID:</span> {singleStudent.id}</p>
                <p><span className="label">Course:</span> {singleStudent.course}</p>
              </div>
            </div>
          )}
        </div>

        {/* All Students */}
        <div className="card">
          <div className="card-header">
            <FaUserGraduate className="header-icon" />
            <h2>All Students</h2>
            {!loading && students.length > 0 && (
              <button className="button button-small" onClick={fetchStudents}>
                <FaSync /> Refresh
              </button>
            )}
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading students...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="empty-state">
              <FaUserGraduate className="empty-icon" />
              <p>No students found. Add your first student above!</p>
            </div>
          ) : (
            <div className="grid">
              {students.map((s) => (
                <div key={s.id} className="student-card">
                  <div className="card-content">
                    <h3>{s.name}</h3>
                    <div className="card-details">
                      <p><span className="label">ID:</span> <strong>{s.id}</strong></p>
                      <p><span className="label">Course:</span> <strong>{s.course}</strong></p>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button
                      className="button button-edit"
                      onClick={() => startEdit(s)}
                      title="Edit student"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="button button-delete"
                      onClick={() => handleDelete(s.id)}
                      title="Delete student"
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
    </div>
  );
}