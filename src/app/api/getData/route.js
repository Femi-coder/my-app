import { getCustomSession } from '../sessionConfig/route';

export async function GET(req, res) {
    try {
        // Get session using custom session configuration
        const session = await getCustomSession();

        // Check if session exists
        if (!session || !session.role || !session.email) {
            return new Response(
                JSON.stringify({ error: 'No active session or session data missing' }),
                {
                    status: 401, // Unauthorized
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Respond with the session data (role and email)
        return new Response(
            JSON.stringify({ role: session.role, email: session.email }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error in getData route:', error);

        // Handle unexpected errors
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
