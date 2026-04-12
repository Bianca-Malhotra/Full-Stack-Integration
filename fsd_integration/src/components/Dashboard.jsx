import React, { useMemo } from "react";

function Dashboard({ students, courses }) {
  const totalStudents = students.length;
  const totalCourses = courses.length;

  const averageAttendance = useMemo(() => {
    if (!students.length) return 0;
    const total = students.reduce((sum, student) => sum + (Number(student.attendance) || 0), 0);
    return (total / students.length).toFixed(1);
  }, [students]);

  const topScorer = useMemo(() => {
    if (!students.length) return null;
    return [...students].sort((a, b) => (Number(b.marks) || 0) - (Number(a.marks) || 0))[0];
  }, [students]);

  const courseWiseCount = useMemo(() => {
    const countMap = students.reduce((acc, student) => {
      const key = student.courseCode || "Unassigned";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  }, [students]);

  return (
    <div className="students-page dashboard-page">
      <h1 className="page-title">Dashboard</h1>

      <div className="grid dashboard-stats-grid">
        <div className="card dashboard-stat-card">
          <h2 className="dashboard-stat-label">Total Students</h2>
          <p className="dashboard-stat-value">{totalStudents}</p>
        </div>

        <div className="card dashboard-stat-card">
          <h2 className="dashboard-stat-label">Total Courses</h2>
          <p className="dashboard-stat-value">{totalCourses}</p>
        </div>

        <div className="card dashboard-stat-card">
          <h2 className="dashboard-stat-label">Average Attendance</h2>
          <p className="dashboard-stat-value">{averageAttendance}%</p>
        </div>

        <div className="card dashboard-stat-card">
          <h2 className="dashboard-stat-label">Top Scorer</h2>
          {topScorer ? (
            <p className="dashboard-stat-value dashboard-top-scorer">
              {topScorer.name} ({topScorer.marks})
            </p>
          ) : (
            <p className="dashboard-empty-text">No student data available</p>
          )}
        </div>
      </div>

      <div className="card dashboard-distribution-card">
        <h2 className="dashboard-section-title">Students by Course</h2>
        {courseWiseCount.length === 0 ? (
          <p className="dashboard-empty-text">No course-wise distribution available</p>
        ) : (
          <div className="grid">
            {courseWiseCount.map(([courseCode, count]) => (
              <div key={courseCode} className="student-card dashboard-course-item">
                <h3>{courseCode}</h3>
                <p>{count} student(s)</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;