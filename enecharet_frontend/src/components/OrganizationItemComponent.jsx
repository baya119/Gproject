import React from 'react';
import { Label, TextInput } from 'flowbite-react';



export const OrganizationItemComponent = (props) => {
    return (
        <div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="organizationName" value="Organization Name" />
                </div>
                <TextInput
                    id="organizationName"
                    type="text"
                    disabled={true}
                    placeholder="Please input your Organization Name here "
                    value={props.organization.name}
                    onChange={handleInputChange}
                    required={true}
                />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="orgType" value="Type" />
                </div>
                <TextInput
                    id="orgType"
                    type="text"
                    disabled={true}
                    placeholder="Please input your Organization Type here "
                    value={props.organization.type}
                    onChange={handleInputChange}
                    required={true}
                />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="tinNumber" value="TIN Number" />
                </div>
                <TextInput
                    id="tinNumber"
                    type="text"
                    disabled={true}
                    placeholder="Please input your Adress here "
                    value={props.organization.tin_number}
                    onChange={handleInputChange}
                    required={true}
                />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="location" value="Location" />
                </div>
                <TextInput
                    id="location"
                    type="text"
                    disabled={true}
                    placeholder="Please input your Adress here "
                    value={props.organization.location}
                    onChange={handleInputChange}
                    required={true}
                />
            </div>
        </div>
    )
}
