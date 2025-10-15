import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
	name: string;
	brand: string;
	category: "Running" | "Casual" | "Sneaker" | "Slides";
	colorway?: string;
	sizeRange?: number[];
	price: number;
	material?: string;
	sizes: { size: number; quantity: number }[];
	releaseDate?: Date;
	limitedEdition?: boolean;
	images: string[];
	description?: string;
	createdAt: Date;
	updatedAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>(
	{
		name: { type: String, required: true },
		brand: { type: String, required: true },
		category: { type: String, required: true, enum: ["Running", "Casual", "Sneaker", "Slides"] },
		colorway: String,
		sizeRange: [Number],
		price: { type: Number, required: true },
		material: String,
		releaseDate: Date,
		limitedEdition: Boolean,
		images: { type: [String], required: true },
		description: String,
		sizes: [	
			{
				size: { type: Number, required: true },
				quantity: { type: Number, default: 0 }
			}
		]
	},
	{ timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
