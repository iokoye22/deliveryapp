import React, { useState, useEffect } from "react";
//import { getFirestore, collection, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";
import "./DeliveryTrackingForm.css";
// import { app } from "./firebase"; // Import the Firebase app instance

//const db = getFirestore(app);

export default function DeliveryTrackingForm() {
  useEffect(() => {
    emailjs.init("xD9jHwHxB7nQPFl0h"); // Replace with your actual EmailJS public key
  }, []);

  const [showThankYou, setShowThankYou] = useState(false);

  const [form, setForm] = useState({
    driverName: "",
    pickupLocation: "Whittier Health Pharmacy",
    pickupTime: "",
    bagsPickedUp: "",
    returnTime: "",
    bagsReturned: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredFields = ["driverName", "pickupTime", "bagsPickedUp", "returnTime", "bagsReturned"];
    const emptyFields = requiredFields.filter(field => !form[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    try {
      await emailjs.send(
        "service_iezvzeg", 
        "template_96ly2xd",
        {
          driver_name: form.driverName,
          pickup_location: form.pickupLocation,
          pickup_time: form.pickupTime,
          bags_picked_up: form.bagsPickedUp,
          return_time: form.returnTime,
          bags_returned: form.bagsReturned,
          message: `New Delivery Entry Submitted!\n\nDriver: ${form.driverName}\nPickup Location: ${form.pickupLocation}\nPickup Time: ${form.pickupTime}\nBags Picked Up: ${form.bagsPickedUp}\n\nReturn Time: ${form.returnTime}\nBags Returned: ${form.bagsReturned}\n\n Please verify and log this delivery.`,
          subject: `New Delivery for: ${form.returnTime}`
        },
        "xD9jHwHxB7nQPFl0h"
      );

      //await addDoc(collection(db, "deliveries"), form);

      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);

      setForm({
        driverName: "",
        pickupLocation: "Whittier Health Pharmacy",
        pickupTime: "",
        bagsPickedUp: "",
        returnTime: "",
        bagsReturned: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="delivery-form">
      {showThankYou && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-icon">✅</div>
            <h3 className="popup-title">Thank You!</h3>
            <p className="popup-message">
              Thank you for your delivery service! Your entry has been successfully submitted and recorded.
            </p>
            <button className="popup-button" onClick={() => setShowThankYou(false)}>Close</button>
          </div>
        </div>
      )}

      <h2 className="form-title">Delivery Tracking</h2>

      <div className="form-container">
        <div className="form-group">
          <label className="form-label">Driver Name</label>
          <input
            name="driverName"
            value={form.driverName}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter driver name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Pickup Location</label>
          <select
            name="pickupLocation"
            value={form.pickupLocation}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Whittier Health Pharmacy">Whittier Health Pharmacy</option>
            <option value="Boston Healthcare for the Homeless Pharmacy">Boston Healthcare for the Homeless Pharmacy</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Pickup Time</label>
          <input
            type="datetime-local"
            name="pickupTime"
            value={form.pickupTime}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bags Picked Up</label>
          <input
            type="number"
            name="bagsPickedUp"
            value={form.bagsPickedUp}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Return Time</label>
          <input
            type="datetime-local"
            name="returnTime"
            value={form.returnTime}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bags Returned</label>
          <input
            type="number"
            name="bagsReturned"
            value={form.bagsReturned}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button onClick={handleSubmit} className="form-button">
          Submit Entry
        </button>
      </div>
    </div>
  );
}
