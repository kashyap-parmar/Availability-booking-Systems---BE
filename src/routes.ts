import { Router } from "express";
import {
    registerController,
    loginController,
    addAvailabilityController,
    getAvailabilityController,
    addBookingController,
    generateLinkController,
    getUserByIdController
} from "./controller";
import {
    validateBooking,
    validateAvailability,
    validateLogin,
    validateRegister
} from "./validations";
import { authMiddleware } from "./middleware";

// --------------------------------------------

const router = Router();

// --------------------------------------------

// Authentication
router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);

// 
router.get("/user/:id", authMiddleware, getUserByIdController);

// Availability routes
router.post("/availability/user/:id", authMiddleware, validateAvailability, addAvailabilityController);
router.get("/availability/link/:id", getAvailabilityController);

// generate link
router.post("/generatelink", authMiddleware, generateLinkController);

// Booking routes
router.post("/booking/availability/", validateBooking, addBookingController);

// --------------------------------------------

export default router;