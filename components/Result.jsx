import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { students } from '../data/studentsData';
import './Result.css';

const Result = () => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [semester, setSemester] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const regdNo = new URLSearchParams(location.search).get('regdNo') || localStorage.getItem('userRegdNo');
    const student = students.find((s) => s.regdNo === regdNo) || students[0];
    setCurrentStudent(student);
    if (student?.academics?.semester) setSemester(student.academics.semester);
  }, [location]);

  if (!currentStudent || !currentStudent.results) {
    return <div className="result-container">Loading...</div>;
  }

  const semesterResults = currentStudent.results.find(res => res.semester === semester);
  const subjects = semesterResults ? semesterResults.subjects : [];
  const overallResult = semesterResults ? semesterResults.overallResult : "N/A";

  const getStatusClass = (status) => {
    if (status === 'PASS') return 'result-pass';
    if (status === 'FAIL') return 'result-fail';
    return '';
  };

  return (
    <div className="result-container">
      <div className="result-header-bar">
        <span className="header-title">SEMESTER RESULT</span>
        <button className="download-button">Download</button>
      </div>

      <div className="semester-card">
        <div className="result-controls">
          <label>
            Semester:
            <select value={semester || ''} onChange={(e) => setSemester(Number(e.target.value))}>
              {currentStudent.results.map(res => (
                <option key={res.semester} value={res.semester}>{res.semester}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="student-info">
            <p><strong>Name:</strong> {currentStudent.name}</p>
            <p><strong>Registration No:</strong> {currentStudent.regdNo}</p>
            <p><strong>Program:</strong> {currentStudent.academics.program}</p>
            <p><strong>Branch:</strong> {currentStudent.academics.branch}</p>
            <p><strong>Semester:</strong> {semester}</p>
        </div>

        <div className="result-table-wrap">
          <table className="result-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{subject.subjectCode}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.grade}</td>
                  <td>
                    <span className={`result-status ${getStatusClass(subject.status)}`}>
                      {subject.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overall-result">
          <p><strong>Overall Result for Semester {semester}:</strong> 
            <span className={`overall-status ${getStatusClass(overallResult)}`}>
              {overallResult}
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Result;
