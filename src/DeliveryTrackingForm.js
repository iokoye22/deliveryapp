import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";
import "./DeliveryTrackingForm.css";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function DeliveryTrackingForm() {
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
    try {
      // Save to Firebase
      await addDoc(collection(db, "deliveries"), form);

      // Prepare data for email and Google Sheets
      const emailParams = {
        to_email: "ikeokoye617@gmail.com",
        driver_name: form.driverName,
        pickup_location: form.pickupLocation,
        pickup_time: form.pickupTime,
        bags_picked_up: form.bagsPickedUp,
        return_time: form.returnTime,
        bags_returned: form.bagsReturned,
      };

      // Send email via EmailJS
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        emailParams,
        "YOUR_PUBLIC_KEY"
      );

      // Submit to Google Sheets via a form submission
      await submitToGoogleSheets(form);

      alert("Delivery data saved, email sent, and added to Google Sheets successfully!");

      setForm({
        driverName: "",
        pickupLocation: "Whittier Health Pharmacy",
        pickupTime: "",
        bagsPickedUp: "",
        returnTime: "",
        bagsReturned: "",
      });
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Function to submit data to Google Sheets
  const submitToGoogleSheets = async (formData) => {
    // Create a FormData object to submit to a Google Form
    // Replace the URL below with your actual Google Form submission URL
    const googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse";
    
    // Map your form fields to Google Form field names
    // You'll need to inspect your Google Form to get the exact field names (usually entry.1234567890)
    const formEntries = new FormData();
    formEntries.append("entry.1", formData.driverName);
    formEntries.append("entry.2", formData.pickupLocation);
    formEntries.append("entry.3", formData.pickupTime);
    formEntries.append("entry.4", formData.bagsPickedUp);
    formEntries.append("entry.5", formData.returnTime);
    formEntries.append("entry.6", formData.bagsReturned);
    
    // Submit the form data
    try {
      // Using fetch with no-cors mode since this is a cross-origin request
      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: formEntries
      });
      console.log("Data submitted to Google Sheets");
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      // We don't throw the error here to prevent it from blocking the rest of the submission process
    }
  };

  return (
    <div className="delivery-form">
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

        <button
          onClick={handleSubmit}
          className="form-button"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}
