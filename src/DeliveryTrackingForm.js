import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";

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
      await addDoc(collection(db, "deliveries"), form);

      // Send email via EmailJS
      const emailParams = {
        driver_name: form.driverName,
        pickup_location: form.pickupLocation,
        pickup_time: form.pickupTime,
        bags_picked_up: form.bagsPickedUp,
        return_time: form.returnTime,
        bags_returned: form.bagsReturned,
      };

      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        emailParams,
        "YOUR_PUBLIC_KEY"
      );

      alert("Delivery data saved and email sent successfully!");

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

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Delivery Tracking</h2>

      <label className="block mb-2 text-sm font-medium">Driver Name</label>
      <input
        name="driverName"
        value={form.driverName}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Enter driver name"
      />

      <label className="block mb-2 text-sm font-medium">Pickup Location</label>
      <select
        name="pickupLocation"
        value={form.pickupLocation}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="Whittier Health Pharmacy">Whittier Health Pharmacy</option>
      </select>

      <label className="block mb-2 text-sm font-medium">Pickup Time</label>
      <input
        type="datetime-local"
        name="pickupTime"
        value={form.pickupTime}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">Bags Picked Up</label>
      <input
        type="number"
        name="bagsPickedUp"
        value={form.bagsPickedUp}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">Return Time</label>
      <input
        type="datetime-local"
        name="returnTime"
        value={form.returnTime}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">Bags Returned</label>
      <input
        type="number"
        name="bagsReturned"
        value={form.bagsReturned}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save Entry
      </button>
    </div>
  );
}
