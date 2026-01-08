import { Response } from "express";

export const parseId = (value: any): number | null => {
	const parsedNumber = Number(value);
	return Number.isNaN(parsedNumber) ? null : parsedNumber;
};

export const handleServerError = (res: Response, message: string, error: any) => {
	console.error(error);
	return res.status(500).json({ message, error });
};

export default { parseId, handleServerError };

