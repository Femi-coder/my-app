import { withSessionRoute } from "../sessionConfig";

async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const user = req.session.user;
            if (!user) {
                return tus(401).json({ error: "No active session" });
            }

            return res.status(200).json({ email: user.email });
        } catch (error) {
            console.error("Error checking session:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}

export default withSessionRoute(handler);
