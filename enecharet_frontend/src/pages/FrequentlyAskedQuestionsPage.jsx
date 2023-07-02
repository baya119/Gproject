import React from 'react';
import { Accordion } from 'flowbite-react';

const FrequentlyAskedQuestionsPage = () => {
    return (
        <div>
            <div className="flex flex-row flex-wrap my-6 justify-center">
                <div className="text-gray-800 text-left whitespace-break-normal justify-center ">
                    <p className="text-3xl">Frequently Asked questions?</p>
                </div>
            </div>
            <Accordion>
                <Accordion.Panel>
                    <Accordion.Title>
                        What is Encharet?
                    </Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            <p>
                            Encharet is an online platform that aggregates and delivers tender notices from various sources across Ethiopia. We provide a one-stop-shop for businesses and individuals seeking to explore opportunities in the Ethiopian market.
                            </p>
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                    Can a bidder withdraw a bid after a bid opening?
                    </Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            <p>
                            No, he can not. If at all he wishes to then he has to forfeit his EMD.
                            </p>
                        </p>

                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                    What is a tender document?
                    </Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            <p>
                            A tender document is the document which contains all terms and condition of the items/services to be procured by the purchaser. It generally includes: Terms and conditions, scope of supply, bill of quantity, format for agreement, Earnest Money Deposit, Security Deposit, do’s, don’t do’s, special condition of contract, general conditions of contract, payment terms, delivery time and locations etc.</p>
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                    What happens when only one bidder submit the bid?
                    </Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            <p>
                            Though, each and every government organization will have it's own procurement procedure, but in general public procurement across the globe, follow few basic principles: Transparency, Equal opportunity, value for money and money to be spent only for the purpose it is intended for. In case of only one response, generally all government entities will go for re-tender. But even after re-tendering there is only one response then depending upon the value of item to be purchased, price quoted by the bidder and urgency of the procurement, they may award the contract to the single bidder.
                            </p>
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                    Is there any way the bidder gets the refund of tender document fee, in case he is not successful?
                    </Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            <p>
                            No, there is no provision. Actually we should understand the rationale behind charging the tender document fee. The tender document fee is charged to cover the expenses incurred in preparing the same. The same is divided by approximate number of bidders who might purchase the tender document.
                            </p>
                        </p>

                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    )
}

export default FrequentlyAskedQuestionsPage