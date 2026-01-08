import { Request, Response, NextFunction } from "express";
import logger from "./logger";

function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
	const status = err?.status || 500;
	const message = err?.message || "Internal Server Error";

	// Log the error with request info
	logger.error(`${req.method} ${req.originalUrl} - ${message}`);

	const payload: Record<string, unknown> = { status: "error", message };
	if (process.env.NODE_ENV === "development" && err?.stack) {
		payload.details = err.stack;
	}

	res.status(status).json(payload);
}

export default errorHandler;
