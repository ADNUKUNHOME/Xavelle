import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserIdFromRequest() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
    };

    return decoded.id;
}
