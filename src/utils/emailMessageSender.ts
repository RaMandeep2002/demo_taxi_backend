import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const getTransporter = () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        throw new Error("EMAIL_USER or EMAIL_PASSWORD not set in environment variables.");
    }
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

export const sendEmailMessage = async (
    date: string,
    time: string,
    customerName: string,
    customerPhone: string,
    pickupAddress: string,
    dropOffAddress: string,
    customer_email?: string,
    number_of_passengers?: string,
) => {
    try {
        const transporter = getTransporter();

        const mailOptions = {
            from: `"Demo Taxi" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Ride Booking Notification: ${customerName} at ${time} on ${date}`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
              <h2 style="color: #333333; text-align: center; background-color: #ffd700; padding: 10px; border-radius: 6px;">🚕 Ride Booking Received</h2>
              <p style="font-size: 16px; color: #555;">A new ride has been booked. Please note that you will be notified at the scheduled time.</p>
              <p style="font-size: 16px; color: #555;"><strong>Date:</strong> ${date}</p>
              <p style="font-size: 16px; color: #555;"><strong>Time:</strong> ${time}</p>
              <p style="font-size: 16px; color: #555;"><strong>Customer Name:</strong> ${customerName}</p>
              <p style="font-size: 16px; color: #555;"><strong>Customer Email:</strong> ${customer_email || "N/A"}</p>
              <p style="font-size: 16px; color: #555;"><strong>Number Of Passengers:</strong> ${number_of_passengers ?? "N/A"}</p>
              <p style="font-size: 16px; color: #555;"><strong>Phone Number:</strong> ${customerPhone}</p>
              <p style="font-size: 16px; color: #555;"><strong>Pickup Address:</strong><br/> ${pickupAddress}</p>
              <p style="font-size: 16px; color: #555;"><strong>Drop-off Address:</strong><br/> ${dropOffAddress}</p>
            </div>
          `
        };
        await transporter.sendMail(mailOptions);
        console.log("✅ Ride schedule email sent successfully");
    } catch (error) {
        console.error("⚠️ Failed to send admin email: ", error);
    }
};

export const sendEmailMessagewithextraParams = async (
    date: string,
    time: string,
    customerName: string,
    customerPhone: string,
    pickupAddress: string,
    dropOffAddress: string,
    roundTrip: boolean,
    returnDate?: string,
    returnTime?: string,
    customer_email?: string,
    number_of_passengers?: string,
) => {
    try {
        const transporter = getTransporter();

        const mailOptions = {
            from: `"Demo Taxi" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Ride Booking Notification: ${customerName} at ${time} on ${date}`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
              <h2 style="color: #333333; text-align: center; background-color: #ffd700; padding: 10px; border-radius: 6px;">🚕 Ride Booking Received</h2>
              <p style="font-size: 16px; color: #555;">A new ride has been booked. Please note that you will be notified at the scheduled time.</p>
              <p style="font-size: 16px; color: #555;"><strong>Date:</strong> ${date}</p>
              <p style="font-size: 16px; color: #555;"><strong>Time:</strong> ${time}</p>
              <p style="font-size: 16px; color: #555;"><strong>Customer Name:</strong> ${customerName}</p>
              <p style="font-size: 16px; color: #555;"><strong>Phone Number:</strong> ${customerPhone}</p>
              <p style="font-size: 16px; color: #555;"><strong>Customer Email:</strong> ${customer_email || "N/A"}</p>
              <p style="font-size: 16px; color: #555;"><strong>Number Of Passengers:</strong> ${number_of_passengers ?? "N/A"}</p>
              <p style="font-size: 16px; color: #555;"><strong>Pickup Address:</strong><br/> ${pickupAddress}</p>
              <p style="font-size: 16px; color: #555;"><strong>Drop-off Address:</strong><br/> ${dropOffAddress}</p>
              <p style="font-size: 16px; color: #555;"><strong>Round Trip:</strong> ${roundTrip ? "Yes" : "No"}</p>
              <p style="font-size: 16px; color: #555;"><strong>Return Date:</strong> ${returnDate || "N/A"}</p>
              <p style="font-size: 16px; color: #555;"><strong>Return Time:</strong> ${returnTime || "N/A"}</p>
            </div>
          `
        };
        await transporter.sendMail(mailOptions);
        console.log("✅ Ride schedule email sent successfully");
    } catch (error) {
        console.error("⚠️ Failed to send admin email: ", error);
    }
};

export const sendEmailMessageBeforeTime = async (
    date: string,
    time: string,
    customerName: string,
    customerPhone: string,
    pickupAddress: string,
    dropOffAddress: string,
    customer_email?: string,
    number_of_passengers?: string,
) => {
    try {
        const transporter = getTransporter();

        const mailOptions = {
            from: `"Demo Taxi" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Schedule Ride for ${customerName} at ${time} and ${date}`,
            html: `
           <div style="
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                max-width: 600px;
                margin: 40px auto;
                padding: 25px;
                border: 1px solid #e0e0e0;
                border-radius: 12px;
                background: #ffffff;
                box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            ">
                <!-- Company Logo and Name -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <img src="https://i.postimg.cc/446XHsfQ/Group-43-1.png" alt="Demo Taxi Logo" style="height: 60px; margin-bottom: 8px; border-radius: 50%; object-fit: cover;" />
                    <div style="font-size: 26px; font-weight: bold; color: #222; letter-spacing: 1px;">Demo Taxi</div>
                </div>
                <h2 style="
                    color: #ffffff;
                    text-align: center;
                    background: linear-gradient(90deg, #ffb703, #f5ef1b);
                    padding: 15px 10px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    font-size: 24px;
                ">
                 🚕 Ride Scheduled
                </h2>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Date:</strong> <span style="color:#555;">${date}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Time:</strong> <span style="color:#555;">${time}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Customer Name:</strong> <span style="color:#555;">${customerName}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Phone Number:</strong> <span style="color:#555;">${customerPhone}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Customer Email:</strong> <span style="color:#555;">${customer_email || "N/A"}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Number of Passengers:</strong> <span style="color:#555;">${number_of_passengers ?? "N/A"}</span></p>
            <div style="
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                border: 1px dashed #ffd700;
                margin: 20px 0;
            ">
                <p style="font-size: 18px; color: #333; margin: 0 0 10px;"><strong>Pickup Address:</strong></p>
                <p style="font-size: 16px; color: #555; margin: 0;">${pickupAddress}</p>
            </div>
            <div style="
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                border: 1px dashed #ffd700;
            ">
                <p style="font-size: 18px; color: #333; margin: 0 0 10px;"><strong>Drop-off Address:</strong></p>
                <p style="font-size: 16px; color: #555; margin: 0;">${dropOffAddress}</p>
            </div>
            <p style="text-align: center; margin-top: 40px; font-size: 14px; color: #999;">
                📧 This is an email reminder for the admin.
            </p>
            </div>`
        };
        await transporter.sendMail(mailOptions);
        console.log("✅ Reminder email sent successfully");
    } catch (error) {
        console.error("⚠️ Failed to send admin email: ", error);
    }
};

export const sendEmailMessageBeforeTimeWithExtraParams = async (
    date: string,
    time: string,
    customerName: string,
    customerPhone: string,
    pickupAddress: string,
    dropOffAddress: string,
    returnDate?: string,
    returnTime?: string,
    customer_email?: string,
    number_of_passengers?: string,
) => {
    try {
        const transporter = getTransporter();

        const mailOptions = {
            from: `"Demo Taxi" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Schedule Ride for ${customerName} at ${time} and ${date}`,
            html: `
           <div style="
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                max-width: 600px;
                margin: 40px auto;
                padding: 25px;
                border: 1px solid #e0e0e0;
                border-radius: 12px;
                background: #ffffff;
                box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            ">
                <!-- Company Logo and Name -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <img src="https://i.postimg.cc/446XHsfQ/Group-43-1.png" alt="Demo Taxi Logo" style="height: 60px; margin-bottom: 8px; border-radius: 50%; object-fit: cover;" />
                    <div style="font-size: 26px; font-weight: bold; color: #222; letter-spacing: 1px;">Demo Taxi</div>
                </div>
                <h2 style="
                    color: #ffffff;
                    text-align: center; 
                    background: linear-gradient(90deg, #ffb703, #f5ef1b);
                    padding: 15px 10px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    font-size: 24px;
                ">
                 🚕 Ride Scheduled
                </h2>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Date:</strong> <span style="color:#555;">${date}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Time:</strong> <span style="color:#555;">${time}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Return Date:</strong> <span style="color:#555;">${returnDate || "N/A"}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Return Time:</strong> <span style="color:#555;">${returnTime || "N/A"}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Customer Name:</strong> <span style="color:#555;">${customerName}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Phone Number:</strong> <span style="color:#555;">${customerPhone}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Customer Email:</strong> <span style="color:#555;">${customer_email || "N/A"}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Number of Passengers:</strong> <span style="color:#555;">${number_of_passengers ?? "N/A"}</span></p>
            <div style="
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                border: 1px dashed #ffd700;
                margin: 20px 0;
            ">
                <p style="font-size: 18px; color: #333; margin: 0 0 10px;"><strong>Pickup Address:</strong></p>
                <p style="font-size: 16px; color: #555; margin: 0;">${pickupAddress}</p>
            </div>
            <div style="
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                border: 1px dashed #ffd700;
            ">
                <p style="font-size: 18px; color: #333; margin: 0 0 10px;"><strong>Drop-off Address:</strong></p>
                <p style="font-size: 16px; color: #555; margin: 0;">${dropOffAddress}</p>
            </div>
            <p style="text-align: center; margin-top: 40px; font-size: 14px; color: #999;">
                📧 This is an email reminder for the admin.
            </p>
            </div>`
        };
        await transporter.sendMail(mailOptions);
        console.log("✅ Reminder email sent successfully");
    } catch (error) {
        console.error("⚠️ Failed to send admin email: ", error);
    }
};


export const sendEmailUpdateMessageOfScheduleRide = async (
    date: string,
    time: string,
    customerName: string,
    customerPhone: string,
    pickupAddress: string,
    dropOffAddress: string,
    customer_email?: string,
    number_of_passengers?: string,
    returnDate?: string,
    returnTime?: string
) => {
    try {
        const transporter = getTransporter();

        const mailOptions = {
            from: `"Demo Taxi" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Schedule Ride Updated: ${customerName} at ${time} on ${date}`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
                <h2 style="
                    color: #ffffff;
                    text-align: center; 
                    background: linear-gradient(90deg, #2196f3, #21cbf3);
                    padding: 15px 10px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    font-size: 24px;
                ">
                 ✏️ Schedule Ride Updated
                </h2>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Date:</strong> <span style="color:#555;">${date}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Time:</strong> <span style="color:#555;">${time}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Return Date:</strong> <span style="color:#555;">${returnDate || "N/A"}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Return Time:</strong> <span style="color:#555;">${returnTime || "N/A"}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Customer Name:</strong> <span style="color:#555;">${customerName}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Phone Number:</strong> <span style="color:#555;">${customerPhone}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Customer Email:</strong> <span style="color:#555;">${customer_email || "N/A"}</span></p>
                <p style="font-size: 18px; color: #333; margin: 0 0 15px;"><strong>Number of Passengers:</strong> <span style="color:#555;">${number_of_passengers ?? "N/A"}</span></p>
                <div style="
                    background-color: #f9f9f9;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px dashed #2196f3;
                    margin: 20px 0;
                ">
                    <p style="font-size: 18px; color: #333; margin: 0 0 10px;"><strong>Pickup Address:</strong></p>
                    <p style="font-size: 16px; color: #555; margin: 0;">${pickupAddress}</p>
                </div>
                <div style="
                    background-color: #f9f9f9;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px dashed #2196f3;
                ">
                    <p style="font-size: 18px; color: #333; margin: 0 0 10px;"><strong>Drop-off Address:</strong></p>
                    <p style="font-size: 16px; color: #555; margin: 0;">${dropOffAddress}</p>
                </div>
                <p style="text-align: center; margin-top: 40px; font-size: 14px; color: #999;">
                    📧 This is an email notification for the admin regarding a schedule ride update.
                </p>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Schedule ride update email sent successfully");
    } catch (error) {
        console.error("⚠️ Failed to send schedule ride update email: ", error);
    }
};

export const sendBookingConfirmationemailtoCustomer = async ({
    toEmail,
    customerName,
    date,
    time,
    pickupAddress,
    dropOffAddress,
    number_of_passengers,
    returnDate,
    returnTime,
    roundTrip,
    customerPhone,
}: {
    toEmail: string;
    customerName: string;
    date: string;
    time: string;
    pickupAddress: string;
    dropOffAddress: string;
    number_of_passengers?: number;
    returnDate?: string;
    returnTime?: string;
    roundTrip?: boolean;
    customerPhone?: string;
}) => {
    try {
        const transporter = getTransporter();

        const mailOptions = {
            from: `"Demo Taxi" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Your Booking Confirmation - Demo Taxi",
            html: `
                <div style="max-width:650px;margin:0 auto;font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;padding:35px 25px;border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,0.08);border:1px solid #f0f0f0;">
    
    <!-- Header -->
    <h2 style="
        text-align:center;
        background: linear-gradient(90deg, #2196f3, #21cbf3);
        padding: 18px 12px;
        border-radius: 10px;
        margin-bottom: 30px;
        font-size: 26px;
        color: #fff;
        letter-spacing: 1px;
    ">
        🚖 Booking Confirmed!
    </h2>

    <!-- Greeting -->
    <p style="font-size:18px;color:#333;margin:0 0 12px;">
        Dear <strong style="color:#000;">${customerName}</strong>,
    </p>
    <p style="font-size:16px;color:#555;margin:0 0 20px;line-height:1.6;">
        Thank you for booking your ride with <strong style="color:#2196f3;">Demo Taxi</strong>! 🎉  
        Below are your booking details:
    </p>

    <!-- Booking Details -->
    <div style="margin-bottom:25px;">
        <p style="font-size:17px;color:#333;margin:8px 0;"><strong>Date:</strong> <span style="color:#555;">${date}</span></p>
        <p style="font-size:17px;color:#333;margin:8px 0;"><strong>Time:</strong> <span style="color:#555;">${time}</span></p>
        <p style="font-size:17px;color:#333;margin:8px 0;"><strong>Return Date:</strong> <span style="color:#555;">${returnDate || "N/A"}</span></p>
        <p style="font-size:17px;color:#333;margin:8px 0;"><strong>Return Time:</strong> <span style="color:#555;">${returnTime || "N/A"}</span></p>
        <p style="font-size:17px;color:#333;margin:8px 0;"><strong>Round Trip:</strong> <span style="color:#555;">${roundTrip ? "Yes ✅" : "No ❌"}</span></p>
        <p style="font-size:17px;color:#333;margin:8px 0;"><strong>Passengers:</strong> <span style="color:#555;">${number_of_passengers ?? "N/A"}</span></p>
    </div>

    <!-- Pickup -->
    <div style="background:#f3faff;padding:20px;border-radius:10px;border:1px dashed #2196f3;margin:20px 0;">
        <p style="font-size:18px;color:#222;margin:0 0 8px;"><strong>📍 Pickup Address:</strong></p>
        <p style="font-size:16px;color:#555;margin:0;">${pickupAddress}</p>
    </div>

    <!-- Drop-off -->
    <div style="background:#f3faff;padding:20px;border-radius:10px;border:1px dashed #2196f3;">
        <p style="font-size:18px;color:#222;margin:0 0 8px;"><strong>🏁 Drop-off Address:</strong></p>
        <p style="font-size:16px;color:#555;margin:0;">${dropOffAddress}</p>
    </div>

    <!-- Customer Contact -->
    <p style="font-size:17px;color:#333;margin:20px 0 10px;">
        <strong>📞 Contact Phone:</strong> <span style="color:#555;">${customerPhone || "N/A"}</span>
    </p>

    <!-- Support -->
    <div style="text-align:center;margin-top:35px;font-size:15px;color:#777;line-height:1.6;">
        <p>If you have any questions or need to make changes to your booking, reach us at  
        <a href="mailto:demotaxi@gmail.com" style="color:#2196f3;text-decoration:none;">demotaxi@gmail.com</a>  
        or call <a href="tel:+12458232222" style="color:#2196f3;text-decoration:none;">+1 (245) 823-2222</a>.</p>
    </div>

    <!-- Footer -->
    <p style="text-align:center;margin-top:25px;font-size:14px;color:#999;">
        Thank you for choosing <strong>Demo Taxi</strong>. We look forward to serving you! 🚕  
        <br><br>© ${new Date().getFullYear()} Demo Taxi. All Rights Reserved.
    </p>
</div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Booking confirmation email sent to customer:", toEmail);
    } catch (error) {
        console.error("⚠️ Failed to send booking confirmation email to customer:", error);
    }
};

export const sendBookingsDetailsReportEmail = async (
    toEmail: string,
    filePath: string,
    bccEmails?: string | string[]
) => {
    try {
        const transporter = getTransporter();

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        const mailOptions: any = {
            from: `"Demo Taxi" <${process.env.EMAIL_USER}>`,
            to: [toEmail, process.env.EMAIL_USER],
            subject: "Monthly Booking Report",
            text: "Please find attached the booking report for this month.",
            attachments: [
                {
                    filename: `monthly_bookings_reports_${timestamp}.csv`,
                    path: path.resolve(filePath),
                },
            ],
        };

        if (bccEmails) {
            mailOptions.bcc = bccEmails;
        }

        await transporter.sendMail(mailOptions);
        console.log("📧 Email sent Successfully!");
    } catch (error) {
        console.error("⚠️ Failed to send report email:", error);
    }
};