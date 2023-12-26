import React from 'react';

const ProductDescription = ({description,setDescription}) => {   
  const characterLimit=300;
  const handleDescriptionChange = (event) => {
    const inputValue=event.target.value;
    if (inputValue.length <= characterLimit) {
        setDescription(inputValue);
      }
  };

  return (
    <div style={containerStyle} >
      <h2 className='title text-lg font-bold text-neutral-600 mt-10 border-b pb-3'>Description</h2>
      <textarea  
        className='m-5'
        fullWidth
        onChange={handleDescriptionChange}
        placeholder="Describe your product like the condition,price negotiable, preffered mode of communication (Email/Whatsapp/Call)."
        style={textAreaStyle}
        required
        value={description}
      />
      <p style={characterCountStyle}> {characterLimit-description.length} characters</p>
    </div>
  );
};

const containerStyle = {
  margin: '20px 0',
};

const textAreaStyle = {
  width: '90%',
  minHeight: '100px',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  resize: 'vertical',
};
 
const characterCountStyle = {
  textAlign: 'right',
  color: '#777',
};

export default ProductDescription;