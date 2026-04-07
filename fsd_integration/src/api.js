const BASE_URL = "http://localhost:8081/api/students";

// ✅ Get all students
export const getAllStudents = async () => {
  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("GET ALL STATUS:", res.status);

    if (!res.ok) {
      throw new Error("Failed to fetch students");
    }

    return await res.json();
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};

// ✅ Get student by ID
export const getStudentById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
    });

    console.log("GET BY ID STATUS:", res.status);

    if (!res.ok) {
      throw new Error("Student not found");
    }

    return await res.json();
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};

// ✅ Add student
export const addStudent = async (student) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    console.log("POST STATUS:", res.status);

    if (!res.ok) {
      throw new Error("Failed to add student");
    }

    return await res.json();
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};

// ✅ Update student
export const updateStudent = async (id, student) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    console.log("PUT STATUS:", res.status);

    if (!res.ok) {
      throw new Error("Failed to update student");
    }

    return await res.json();
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};

// ✅ Delete student
export const deleteStudent = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("DELETE STATUS:", res.status);

    if (!res.ok) {
      throw new Error("Failed to delete student");
    }

    return await res.text();
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};