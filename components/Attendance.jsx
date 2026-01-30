import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { students } from '../data/studentsData';
import './Attendance.css';

const Attendance = () => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [semester, setSemester] = useState(2);
  const location = useLocation();

  useEffect(() => {
    const regdNo = new URLSearchParams(location.search).get('regdNo') || localStorage.getItem('userRegdNo');
    const student = students.find((s) => s.regdNo === regdNo) || students[0];
    setCurrentStudent(student);
    if (student?.academics?.semester) setSemester(student.academics.semester);
  }, [location]);

  if (!currentStudent || !currentStudent.subjectAttendance) {
    return <div className="attendance-container">Loading...</div>;
  }

  const rows = currentStudent.subjectAttendance || [];

  const getAttendanceClass = (pct) => (pct >= 80 ? 'attendance-good' : 'attendance-low');

  return (
    <div className="attendance-container">
      <div className="attendance-header-bar">
        <span className="header-title">ATTENDANCE & COURSE PROGRESS</span>
      </div>

      <div className="attendance-card">
        <div className="attendance-controls">
          <label>
            Semester
            <select value={semester} onChange={(e) => setSemester(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </label>
        </div>

        <div className="attendance-table-wrap">
          <table className="attendance-table">
            <thead>
              <tr>
                <th className="col-index">#</th>
                <th>Subject</th>
                <th>Branch/Section</th>
                <th>Roll No</th>
                <th>Faculty</th>
                <th>Attendance % (P)</th>
                <th>Int.Mark</th>
                <th>Course Coverage</th>
                <th>Course Handout</th>
                <th>Model Question</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td className="subject-cell">
                    {row.subjectName}({row.subjectCode})
                  </td>
                  <td>{row.branchSection}</td>
                  <td>{row.rollNo}</td>
                  <td>{row.faculty}</td>
                  <td>
                    <span className={`attendance-pct ${getAttendanceClass(row.attendancePercent)}`}>
                      {row.attendancePercent}%
                    </span>
                  </td>
                  <td>
                    <button type="button" className="btn-show">Show</button>
                  </td>
                  <td>
                    <div className="coverage-cell">
                      <span className="coverage-value">{row.courseCoverage}</span>
                      <a href="#details" className="link-details">Show Details</a>
                    </div>
                  </td>
                  <td>
                    <button type="button" className="btn-show">Show</button>
                  </td>
                  <td>
                    <button type="button" className="btn-show">Show</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="attendance-legend">
          <span className="legend-item legend-low">0 to 79%</span>
          <span className="legend-item legend-good">80% to 100%</span>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
