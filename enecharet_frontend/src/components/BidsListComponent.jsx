import { Spinner } from 'flowbite-react';
import React, { useState } from 'react'
import EmptyComponent from './EmptyComponent';

const BidsListComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bidsList, setBidsList] = useState([]);

    return (
        <div className="flex flex-col h-screen">
            {isLoading && (
                <div className="flex flex-row my-8 justify-center">
                    <Spinner />
                </div>
            )}

            {!isLoading && bidsList.length == 0 ? (
                <EmptyComponent type="Bids" />
            ) : (
                <Table>
                    <Table.Head className='w-full'>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>CPO</Table.HeadCell>
                        <Table.HeadCell>Fee</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className='divide-y'>
                        {bidsList.length > 0 && bidsList.map((bidItem) => {
                            return (
                                <Table.Row key={bidItem.id.toString()}>
                                    <Table.Cell>{bidItem.id}</Table.Cell>
                                    <Table.Cell>{bidItem.title}</Table.Cell>
                                    <Table.Cell>{bidItem.cpo}</Table.Cell>
                                    <Table.Cell>{bidItem.fee}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )}
        </div>
    )
}

export default BidsListComponent