import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function DetailsForm() {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();


    const handleFormSubmit = (e) => {
        
        e.preventDefault();
        
        if(!name){
            toast.error('Please enter name')
            return;    
        }
        if(!address){
            toast.error('Please enter address')
            return
        }
        if(!phoneNumber){
            toast.error('Please enter phone number')
            return;
        }
        if(!email){
            toast.error('Please enter email')
        }

        console.log("We got your values")
        console.log(name,address,phoneNumber,email)
        handleClear(e)
    }


    function handleClear(e) {
        e.preventDefault();

        setName('');
        setAddress('');
        setEmail('');
        setPhoneNumber('');
    }


    return (
        <div>
            <form>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name" // id corresponds to htmlFor in <label>
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name} // use state variable to keep track of value
                        // add onChange event to capture state changes when user types
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="address">Address</label>
                    <input
                        id="address" // id corresponds to htmlFor in <label>
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={address} // use state variable to keep track of value
                        // add onChange event to capture state changes when user types
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        id="phoneNumber" // id corresponds to htmlFor in <label>
                        type="text"
                        name="firstName"
                        placeholder="Enter Phone Number"
                        value={phoneNumber} // use state variable to keep track of value
                        // add onChange event to capture state changes when user types
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email" // id corresponds to htmlFor in <label>
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={email} // use state variable to keep track of value
                        // add onChange event to capture state changes when user types
                        onChange={(e) => setEmail(e.target.value)}
                    />
            </form>
            <div className="button-container">
                    <button className="button" onClick={handleFormSubmit}>Submit</button>
                    <Toaster />
                    <button className="button" onClick={handleClear}>
                        Clear
                    </button>
                </div>
        </div>
    );
}
