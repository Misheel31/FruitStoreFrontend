import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSideBar from './AdminSidebar.tsx';

const AdminHome: React.FC = () => {
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/allUser');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId: string) => {
        try {
            await axios.delete(`http://localhost:8080/admin/delete/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
            toast.success('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

    return (
        <div className="admin-container">
            <AdminSideBar />
            <div className="admin-content">
                <h2>All Users</h2>
                <table>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: any) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleDelete(user.userId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
            </div>
        </div>
    );
};

export default AdminHome;
