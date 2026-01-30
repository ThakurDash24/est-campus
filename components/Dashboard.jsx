import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaArrowCircleRight } from "react-icons/fa";
import { students } from "../data/studentsData";
import "./dashboard.css";

// Card Component remains the same
const Card = ({ title, color, children }) => {
  return (
    <div className={`card ${color}`}>
      <div className="card-title">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
};

// 🔹 Individual Cards (updated to use studentData prop)
const FacultyCard = ({ studentData }) => (
  <Card title="Faculty Advisor" color="card-red">
    <div className="card-content">
      <div className="card-top-bar">
        <div>NAME: {studentData.facultyAdvisor.name}</div>
        <div>Contact: {studentData.facultyAdvisor.contact}</div>
        <br />
      </div>
      <div className="card-bottom-bar card-footer-red">
        <a>
          Interactions <FaArrowCircleRight />
        </a>
        <a>
          Raise an Issue
          <FaArrowCircleRight />
        </a>
        <a>
          SOP
          <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const AcademicsCard = ({ studentData }) => (
  <Card title="Academics" color="card-blue">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Regd no. - {studentData.regdNo}</div>
        <div>Program - {studentData.academics.program} , Semester - {studentData.academics.semester}</div>
        <div>Branch - {studentData.academics.branch}</div>
      </div>
      <div className="card-bottom-bar card-footer-blue">
        <a>
          More Info <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const TimeTableCard = () => (
  <Card title="Time Table" color="card-orange">
    <div className="card-content">
      <div className="card-btn">
        <button className="btn">CSE-C</button>
      </div>
      <br />
      <br />
      <br />
      <div className="card-bottom-bar card-footer-orange">
        <a>
          More Info <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const AttendanceCard = ({ studentData }) => (
  <Card title="Attendance" color="card-purple">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Subjects - {studentData.attendance.totalSubjects}</div>
        <div> 0 to 79% - <span style={{color: 'red'}}>{studentData.attendance.lowAttendance}</span></div>
        <div> 80% to 100% - <span style={{color: 'lightgreen'}}>{studentData.attendance.goodAttendance}</span></div>
      </div>
      <div className="card-bottom-bar card-footer-purple">
        <Link to={`/attendance?regdNo=${studentData.regdNo}`}>
          More Info <FaArrowCircleRight />
        </Link>
      </div>
    </div>
  </Card>
);

const ExamScheduleCard = () => (
  <Card title="Exam Schedule" color="card-darkblue">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Today - 0</div>
        <div> Tomorrow - 0</div>
        <br />
      </div>
      <div className="card-bottom-bar card-footer-darkblue">
        <a>
          Autonomous Exam <FaArrowCircleRight />
        </a>
        <a>
          Class Test Exam <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const ResultCard = () => {
  const openResultWindow = () => {
    window.open('/result', 'resultWindow', 'width=800,height=600,scrollbars=yes');
  };

  return (
    <Card title="Result" color="card-red">
      <div className="card-content">
        <div className="card-top-bar">
          <br />
          <br />
          <br />
        </div>
        <div className="card-bottom-bar card-footer-red">
          <a href="/result" onClick={(e) => { e.preventDefault(); openResultWindow(); }}>
            More Info
            <FaArrowCircleRight />
          </a>
        </div>
      </div>
    </Card>
  );
};

const LibraryCard = () => (
  <Card title="Library" color="card-orange">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Books with me - 0</div>
        <div>To be returned today - 0</div>
        <div>To be returned this week - 0</div>
      </div>
      <div className="card-bottom-bar card-footer-orange">
        <a>
          More Info
          <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const HostelCard = () => (
  <Card title="Hostel" color="card-pink">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Not Registered</div>
      </div>
    </div>
  </Card>
);

const DuesCard = ({ studentData }) => (
  <Card title="Dues" color="card-green">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Total Dues - {studentData.dues}</div>
        <br />
        <br />
      </div>
      <div className="card-bottom-bar card-footer-green">
        <a>
          Pay Now
          <FaArrowCircleRight />
        </a>
        <a>
          Print Receipt
          <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const CanteenCard = () => (
  <Card title="Canteen" color="card-red">
    <div className="card-content">
      <div className="card-top-bar">
        <br />
        <br />
        <br />
      </div>
      <div className="card-bottom-bar card-footer-red">
        <a>
          Registration
          <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const OnlineQuizCard = () => (
  <Card title="Online Quiz Exam" color="card-blue">
    <div className="card-content">
      <div className="card-top-bar">
        <br />
        <br />
        <br />
      </div>
      <div className="card-bottom-bar card-footer-blue">
        <a>
          More Info
          <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const OnlineWrittenCard = () => (
  <Card title="Online Written Exam" color="card-blue">
    <div className="card-content">
      <div className="card-top-bar">
        <br />
        <br />
        <br />
      </div>
      <div className="card-bottom-bar card-footer-blue">
        <a>
          More Info
          <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const ProfileCard = ({ studentData }) => (
  <Card title="Profile" color="card-green">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Name - {studentData.profile.name}</div>
        <div>Mobile No. - {studentData.profile.mobile}</div>
        <div>Email Id - {studentData.profile.email}</div>
      </div>
      <div className="card-bottom-bar card-footer-green">
        <a>
          More Info <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const HolidaysCard = () => (
  <Card title="Holidays" color="card-green">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Leave Year - 2025-26</div>
        <div>Total Holiday - 21</div>
        <br/>
      </div>
      <div className="card-bottom-bar card-footer-green">
        <a>
          View List <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const CourseFeedbackCard = () => (
  <Card title="Course Feedback" color="card-purple">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Start:</div>
        <div>End:</div>
        <br/>
      </div>
      <div className="card-bottom-bar card-footer-purple">
        <a>
          Course Feedback <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const FeedbackCard = () => (
  <Card title="Feedback" color="card-purple">
    <div className="card-content">
      <div className="card-top-bar">
        <br/>
        <br/>
        <br/>
      </div>
      <div className="card-bottom-bar card-footer-purple">
        <a>
          Feedback <FaArrowCircleRight />
        </a>
         <a>
          FA Feedback <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const StudentSatisfactionSurveyFeedbackCard = () => (
  <Card title="Student Satisfaction Survey Feedback" color="card-purple">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Start:</div>
        <div>End:</div>
        <br/>
      </div>
      <div className="card-bottom-bar card-footer-purple">
        <a>
          SSS Feedback <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const PracticeSchoolCard = () => (
  <Card title="Practice School" color="card-pink">
    <div className="card-content">
      <div className="card-top-bar">
        <br/>
        <br/>
        <br/>
      </div>
      <div className="card-bottom-bar card-footer-pink">
        <a>
          More Info <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

const OfficialMailCard = ({ studentData }) => (
  <Card title="Official Mail" color="card-darkblue">
    <div className="card-content">
      <div className="card-top-bar">
        <div>Email Id: {studentData.officialEmail.email}</div>
        <div>Password: {studentData.officialEmail.password}</div>
        <br/>
      </div>
      <div className="card-bottom-bar card-footer-darkblue">
        <a>
          View List <FaArrowCircleRight />
        </a>
      </div>
    </div>
  </Card>
);

// 🔹 Main Dashboard Component
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentStudent, setCurrentStudent] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Get registration number from login page (through props or URL params)
    const searchParams = new URLSearchParams(location.search);
    const regdNo = searchParams.get('regdNo') || localStorage.getItem('userRegdNo');
    
    // Find the student by registration number
    const student = students.find(s => s.regdNo === regdNo);
    
    if (student) {
      setCurrentStudent(student);
      localStorage.setItem('currentUser', JSON.stringify(student));
    } else {
      // Default to first student if no match found
      setCurrentStudent(students[0]);
    }
  }, [location]);

  if (!currentStudent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <Navbar 
        onToggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen} 
        studentName={currentStudent.name}
        studentRegdNo={currentStudent.regdNo}
      />
      <div className="dashboard-main">
        <Sidebar isOpen={sidebarOpen} />
        <div
          className={`dashboard-content ${!sidebarOpen ? "sidebar-closed" : ""}`}
        >
          <div className="card-grid">
            <FacultyCard studentData={currentStudent} />
            <AcademicsCard studentData={currentStudent} />
            <TimeTableCard />
            <AttendanceCard studentData={currentStudent} />
            <ExamScheduleCard />
            <ResultCard />
            <LibraryCard />
            <HostelCard />
            <DuesCard studentData={currentStudent} />
            <CanteenCard />
            <OnlineQuizCard />
            <OnlineWrittenCard />
            <ProfileCard studentData={currentStudent} />
            <HolidaysCard />
            <CourseFeedbackCard />
            <FeedbackCard />
            <StudentSatisfactionSurveyFeedbackCard />
            <PracticeSchoolCard />
            <OfficialMailCard studentData={currentStudent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;