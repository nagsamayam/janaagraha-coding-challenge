import './App.scss';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserProvider from './providers/UserProvider';
import Header from './components/ui/Header';
import UserStatus from './pages/UserStatus/UserStatus';

import Home from './pages/Home';

function App() {
  return (
    <>
      <Header>
        <h1>User Registration</h1>
      </Header>
      <main className='main'>
        <UserProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/user-status' element={<UserStatus />} />
            </Routes>
          </Router>
        </UserProvider>
      </main>
    </>
  );
}

export default App;
