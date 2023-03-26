import React, { useState,useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function DetailsForm(props) {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();

    function handleClear(e) {
        e.preventDefault();

        setName('');
        setAddress('');
        setEmail('');
        setPhoneNumber('');
    }

    useEffect(() => {
        props.updateDetails({
            name,email,address,phoneNumber
        })
    },[name,address,email,phoneNumber])

    return (
        <div>
            <form>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name" 
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <label htmlFor="address">Address</label>
                    <input
                        id="address" 
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={address} 
                        onChange={(e)=>setAddress(e.target.value)}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        id="phoneNumber" 
                        type="text"
                        name="firstName"
                        placeholder="Enter Phone Number"
                        value={phoneNumber} 
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email" 
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                    />
            </form>
            <div className="button-container">
                    {/* <button className="button" onClick={handleFormSubmit}>Submit</button> */}
                    <Toaster />
                    <button className="button" onClick={handleClear}>
                        Clear
                    </button>
                </div>
        </div>
    );
}
