import React, { useState } from 'react';
import DetailsForm from './DetailsForm';
import InvoiceDetails from './InvoiceDetails';
import ItemList from './ItemList';
import InvoiceTemplate from './templates/InvoiceTemplate';
import TotalSection from './TotalSection';

export default function InvoiceGenerator() {
    const [data, setData] = useState({
        invoiceDetails:{
            date:'',
            invoiceNumber:'',
            companyLogo:''
        },
        items: [],
        senderDetails: {
            name: '',
            email: '',
            address: '',
            phoneNumber: '',
        },
        receiverDetails: {
            name: '',
            email: '',
            address: '',
            phoneNumber: '',
        },
        discount: 0,
        tax: 0,
        subTotal: 0,
        total: 0,
        signImage:''
    });

    let handleItemUpdate = (items) => {
        console.log('Update Handle Item Parent!');
        data.items = [...items];
        setData(data);
        console.log(data);
    };

    let handleSenderDetailsUpdate = (senderDetails) => {
        console.log('Update Handle Sender Parent!');
        console.log(senderDetails);
        data.senderDetails = senderDetails;
        setData(data);
        console.log(data);
    };

    let handleReceiverDetailsUpdate = (receiverDetails) => {
        console.log('Update Handle Recevier Parent!');
        console.log(receiverDetails);
        data.receiverDetails = receiverDetails;
        setData(data);
        console.log(data);
    };

    let handleDiscountUpdate = (discount) => {
        data.discount = discount;
        setData(data);
        console.log(data);
    };

    let handleTaxUpdate = (tax) => {
        data.tax = tax;
        setData(data);
        console.log(data);
    };

    let handleSubTotalUpdate = (subTotal) => {
        data.subTotal = subTotal;
        setData(data);
        console.log(data);
    };
    let handleTotalUpdate = (total) => {
        data.total = total;
        setData(data);
        console.log(data);
    };
    let handleSignImage = (signImage) =>{
        data.signImage = signImage
        setData(data)
        console.log(data)
    }
    let handleInvoiveDetails = (invoiceDetails)=>{
        data.invoiceDetails = invoiceDetails
        setData(data)
        console.log(data) 
    }

    return (
        <div className="InvoiceGenerator">
            <h1>Invoice Generator</h1>
            <InvoiceDetails updateInvoiceDetails={handleInvoiveDetails}></InvoiceDetails>
            <div>
                <div className="Details-wrapper">
                    <h2>Sender's Information</h2>
                    <DetailsForm
                        updateDetails={handleSenderDetailsUpdate}
                    ></DetailsForm>
                </div>
                <div className="Details-wrapper">
                    <h2>Recipient's Information</h2>
                    <DetailsForm
                        updateDetails={handleReceiverDetailsUpdate}
                    ></DetailsForm>
                </div>
                <ItemList
                    updateParentItem={handleItemUpdate}
                    updateParentTax={handleTaxUpdate}
                    updateParentDiscount={handleDiscountUpdate}
                    updateParentSubTotal={handleSubTotalUpdate}
                    updateParentTotal={handleTotalUpdate}
                ></ItemList>
                <TotalSection updateParentSignImage={handleSignImage}></TotalSection>
                <InvoiceTemplate data={data} />
            </div>
        </div>
    );
}
