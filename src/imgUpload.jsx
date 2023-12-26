import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './env';
const ImageUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    // console.log("sing;",e.target.files[0]);
    const selectedFiles = Array.from(e.target.files).slice(0, 4); // Limit selection to 4 files
    console.log("sle",selectedFiles);
    // setFiles(selectedFiles);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `${file.name}_${i}`;
      formData.append('images', file, fileName);
    }
    
    console.log(formData);
    try {
      await axios.post(BASE_URL+'/Product/uploadImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <input
        style={{ display: 'none' }}
        type="file"
        id="file"
        accept=".png,.jpeg,.jpg"
        multiple
        onChange={handleFileChange}
      />
      <label htmlFor="file">
        Select up to 4 images
      </label>
      <div>
        {files.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default ImageUploader;
