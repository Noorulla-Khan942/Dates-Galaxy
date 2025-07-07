import React, { useState } from "react";
import { useDateStore } from "../store/date.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePage = () => {
    const [newDate, setNewDate] = useState({
        name: "",
        price: "",
        image: ""
    });

    const {createDate} = useDateStore();

    const handleAddDate = async () => {
        const { success, message } = await createDate(newDate);
        if (success) {
            toast.success(message || "Date created successfully!");
            setNewDate({ name: "", price: "", image: "" });
        } else {
            toast.error(message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Create a New Date</h1>

            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4">
                <input
                    name="date"
                    type="text"
                    placeholder="Enter Date Name"
                    value={newDate.name}
                    onChange={(e) => setNewDate({ ...newDate, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Enter Date Price"
                    value={newDate.price}
                    onChange={(e) => setNewDate({ ...newDate, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    name="image"
                    type="text"
                    placeholder="Enter Image URL"
                    value={newDate.image}
                    onChange={(e) => setNewDate({ ...newDate, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleAddDate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                    Add Date
                </button>
            </div>
        </div>
    );
};

export default CreatePage;
