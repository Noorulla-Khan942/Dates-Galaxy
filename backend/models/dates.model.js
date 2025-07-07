import mongoose from "mongoose";

const datesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Date = mongoose.model("Date",datesSchema)

export default Date;