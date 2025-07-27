export class AppError extends Error {
  
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: any;

    constructor(message: string, statusCode: number, isOperational = true, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

// Not found error 
export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found', details?: any) {
        super(message, 404, true, details);
    }
}

// Validation error 
export class ValidationError extends AppError {
    constructor(message: string = 'Invalid request data', details?: any) {
        super(message, 400, true, details);
    }
}

// Authentication error
export class AuthError extends AppError {
    constructor(message: string = 'Unauthorizes', details?: any) {
        super(message, 401, true, details);
    }
}

//Forbidden error
export class ForbiddenError extends AppError {
    constructor(message: string = "Forbidden access", details?: any) {
        super(message, 403, true, details);
    }
}

// Database error
export class DatabaseError extends AppError {
    constructor(message: string = "Database error", details?: any) {
        super(message, 500, true, details);
    }
}

// Rate limit error 
export class RateLimitError extends AppError {
    constructor(message: string = 'Too many requests, Please try again later', details?: any) {
        super(message, 429, true, details);
    }
}

