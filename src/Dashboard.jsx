import { useState } from "react";
import './Dashboard.css';

const Dashboard = () => {
  const [imagePreview, setImagePreview] = useState(null); // State to store the selected image preview

  // Handle image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setImagePreview(imageUrl); 
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Image Upload</h1>

      <div className="upload-section">
        <input
          type="file"
          className="file-input"
          onChange={handleImageUpload} 
          accept="image/*" 
        />
      </div>

      {imagePreview && (
        <div className="uploaded-image-section">
          <h3>Selected Image Preview:</h3>
          <img src={imagePreview} alt="uploaded preview" className="uploaded-image" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
