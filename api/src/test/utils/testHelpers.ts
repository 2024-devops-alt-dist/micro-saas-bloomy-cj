import { Response } from "express";

// Helper pour mocker Response Express
export const createMockResponse = () => {
    const res: Partial<Response> = {};

    // Status code
    res.status = function (code: number) {
        (this as any)._status = code;
        return this as Response;
    };
    // JSON body
    res.json = function (data: any) {
        (this as any)._body = data;
        return this as Response;
    };
   // Cookies
    (res as any)._cookies = {};

    res.cookie = function (name: string, value: string, options?: any) {
        (this as any)._cookies[name] = { value, options };
        return this as Response & { _status?: number; _body?: any; _cookies?: Record<string, any> };
    };

    res.clearCookie = function (name: string) {
        (this as any)._cookies[name] = null;
        return this as Response & { _status?: number; _body?: any; _cookies?: Record<string, any> };
    };

    return res as Response & {
        _status?: number;
        _body?: any;
        _cookies: Record<string, { value: any; options?: any } | null>;
    };

    
};