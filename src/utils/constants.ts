export const SALT_ROUNDS = 10;
export const JWT_SECRET = process.env.JWT_SECRET || "availablities_booking_secret";
export const maxAge = 24 * 60 * 60 * 1000;
export const FRONTEND_OPTIONAL_ORIGIN = "http://localhost:3000";

// messages
export const USER_REGISTERED_SUCCESSFULLY = "User registered successfully";
export const USER_LOGGED_IN_SUCCESSFULLY = "User logged in successfully";
export const AVAILABILITY_RETRIEVED_SUCCESSFULLY = "Availability retrieved successfully";
export const AVAILABILITY_ADDED_SUCCESSFULLY = "Availability added successfully";
export const YOUR_BOOKING_IS_SUCCESSFULLY_ADDED = "Your booking is successfully added";
export const BOOKING_LINK_GENERATED_SUCCESSFULLY = "Booking link generated successfully";
export const USER_RETRIEVED_SUCCESSFULLY = "User retrieved successfully";
export const INVALID_CREDENTIALS = "Invalid credentials";
export const USER_ALREADY_EXISTS = "User already exists";
export const USER_NOT_FOUND = "User not found";
export const SLOT_ALREADY_BOOKED = "This slot is already booked or overlaps with an existing slot";
export const THE_LINK_IS_INVALID = "The link is invalid";
export const AVAILABILITY_NOT_FOUND = "Availability not found to generate link";
export const SLOT_ARE_BOOKED = "One or more slots are already booked";
export const VALIDATION_FAILED = "Validation failed";
export const INTERNAL_SERVER_ERROR = "Internal Server Error";
