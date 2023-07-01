import React from 'react';
import { Button, Spinner, Table } from 'flowbite-react';
import EmptyComponent from './EmptyComponent';

const WithDrawalRequestListComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [requestList, setrequestList] = useState([]);


    return (
        <div className='flex flex-col h-screen'>
            {isLoading && (
                <div className="flex flex-row my-8 justify-center">
                    <Spinner />
                </div>
            )}

            {!isLoading && requestList.length == 0 ? (
                <EmptyComponent type="Withdrawal requests" />
            ) : (
                <Table>
                    <Table.Head className="w-full">
                        <Table.Head>Id</Table.Head>
                        <Table.Head>User ID</Table.Head>
                        <Table.Head>Amount</Table.Head>
                        <Table.Head>Action</Table.Head>
                    </Table.Head>

                    <Table.Body className='divide-y'>
                        {requestList.length > 0 && requestList.map((requestItem) => {
                            return (
                                <Table.Row>
                                    <Table.Cell>{requestItem.id}</Table.Cell>
                                    <Table.Cell>{requestItem.userId}</Table.Cell>
                                    <Table.Cell>{requestItem.amount}</Table.Cell>
                                    <Table.Cell>
                                        <Button>Approve</Button>
                                        <Button>Decline</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            )}
        </div>
    )
}

export default WithDrawalRequestListComponent