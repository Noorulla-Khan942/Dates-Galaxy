import React, { useState } from "react";
import { useDateStore } from "../store/date.js";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DateCard = ({ date }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDate, setUpdatedDate] = useState(date);
  const { updateDate, deleteDate } = useDateStore();

  const handleDeleteDate = async (pid) => {
    const { success, message } = await deleteDate(pid);
    if (success) {
      toast.success(message || "Date deleted successfully!");
    } else {
      toast.error(message || "Something went wrong. Please try again.");
    }
  };

  const handleUpdateDate = async (pid, updatedDate) => {
    const { success, message } = await updateDate(pid, updatedDate);
    if (success) {
      toast.success(message || "Date updated successfully!");
      setIsEditing(false);
    } else {
      toast.error(message || "Something went wrong. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedDate(date);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm mx-auto p-4 mb-6">
      <img
        src={date?.image}
        alt={date?.name || "Date Image"}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-gray-800">{date.name}</h2>
        <h4 className="text-gray-600">Rs. {date.price}</h4>
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 hover:text-blue-800 transition text-lg"
        >
          <FaEdit />
        </button>
        <button
        type="button"
          onClick={() => handleDeleteDate(date._id)}
          className="text-red-600 hover:text-red-800 transition text-lg"
        >
          <MdDelete />
        </button>
      </div>

      {isEditing && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Update Date Details</h2>

          <div className="space-y-3">
            <input
              name="date"
              type="text"
              placeholder="Enter Date Name"
              value={updatedDate.name}
              onChange={(e) =>
                setUpdatedDate({ ...updatedDate, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="price"
              type="number"
              placeholder="Enter Date Price"
              value={updatedDate.price}
              onChange={(e) =>
                setUpdatedDate({ ...updatedDate, price: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="image"
              type="text"
              placeholder="Enter Image URL"
              value={updatedDate.image}
              onChange={(e) =>
                setUpdatedDate({ ...updatedDate, image: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => handleUpdateDate(date._id, updatedDate)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateCard;
