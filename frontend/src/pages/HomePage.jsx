import React, { useEffect } from "react";
import { useDateStore } from "../store/date.js";
import DateCard from "../components/DateCard.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { dates, fetchDates } = useDateStore();

    useEffect(() => {
        fetchDates();
    }, [fetchDates]);

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    Current Dates
                </h1>

                {dates.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {dates.map((date) => (
                            <DateCard key={date._id} date={date} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-10">
                        <p className="text-lg text-gray-600 mb-4">No Dates Found</p>
                        <Link
                            to="/create"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Create Date
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;