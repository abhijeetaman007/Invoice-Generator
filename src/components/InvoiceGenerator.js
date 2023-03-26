import React, { useState } from 'react';
import DetailsForm from './sections/DetailsForm';
import InvoiceDetails from './sections/InvoiceDetails';
import ItemList from './sections/ItemList';
import InvoiceTemplate from './templates/InvoiceTemplate';
import SignatureUpload from './sections/SignatureUpload';
import logo from '../resources/logo.jpg'

export default function InvoiceGenerator() {
    const [data, setData] = useState({
        invoiceDetails: {
            date: '',
            invoiceNumber: '',
            companyLogo: '',
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
        signImage: '',
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
        console.log("Handle Total Called!")
        data.total = total;
        setData(data);
        console.log(data);
    };
    let handleSignImage = (signImage) => {
        data.signImage = signImage;
        setData(data);
        console.log(data);
    };
    let handleInvoiveDetails = (invoiceDetails) => {
        data.invoiceDetails = invoiceDetails;
        setData(data);
        console.log(data);
    };

    return (
        <div className="InvoiceGenerator">
            <div className='InvoiceHeader'>
                <img src={logo} style={{height:100,width:100,borderRadius:20}}></img>
                <h1 style={{paddingLeft:20}}>Invoice Generator</h1>
            </div>

            <InvoiceDetails
                updateInvoiceDetails={handleInvoiveDetails}
            ></InvoiceDetails>
            <div>
                <div className="Details-container">
                    <div className="Details-wrapper">
                        <h2>Sender's Information</h2>
                        <hr />
                        <DetailsForm
                            updateDetails={handleSenderDetailsUpdate}
                        ></DetailsForm>
                    </div>
                    <div className="Details-wrapper">
                        <h2>Recipient's Information</h2>
                        <hr />
                        <DetailsForm
                            updateDetails={handleReceiverDetailsUpdate}
                        ></DetailsForm>
                    </div>
                </div>
                <ItemList
                    updateParentItem={handleItemUpdate}
                    updateParentTax={handleTaxUpdate}
                    updateParentDiscount={handleDiscountUpdate}
                    updateParentSubTotal={handleSubTotalUpdate}
                    updateParentTotal={handleTotalUpdate}
                ></ItemList>
                <SignatureUpload
                    updateParentSignImage={handleSignImage}
                ></SignatureUpload>
                <InvoiceTemplate data={data} />
            </div>
        </div>
    );
}
