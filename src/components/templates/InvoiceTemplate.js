import React, {useRef} from 'react';
import jsPDF from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';



const validate = (data) =>{

  let validate = true;

  if(!data.invoiceDetails.date){
    validate = false
    toast.error("Please Enter Invoice Date!",{
      closeButton: true,
    })
  }
  if(!data.invoiceDetails.invoiceNumber){
    validate = false
    toast.error("Please Enter Invoice Number!")
  }
  if(!data.invoiceDetails.companyLogo){
    validate = false
    toast.error("Please Enter Company Logo!!")
  }
  
  if(!data.senderDetails.name){
    validate = false
    toast.error("Please Enter Sender's Name!")
  }
  if(!data.senderDetails.email){
    validate = false
    toast.error("Please Enter Sender's Email!")
  }
  if(!data.senderDetails.address){
    validate = false
    toast.error("Please Enter Sender's Address!")
  }
  if(!data.senderDetails.phoneNumber){
    validate = false
    toast.error("Please Enter Sender's PhoneNumber!")
  }
  
  if(!data.receiverDetails.name){
    validate = false
    toast.error("Please Enter Receiver's Name!")
  }
  if(!data.receiverDetails.email){
    validate = false
    toast.error("Please Enter Receiver's Email!")
  }
  if(!data.receiverDetails.address){
    validate = false
    toast.error("Please Enter Receiver's Address!")
  }
  if(!data.receiverDetails.phoneNumber){
    validate = false
    toast.error("Please Enter Receiver's PhoneNumber!")
  }

  if(!data.signImage){
    validate = false
    toast.error("Please Enter Image of your signature!")
  }

  return validate;
}


const InvoiceTemplate = (props) => {

    const downloadPDF = async () => {
        console.log(props);
        if(!validate(props.data)){
          return;
        }
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
        toast.success("Invoice Generated!")
    };

    return (
        <div>
            <button onClick={downloadPDF}>Generate Invoice</button>
        </div>
    );
};

export default InvoiceTemplate;
