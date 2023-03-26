import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function ItemList(props) {
    const [items, setItems] = useState([{ name: '', price: '', qty: '' }]);
    const [total, setTotal] = useState(0);
    const [subTotal,setSubTotal] = useState(0)
    const [tax, setTax] = useState();
    const [discount, setDiscount] = useState();

    const handleItemChange = (event, index) => {
        const newItems = [...items];
        newItems[index][event.target.name] = event.target.value;
        setItems(newItems);
        
    };

    const handleAddItem = () => {
        setItems([...items, { name: '', price: '', qty: '' }]);
    };

    const handleDeleteItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleDiscountChange = (event) =>{
      let newDiscount = event.target.value
      setDiscount(Number(newDiscount))
    }

    const handleTaxChange = (event) =>{
      let newTax = event.target.value
      setTax(Number(newTax))
    }



    useEffect(() => {
        console.log("Inside Use Effect!")

        let newTotal = 0;
        items.forEach((element) => {
            newTotal = newTotal + element.price * element.qty;
        });

        setSubTotal(Math.round(newTotal))
        setTotal(Math.round(newTotal))
        console.log("Neww Totalllingggg")
        console.log(newTotal)
        console.log(total)
        console.log(subTotal)
        props.updateParentItem(items)
        props.updateParentSubTotal(newTotal)
        props.updateParentTotal(newTotal)
        

        console.log("Discount is ",discount)
        console.log("Tax is ",tax)

        // if(discount){
            newTotal = newTotal - (Number(discount)/100)*newTotal
        // }
        // if(tax){
            newTotal = newTotal + (Number(tax)/100)*newTotal
        // }

        if(isNaN(newTotal))
            newTotal = 0
        setTotal(subTotal);
        
        props.updateParentTotal(newTotal)
        props.updateParentItem(items)
        props.updateParentTax(tax)
        props.updateParentDiscount(discount)
        
    }, [items,discount,tax,total,subTotal]);

    return (
        <div>
            <div className="ItemListWrapper">
            <h2>Items</h2>
              <hr/>
                {items.map((item, index) => (
                    <div key={index} className="ItemWrapper">
                        <input 
                            className='ItemInput'
                            type="text"
                            name="name"
                            value={item.name}
                            placeholder="Item name"
                            onChange={(event) => handleItemChange(event, index)}
                        />
                        <input
                            className='ItemInput'
                            type="number"
                            name="price"
                            value={item.price}
                            placeholder="Item Price"
                            onChange={(event) => handleItemChange(event, index)}
                        />
                        <input
                            className='ItemInput'
                            type="number"
                            name="qty"
                            value={item.qty}
                            placeholder="Item Qty"
                            onChange={(event) => handleItemChange(event, index)}
                        />
                        <button
                            className="DeleteButton"
                            onClick={() => handleDeleteItem(index)}
                        >
                            <RiDeleteBin6Line />
                        </button>
                    </div>
                ))}
                <button onClick={handleAddItem}>Add item</button>
            </div>
            
            <div className='TotalWrapper'>
            <h2>Total</h2>
              <hr/>
            <label htmlFor="discount">Discount</label>
                <input
                    type="number"
                    name="discount"
                    value={discount}
                    placeholder="Enter Discount Percentage"
                    onChange={(event) => handleDiscountChange(event)}
                />
                 <label htmlFor="tax">Tax</label>
                <input
                    type="number"
                    name="tax"
                    value={tax}
                    placeholder="Enter Tax Percentage"
                    onChange={(event) => handleTaxChange(event)}
                />
                <hr/>
                <h3 className='Total'>Total    :&nbsp;&nbsp;&nbsp; $ {total}</h3>
            </div>
        </div>
    );
}


// TODOs:
// Styling
// Add Validations before generate and download use of tooltip,highlight it and toast  
// Add View Template(Additional)
// Add notes additonal 