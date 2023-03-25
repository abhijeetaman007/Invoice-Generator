import React from 'react';
import DetailsForm from './DetailsForm';
import Footer from './Footer';
import InvoiceDetails from './InvoiceDetails';
import ItemList from './ItemList';
import Items from './ItemList';
import InvoiceTemplate from './templates/InvoiceTemplate';
import TotalSection from './TotalSection';

export default function InvoiceGenerator() {
    return (
        <div className="InvoiceGenerator">
            <InvoiceDetails></InvoiceDetails>
            <div>
                <h3>Invoice Details</h3>
            </div>
            <div>
                <div className="Details-wrapper">
                    <h2>Sender's Information</h2>
                    <DetailsForm></DetailsForm>
                </div>
                <div className="Details-wrapper">
                    <h2>Recipient's Information</h2>
                    <DetailsForm></DetailsForm>
                </div>
                <ItemList></ItemList>
                <Footer></Footer>
                <InvoiceTemplate/>
            </div>
        </div>
    );
}
