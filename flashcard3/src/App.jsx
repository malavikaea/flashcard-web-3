import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Level from './components/Level';
import Subject from './components/Subject';
import ManageFlashcard from './components/ManageFlashcard';
import Answer from './components/Answer';
import AddFlashCard from './components/AddFlashCard';
// import FlashcardViewer from './components/FlashCardViewer';
import ViewFlashCard from './components/ViewFlashCard';
import DeleteFlashCard from './components/DeleteFlashCard';
import EditFlashCard from './components/EditFlashCard';
import ChatbotWidget from './components/ChatbotWidget';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import FlashcardSession from './components/FlashcardSession';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = JSON.parse(localStorage.getItem("userProfile"))?.token;
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await res.json();
      setIsAdmin(user.isAdmin);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <br /><br /><br />
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path='/' element={<Hero />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/level' element={<Level />} />
        <Route path='/sub' element={<Subject />} />
        <Route path="/flashcards/:subject" element={<FlashcardSession/>} />
        <Route path="/manage" element={<ManageFlashcard />} />
        <Route path="/addCard" element={<AddFlashCard />} />
        <Route path="/ans" element={<Answer />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/viewFlashCard" element={<ViewFlashCard />} />
        <Route path="/deleteflash" element={<DeleteFlashCard />} />
        <Route path="/editflash" element={<EditFlashCard />} />
        <Route path="/chatbot" element={<ChatbotWidget />} />
      </Routes>
    </>
  );
}

export default App;
