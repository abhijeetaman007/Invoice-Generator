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
      console.log("New set :",newDiscount)
    }

    const handleTaxChange = (event) =>{
      let newTax = event.target.value
      setTax(Number(newTax))
      console.log("New set tax:",newTax)
    }



    useEffect(() => {
        let newTotal = 0;
        items.forEach((element) => {
            newTotal = newTotal + element.price * element.qty;
        });

        setSubTotal(Math.round(newTotal))
        props.updateParentSubTotal(newTotal)
        
        console.log("Discount is ",discount)
        console.log("Tax is ",tax)

        newTotal = newTotal - (Number(discount)/100)*newTotal
        newTotal = newTotal + (Number(tax)/100)*newTotal

        setTotal(Math.round(newTotal));
        props.updateParentTotal(newTotal)
        props.updateParentItem(items)

        props.updateParentTax(tax)
        props.updateParentDiscount(discount)
        
    }, [items,discount,tax]);

    return (
        <div>
            <div className="ItemListWrapper">
                {items.map((item, index) => (
                    <div key={index} className="ItemWrapper">
                        <input
                            type="text"
                            name="name"
                            value={item.name}
                            placeholder="Item name"
                            onChange={(event) => handleItemChange(event, index)}
                        />
                        <input
                            type="number"
                            name="price"
                            value={item.price}
                            placeholder="Item Price"
                            onChange={(event) => handleItemChange(event, index)}
                        />
                        <input
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
            <hr></hr>
            <div className='TotalWrapper'>
            <label htmlFor="discount">Discount</label>
                <input
                    type="number"
                    name="discount"
                    value={discount}
                    placeholder="Enter Discount"
                    onChange={(event) => handleDiscountChange(event)}
                />
                 <label htmlFor="tax">Tax</label>
                <input
                    type="number"
                    name="tax"
                    value={tax}
                    placeholder="Enter Tax"
                    onChange={(event) => handleTaxChange(event)}
                />
                <p>SubTotal : ${subTotal}</p>
                <p>Total : $ {total}</p>
            </div>
        </div>
    );
}


// TODOs:
// Styling
// Add Validations before generate and download use of tooltip,highlight it and toast  
// Add View Template(Additional)
// Add notes additonal 