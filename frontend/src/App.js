import './App.css';
import axiosClient from './axios-client';
const payload = {
  email: "tranmy0122english@gmail.com",
  password: "admin1234",
};
function App() {
  const handleSubmit = async () => {
    await axiosClient.get('/sanctum/csrf-cookie');
    await axiosClient.post("login", payload);
  }
  return (
    <div className="App">
      <button onClick={handleSubmit}>Fetch API </button>
    </div>
  );
}

export default App;
