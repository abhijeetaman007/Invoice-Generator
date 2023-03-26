import React, { useState,useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function TotalSection(props) {
    const [signImage, setSignImage] = useState();

    let handleUploadImage = (event) => {
      console.log(event.target.files[0])
      let fileName = event.target.files[0].name
      if(!(fileName.endsWith('.png')  || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.svg'))){
        toast.error("Enter valid image format!") 
        return; 
      }
      console.log(event.target.files[0])
      setSignImage(event.target.files[0])
    };

    useEffect(()=>{
      props.updateParentSignImage(signImage)
    },[signImage])

    return (
        <div className='UploadSignSectionWrapper'>
            <form>
              <Toaster />
                <label htmlFor="uploadImage">Upload Signature Image</label>
                <input
                    id="uploadImage"
                    type="file"
                    accept=".jpeg,.jpg,.svg,.png"
                    name="signImage"
                    placeholder="Upload-Signature-Image"
                    onChange={handleUploadImage}
                />
            </form>
        </div>
    );
}
