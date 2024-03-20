import './App.css'
import Homepage from './Components/Homepage';
import { AuthProvider } from './context/AuthContext';


function App() {

  return (
    <>
      <AuthProvider>
        <Homepage />
      </AuthProvider>
    </>
  );
}

export default App
