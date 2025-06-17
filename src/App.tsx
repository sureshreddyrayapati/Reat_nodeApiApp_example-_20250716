import { useEffect, useState } from 'react';
 
interface User {
  name: string;
  age: number;
}
 
function App() {
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data: User) => setUser(data))
      .catch((err) => console.error(err));
  }, []);
 
  return (
    <div>
      <h1>React + Node API (GET Example)</h1>
 
      {user ? (
        <div>
          <h2>User Data:</h2>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
/*import { useEffect, useState } from 'react';
 
function App() {
  const [message, setMessage] = useState<string>('');
 
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);
 
  return (
    <div>
      <h1>React + TypeScript → Connected to Node API</h1>
      <h2>{message}</h2>
    </div>
  );
}
 
export default App;*/
 
export default App;
 