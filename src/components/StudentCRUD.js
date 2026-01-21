import React, { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/api";

function StudentCRUD() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.age.trim()) newErrors.age = "Age is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editId) {
        await updateStudent(editId, form);
        setEditId(null);
      } else {
        await addStudent(form);
      }

      setForm({ name: "", email: "", age: "" });
      setErrors({});
      loadStudents();
    } catch (error) {
      console.error(error);
      alert("Error submitting data!");
    }
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
      loadStudents();
    }
  };

  // 🎨 Modern UI Styles
  const container = {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "25px",
    borderRadius: "16px",
    background: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  };

  const heading = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "5px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
  };

  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: editId ? "#007bff" : "#28a745",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "0.2s",
  };

  const table = {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  };

  const th = {
    background: "#007bff",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
  };

  const tr = {
    borderBottom: "1px solid #ddd",
  };

  const td = {
    padding: "12px",
    textAlign: "center",
    fontSize: "15px",
  };

  const editBtn = {
    backgroundColor: "#17a2b8",
    padding: "6px 12px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "5px",
  };

  const deleteBtn = {
    backgroundColor: "#dc3545",
    padding: "6px 12px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    
    <div style={{
      minHeight: "100vh",
      padding: "40px 0",
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    }}>
    <div style={container}>
      <h2 style={heading}>Student Management Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={inputStyle}
            placeholder="Enter student name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        <div>
          <input
            style={inputStyle}
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div>
          <input
            style={inputStyle}
            placeholder="Enter age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          {errors.age && <div style={errorStyle}>{errors.age}</div>}
        </div>

        <button style={buttonStyle} type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      {/* TABLE LIST */}
      <table style={table}>
        <thead>
          <tr style={tr}>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Age</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id} style={tr}>
              <td style={td}>{s.name}</td>
              <td style={td}>{s.email}</td>
              <td style={td}>{s.age}</td>
              <td style={td}>
                <button style={editBtn} onClick={() => handleEdit(s)}>
                  Edit
                </button>
                <button style={deleteBtn} onClick={() => handleDelete(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default StudentCRUD;
