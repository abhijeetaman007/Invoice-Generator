import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {
    const [signImage, setSignImage] = useState();

    let handleUploadImage = (event) => {
      // console.log(event.target.files[0])
      console.log("How is it?")
      console.log(event.target.files[0])
      let fileName = event.target.files[0].name
      if(!(fileName.endsWith('.png')  || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.svg'))){
        toast.error("Enter valid image format!") 
        return; 
      }
      console.log("Here!!!!!!!!!!!")
      console.log(event.target.files[0])
      setSignImage(event.target.files[0])
      
      
      // console.log(signImage)
    };

    return (
        <div>
            <form>
              <Toaster />
                <label htmlFor="uploadImage">Upload Signature Image</label>
                <input
                    id="uploadImage" // id corresponds to htmlFor in <label>
                    type="file"
                    accept=".jpeg,.jpg,.svg,.png"
                    name="signImage"
                    placeholder="Upload-Signature-Image"
                    // value={signImage} // use state variable to keep track of value
                    // add onChange event to capture state changes when user types
                    onChange={handleUploadImage}
                />
            </form>
        </div>
    );
}
