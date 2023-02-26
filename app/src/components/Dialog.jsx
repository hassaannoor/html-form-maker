import { useEffect } from "react";
import { useState } from "react";

export const Dialog = ({ isOpen, fieldData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(fieldData);
  useEffect(() => {
    console.log(fieldData);
    setFormData(fieldData)
  }, [fieldData]);

  const handleSave = () => {
    onSave(formData);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  return (
    <div id="dialog-container" style={{ display: isOpen ? "block" : "none" }}>
      <div id="dialog">
        <form id="field-form">
          <div className="form-group">
            <label htmlFor="label">Label:</label>
            <input
              type="text"
              name="label"
              id="label"
              value={formData.label}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="select">Select</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="required">Required:</label>
            <input
              type="checkbox"
              name="required"
              id="required"
              checked={formData.required}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value:</label>
            <input
              type="text"
              name="value"
              id="value"
              value={formData.value}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="placeholder">Placeholder:</label>
            <input
              type="text"
              name="placeholder"
              id="placeholder"
              value={formData.placeholder}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};
