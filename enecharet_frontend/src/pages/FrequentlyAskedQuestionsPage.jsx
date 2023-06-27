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
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. At, mollitia!
                                Dolore quia tempora inventore, nostrum explicabo soluta dolorem eligendi aliquid ex labore fugiat consectetur ut similique quas sint iusto saepe? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae assumenda quo nulla quaerat iure, unde repellat sed temporibus qui magni, laboriosam eum itaque eos quibusdam expedita, non ex sequi facere.
                            </p>
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                        Is it legall to use?
                    </Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi qui vel rem consequatur delectus provident illo quia ipsum accusantium, dolorem exercitationem. Pariatur labore earum facilis tenetur libero consequuntur alias quod?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ab, dicta, alias iure maiores asperiores quidem ea aut, est repellat hic cupiditate architecto quasi facilis nesciunt! Ipsum dolor ad aut.
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae dolor id ad eius, assumenda nulla voluptate ducimus. Tempora exercitationem sint magnam vitae, sequi id ducimus pariatur doloribus eos itaque? Inventore.
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil fugiat repellat itaque dolorum repellendus error architecto consectetur quaerat cumque, exercitationem vel quam voluptatibus beatae vero libero, esse quidem expedita similique!
                            </p>
                        </p>

                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                        How do you get your TIN number?
                    </Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut placeat necessitatibus nobis, eveniet nihil explicabo. Mollitia placeat, ab amet quas culpa illum harum voluptatibus exercitationem ipsam obcaecati consequuntur, facilis nobis.
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, natus, fugit unde ad fugiat numquam asperiores accusantium, quasi iste tenetur impedit suscipit fuga qui non eaque. Labore porro sit quo?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, veniam eaque unde tempore, numquam vero accusantium, iusto quas earum minima nostrum consequatur molestiae eum quo tenetur fugit laudantium cum. Ab.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit natus aut, qui tenetur enim, incidunt earum magnam, explicabo laboriosam quisquam nam culpa. Harum assumenda totam accusantium, eveniet exercitationem atque non.
                            </p>
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    )
}

export default FrequentlyAskedQuestionsPage