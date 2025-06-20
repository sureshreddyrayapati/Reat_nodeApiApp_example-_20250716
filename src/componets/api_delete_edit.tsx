import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './table.css';
import './button_style.css'
interface User {
  name: string;
  age: number;
  place: string;
}
 
function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
 
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then((data: User[]) => setUsers(data))
      .catch(err => {
        console.error(err);
        toast.error('Failed to fetch users');
      });
  }, []);
 
  const deleteUser = (name: string) => {
    fetch(`http://localhost:5000/api/users/${name}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete user');
        return res.json();
      })
      .then(data => {
        toast.success(data.message);
        setUsers(users.filter(u => u.name !== name));
      })
      .catch(err => toast.error(err.message));
  };
 
  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditUser({ ...users[index] }); // copy user data to edit
  };
 
  const cancelEdit = () => {
    setEditIndex(null);
    setEditUser(null);
  };
 
  const saveEdit = () => {
    if (!editUser) return;
 
    fetch(`http://localhost:5000/api/users/${users[editIndex!].name}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUser),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update user');
        return res.json();
      })
      .then(data => {
        toast.success(data.message || 'User updated successfully');
        const updatedUsers = [...users];
        updatedUsers[editIndex!] = editUser;
        setUsers(updatedUsers);
        setEditIndex(null);
        setEditUser(null);
      })
      .catch(err => toast.error(err.message));
  };
 
  const handleChange = (field: keyof User, value: string) => {
    if (!editUser) return;
    setEditUser({
      ...editUser,
      [field]: field === 'age' ? Number(value) : value,
    });
  };
 
  return (
    <div>
      <h2>Users List</h2>
      <table className='table-best'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Place</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.name}>
              <td>
                {editIndex === i ? (
                  <input type="text" value={editUser?.name || ''} onChange={e => handleChange('name', e.target.value)}/>
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editIndex === i ? (
                  <input type="number" value={editUser?.age || ''} onChange={e => handleChange('age', e.target.value)} />
                ) : (
                  user.age
                )}
              </td>
              <td>
                {editIndex === i ? (
                  <input type="text" value={editUser?.place || ''} onChange={e => handleChange('place', e.target.value)}/>
                ) : (
                  user.place
                )}
              </td>
              <td>
                {editIndex === i ? (
                  <>
                    <button  onClick={saveEdit} style={{ marginRight: 8 }}> Save </button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className='btn-beautiful' onClick={() => startEdit(i)} style={{ marginRight: 8 }}> Edit </button>
                    <button className='btn-beautiful btn-danger' onClick={() => deleteUser(user.name)} style={{backgroundColor: 'red' }}> Delete </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default Users;