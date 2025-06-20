import { useEffect, useState } from 'react';
 
interface User {
  name: string;
  age: number;
  place: string;
}
 
function GetDetails() {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data: User[]) => {
        console.log('fatched data')
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
 
  if (loading) {
    return <div>Loading</div>;
  }
 
  if (user.length === 0) {
    return <div>No users found</div>;
  }
 
  return (
    <div>
     
      <h2>Users List</h2>
      <table className='table-best'  aria-label="Product List">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {user.map((userItem, index) => (
            <tr key={index}>
              <td>{userItem.name}</td>
              <td>{userItem.age}</td>
              <td>{userItem.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default GetDetails;
 