import React, { useState,useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function DetailsForm(props) {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();


    // const handleFormSubmit =async (e) => {
        
    //     e.preventDefault();
        
    //     if(!name){
    //         toast.error('Please enter name')
    //         return;    
    //     }
    //     if(!address){
    //         toast.error('Please enter address')
    //         return
    //     }
    //     if(!phoneNumber){
    //         toast.error('Please enter phone number')
    //         return;
    //     }
    //     if(!email){
    //         toast.error('Please enter email')
    //     }

    //     await props.updateDetails({name,address,phoneNumber,email})

    //     console.log("We are back!")
    //     // console.log("We got your values")
    //     // console.log(name,address,phoneNumber,email)
    //     handleClear(e)

    // }

    let handleUpdateName = (event) =>{
        setName(event.target.value)
        // props.updateDetails({
        //     name,email,address,phoneNumber
        // })
    }

    let handleUpdateAddress = (event) =>{
        setAddress(event.target.value)
        // props.updateDetails({
            // name,email,address,phoneNumber
        // })
    }

    let handleUpdateEmail = (event) =>{
        setEmail(event.target.value)   
        // props.updateDetails({
            // name,email,address,phoneNumber
        // })
    }

    let handleUpdatePhoneNumber = (event) =>{
        setPhoneNumber(event.target.value)
        // props.updateDetails({
            // name,email,address,phoneNumber
        // })
    }


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
                        id="name" // id corresponds to htmlFor in <label>
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name} // use state variable to keep track of value
                        // add onChange event to capture state changes when user types
                        onChange={handleUpdateName}
                    />
                    <label htmlFor="address">Address</label>
                    <input
                        id="address" // id corresponds to htmlFor in <label>
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={address} // use state variable to keep track of value
                        // add onChange event to capture state changes when user types
                        onChange={handleUpdateAddress}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        id="phoneNumber" // id corresponds to htmlFor in <label>
                        type="text"
                        name="firstName"
                        placeholder="Enter Phone Number"
                        value={phoneNumber} // use state variable to keep track of value
                        // add onChange event to capture state changes when user types
                        onChange={handleUpdatePhoneNumber}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email" // id corresponds to htmlFor in <label>
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={email} // use state variable to keep track of value
                        // add onChange event to capture state changes when user types
                        onChange={handleUpdateEmail}
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
