import mongoose from "mongoose";
import Date from "../models/dates.model.js";

export const fetchDates = async (req, resp) => {
    try {
        const dates = await Date.find({});
        resp.status(200).json({success: true, data: dates})
    } catch (error) {
        console.log("Error fetching data:", error.message)
        resp.status(500).json({success: false, message: "Server Error"})
    }
}

export const createDate = async (req, resp) => {
    const date = req.body;

    if(!date.name || !date.price || !date.image) {
        return resp.status(400).json({success: false, message: "Kindly fill in all the feilds"})
    }

    const newDate = new Date(date);

    try {
        await newDate.save();
        resp.status(200).json({success: true, data: newDate})
        console.log("Date ctreated successfully")
    } catch (error) {
        console.log("Error creating date:", error.message)
        resp.status(500).json({success: false, message: "Server Error"})
    }
}

export const updateDate = async (req, resp) => {
    const {id} = req.params;
    const date = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return resp.status(400).json({success: false, message: "Kindly provide valid Id"})
    }

    try {
        const updateDate = await Date.findByIdAndUpdate(id, date, {new: true});
        resp.status(200).json({success: true, data: updateDate});
    } catch (error) {
        console.log("Error updating date:", error.message)
        resp.status(500).json({success: false, message: "Server Error"})
    }
}

export const deleteDate = async (req, resp) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return resp.status(400).json({success: false, message: "Kindly provide valid Id"})
    }

    try {
        await Date.findByIdAndDelete(id);
        resp.status(200).json({success: true, message: "Date deleted successfully"})
    } catch (error) {
        console.log("Error deleting date:", error.message)
        resp.status(500).json({success: false, message: "Server Error"})
    }
}