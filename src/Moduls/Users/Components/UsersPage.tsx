import React, {useState} from "react";
import {useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation} from "../user-api";

const UsersPage : React.FC = () => {

    const { data: users, error, isLoading } = useGetUsersQuery();
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    const handleCreateUser = async () => {
        try {
            await createUser({
                name: newUserName,
                email: newUserEmail,
                password: newUserPassword
            });
        } catch (error) {
            console.error("Failed to create user", error);
        }
    };

    const handleUpdateUser = async (id: number) => {
        try {
            await updateUser({ id, name: 'Updated Name', email: 'Updated email' });
        } catch (error) {
            console.error("Failed to update user", error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUser(id);
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };
    return (
        <div>

            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUserName}
                    onChange={(event) => setNewUserName(event.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUserEmail}
                    onChange={(event) => setNewUserEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUserPassword}
                    onChange={(event) => setNewUserPassword(event.target.value)}
                />
                <button onClick={handleCreateUser}>Create User</button>
            </div>

            <h1>Users List</h1>
            <ul>
                {users?.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleUpdateUser(user.id)}>Update</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export { UsersPage }