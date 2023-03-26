import React, { useState,useEffect } from 'react';

export default function InvoiceDetails(props) {
    const [date, setDate] = useState();
    const [invoiceNumber, setInvoiceNumber] = useState();
    const [companyLogo,setCompanyLogo] = useState();


    useEffect(() => {
        props.updateInvoiceDetails({
           date,invoiceNumber,companyLogo
        })
    },[date,invoiceNumber,companyLogo])    

    // let handleUploadImage = (event) => {
    //     console.log(event.target.files[0])
    //     let fileName = event.target.files[0].name
    //     // if(!(fileName.endsWith('.png')  || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.svg'))){
    //     //   toast.error("Enter valid image format!") 
    //     //   return; 
    //     // }
    //     console.log(event.target.files[0])
    //     setCompanyLogo(event.target.files[0])
    //     // setSignImage(event.target.files[0])
    //   };

    return (
        <div>
            <label htmlFor="date">Date :</label>
            <input
                id="invoiceno"
                type="date"
                name="date"
                placeholder="Enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="invoiceno">Invoice Number</label>
            <input
                id="invoiceno"
                type="text"
                name="name"
                placeholder="Enter Invoice Number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
            />
            <label htmlFor="companyLogo">Logo :</label>
            <input
                id="companyLogo"
                type="file"
                accept=".jpeg,.jpg,.svg,.png"
                name="companyLogo"
                placeholder="Your Company Logo"
                onChange={(e)=>{setCompanyLogo(e.target.files[0])}}
            />
        </div>
    );
}
