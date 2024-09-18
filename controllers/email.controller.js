import { Email } from "../models/email.model.js";
import { User } from "../models/user.model.js";

export const createEmail = async (req, res) => {
    try {
        const userId = req.id;
        const { to, subject, message } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Find the recipient by email address (or ID if that's how you're using it)
        const recipient = await User.findOne({ email: to });
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        // Create the email
        const email = await Email.create({
            to: recipient._id, // Save recipient ID
            subject,
            message,
            userId
        });

        return res.status(201).json({ email });
    } catch (error) {
        console.error("Error creating email:", error); // Log detailed error
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteEmail = async (req,res) => {
    try {
        const emailId = req.params.id;
        
        if(!emailId) return res.status(400).json({message:"Email id is required"});

        const email = await Email.findByIdAndDelete(emailId);

        if(!email) return res.status(404).json({message:"Email is not found"});

        return res.status(200).json({
            message:"Email Deleted successfully"
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllEmailById = async (req, res) => {
    try {
        const userId = req.id;
        const emails = await Email.find({ to: userId })
        .populate('userId', 'email') // Populate the sender's userId field with email
        .populate('to', 'email');    // Populate the recipient's to field with email
        console.log("Fetched emails:", emails);
        return res.status(200).json({ emails });
    } catch (error) {
        console.error("Error fetching emails:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getSentEmails = async (req, res) => {
    try {
        const userId = req.id;
        const emails = await Email.find({ userId });  // Fetch emails where userId matches

        return res.status(200).json({ emails });
    } catch (error) {
        console.error("Error fetching sent emails:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}