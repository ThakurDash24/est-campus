import { Routes, Route } from 'react-router-dom';
import SignInPage from '../components/login';
import Dashboard from '../components/Dashboard';
import Result from '../components/Result';
import Attendance from '../components/Attendance';
import PrivateRoute from '../components/PrivateRoute';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/result" element={<Result />} />
          <Route path="/attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
