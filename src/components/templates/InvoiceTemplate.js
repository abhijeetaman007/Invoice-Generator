import React, {useRef} from 'react';
import jsPDF from 'jspdf';

const InvoiceTemplate = (props) => {
    const pdfRef = useRef(null);

    const downloadPDF = async () => {
        console.log(props);

        const doc = new jsPDF();

        function encodeImage(image) {
            return new Promise((resolve, reject) => {
                var img = image;
                var file = new FileReader();
                file.onloadend = function () {
                    resolve(file.result);
                };
                file.readAsDataURL(img);
            });
        }

        let companyLogo = await encodeImage(props.data.invoiceDetails.companyLogo);

        // Add company logo
        doc.addImage(companyLogo, 'PNG', 15, 15, 30, 30);

        doc.setFontSize(12);
        doc.text(props.data.senderDetails.name, 60, 25);
        doc.text(props.data.senderDetails.address, 60, 32);
        doc.text(props.data.senderDetails.phoneNumber, 60, 39);
        console.log(props.data.senderDetails.email);
        doc.text(props.data.senderDetails.email, 60, 46);

        // Add invoice number and date
        doc.setFontSize(16);
        doc.text('INVOICE', 140, 25);
        doc.setFontSize(12);
        doc.text(props.data.invoiceDetails.invoiceNumber, 140, 35);
        doc.text('Date: '+props.data.invoiceDetails.date, 140, 42);

        // Add customer information
        doc.setFontSize(12);
        doc.text('Bill To:', 15, 70);
        doc.text(props.data.receiverDetails.name, 15, 77);
        doc.text(props.data.receiverDetails.address, 15, 84);
        doc.text(props.data.receiverDetails.phoneNumber, 15, 91);
        doc.text(props.data.receiverDetails.email, 15, 98);

        // Add table header
        doc.setFillColor(240);
        doc.rect(15, 110, 180, 10, 'F');
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text('SlNo.', 20, 116);
        doc.text('Item', 60, 116);
        doc.text('Quantity', 120, 116);
        doc.text('Price', 160, 116);
        doc.line(15, 118, 195, 118);

        // Add table rows
        doc.setFontSize(10);
        let y = 125;
        for (let index = 0; index < props.data.items.length; index++) {
            y = 125 + 7 * index;
            doc.text(String(index + 1), 20, y);
            doc.text(props.data.items[index].name, 60, y);
            doc.text(props.data.items[index].price, 120, y);
            doc.text(props.data.items[index].qty, 160, y);
        }

        // Add table footer
        doc.setDrawColor(0);
        doc.line(15, y+28, 195, y+28);
        doc.text('Subtotal:', 120, y+35);
        doc.text(String(Math.round(props.data.subTotal)), 160, y+35);

        let discountPercentage = Number(props.data.discount);
        let taxPercentage = Number(props.data.tax / 100);
        let subTotal = Number(props.data.subTotal);
        let discount = (discountPercentage / 100) * subTotal;
        let discountedTotal = subTotal - discount;

        console.log('discount is ', discount);
        doc.text('Discount:', 120, y+42);
        doc.text(String(Math.round(discount)), 160, y+42);

        let tax = discountedTotal * taxPercentage;
        doc.text('Tax:', 120, y+49);
        doc.text(String(Math.round(tax)), 160, y+49);
        doc.text('Total:', 120, y+56);
        doc.text(String(Math.round(props.data.total)), 160, y+56);

        let signImage = await encodeImage(props.data.signImage)
        // Adding Signature
        doc.addImage(signImage,'PNG',20,y+35,30,30)

        doc.save('invoice.pdf');
    };

    return (
        <div>
            <button onClick={downloadPDF}>Download PDF</button>
            <div ref={pdfRef} />
        </div>
    );
};

export default InvoiceTemplate;
