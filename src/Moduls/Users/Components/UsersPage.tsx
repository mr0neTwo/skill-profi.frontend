import React, {useState} from "react";
import {useCreateUserMutation, useGetUsersQuery, userApi, useUpdateUserMutation} from "../user-api";
import {useAppDispatch, useAppSelector} from "../../../Common/redux";
import {Spinner} from "../../../Common/Components/spinner";

const UsersPage : React.FC = () => {

    const dispatch = useAppDispatch();

    const { data: users, error, isLoading } = useGetUsersQuery();
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const userId: string = "1";

    const  isLoadingDelete = useAppSelector((state) => userApi.endpoints.deleteUser.select(userId)(state).isLoading)

    const [newUserName, setNewUserName] = useState<string>('');
    const [newUserEmail, setNewUserEmail] = useState<string>('');
    const [newUserPassword, setNewUserPassword] = useState<string>('');

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
        // dispatch(deleteUser(id))
    };

    if(isLoadingDelete) return <Spinner/>;

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