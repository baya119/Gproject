import { Button, Spinner, Table } from 'flowbite-react';
import React from 'react'
import EmptyComponent from './EmptyComponent';

export const UsersListComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    return (
        <div className="flex flex-col h-screen">
            {isLoading && (
                <div className="flex flex-row my-8 justify-center">
                    <Spinner />
                </div>
            )}

            {!isLoading && users.length == 0 ? (
                <EmptyComponent type="Users" />
            ): (
                <Table>
                    <Table.Head className='w-full'>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>First Name</Table.HeadCell>
                        <Table.HeadCell>Last Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className='divide-y'>
                        {users.length > 0 && users.map((userItem) => {
                            return (
                                <Table.Row key={userItem.id.toString()}>
                                    <Table.Cell>{userItem.id}</Table.Cell>
                                    <Table.Cell>{userItem.fname}</Table.Cell>
                                    <Table.Cell>{userItem.lname}</Table.Cell>
                                    <Table.Cell>{userItem.email}</Table.Cell>
                                    <Table.Cell><Button>Suspend</Button></Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )}
        </div>
    )
}
