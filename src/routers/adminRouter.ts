import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import {
  getAdminInfo,
  adddriver,
  deleteBookingdata,
  deleteDriver,
  registerVehicle,
  removeVehicle,
  upadateDriver,
  updateVehicleInfomation,
  getDriverDetails,
  getDriverWithVehicle,
  gettingReport,
  getDriverWithVehicleandshifts,
  getDriverListWithVehicle,
  getDriverWithVehicleexculudeDriver,
  getBookingdeteails,
  addMultipleDrivers,
  setting,
  getsetting,
  registerVehiclewithparams,
  registerSharedVehicle,
  getAllShifts,
  getAllShifts12,
  updateSettings,
  disableDriver,
  activateDriver,
  getDriverWithAssignedVehicle,
  stopshiftbyadmin,
  scheduleRide,
  resetPassword,
  gettingReportAndSendEmail,
  getAllAdminInfo,
  stopAllShift,
  gettheScheduleBooking,
  updateScheduleData,
} from "../controller/adminController";
import { getAllBookingRider } from "../controller/BookingRide";

const router = express.Router();

// router.use(authorize(["admin", "super-admin", "fleet-manager"]));

router.get("/allAdminInfo", getAllAdminInfo)

router.get("/adminInfo", authenticate, authorize(["admin", "super-admin","fleet-manager"]), getAdminInfo);
router.post("/add-driver", authenticate, authorize(["admin", "super-admin"]), adddriver);
router.post("/resetPassword", authenticate, authorize(["admin", "super-admin"]), resetPassword);
router.post("/add-multi-driver", authenticate, authorize(["admin", "super-admin"]),addMultipleDrivers );
router.get(
  "/driver-details",
  authenticate,
  authorize(["admin", "super-admin", "fleet-manager"]),
  getDriverDetails,
);
router.put(
  "/update-driver/:driverId",
  authenticate,
  authorize(["admin", "super-admin"]),
  upadateDriver,
);
router.delete(
  "/delete-driver/:driverId",
  authenticate,
  authorize(["admin", "super-admin"]),
  deleteDriver,
);
router.put(
  "/disable-Driver/:driverId",
  authenticate,
  authorize(["admin", "super-admin"]),
  disableDriver,
);
router.put(
  "/activate-Driver/:driverId",
  authenticate,
  authorize(["admin", "super-admin"]),
  activateDriver,
);
router.put(
  "/stopshiftbyadmin/:driverId",
  authenticate,
  authorize(["admin", "super-admin"]),
  stopshiftbyadmin,
);

router.post(  
  "/register-vehicle-with_params/:driverId",
  authenticate,
  authorize(["admin", "super-admin", "fleet-manager"]),
  registerVehiclewithparams,
);
router.post(
  "/register-vehicle",
  authenticate,
  authorize(["admin", "super-admin", "fleet-manager"]),
  registerVehicle,
);
router.post(
  "/register-vehicle-shared",
  authenticate,
  authorize(["admin", "super-admin", "fleet-manager"]),
  registerSharedVehicle,
);
router.get(
  "/getDriverWithVehicle/:driverId",
  authenticate,
  authorize(["admin", "super-admin", "fleet-manager"]),
  getDriverWithVehicle,
);

router.get(
  "/getDriverWithVehicleandshifts/:driverId",
  authenticate,
  authorize(["admin", "super-admin", "fleet-manager"]),
  getDriverWithVehicleandshifts,
);


router.put(
  "/update-vehicle/:registrationNumber",
  authenticate,
  authorize(["admin", "super-admin", "fleet-manager"]),
  updateVehicleInfomation,
);

router.delete(
  "/remove-vehicle/:registrationNumber",
  authenticate,
  authorize(["admin", "super-admin", "fleet-manager"]),
  removeVehicle,
);

// Booking-related routes
router.delete(
  "/delete-all-bookings",
  authenticate,
  authorize(["admin", "super-admin"]),
  deleteBookingdata,
);
router.get("/getbooking",authenticate,   authorize(["admin", "super-admin", "fleet-manager"]), getAllBookingRider);
router.get("/getDriverListWithVehicle",authenticate, authorize(["admin", "super-admin"]), getDriverListWithVehicle);
router.get("/getDriverWithVehicleexculudeDriver",authenticate, authorize(["admin", "super-admin"]), getDriverWithVehicleexculudeDriver);
// router.get("/report-csv",authenticate, authorize(["admin"]), gettingReport);
router.get("/report-csv", gettingReport);
router.get("/monthly-report-csv", gettingReportAndSendEmail);
router.get("/bookings", authenticate, authorize(["admin", "super-admin", "fleet-manager"]),getBookingdeteails);


router.post("/settings", authenticate, authorize(["admin", "super-admin"]), setting);
router.put("/settings", authenticate, authorize(["admin", "super-admin"]), updateSettings);
router.get("/settings", getsetting);

router.post("/scheduleRide", authenticate, authorize(["admin", "super-admin"]), scheduleRide);

router.post("/stopAllShifts", stopAllShift);

router.get("/shiftsHistory",getAllShifts12)
router.get("/getallshiftwithdriverandvehicle", getDriverWithAssignedVehicle)

router.get("/getScheduleBookings", gettheScheduleBooking)

router.post("/updateScheduleRide/:id", updateScheduleData)

export default router;
