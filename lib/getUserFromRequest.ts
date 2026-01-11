import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function getUserFromRequest() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        throw new Error("Unauthorized");
    }

    const decoded = verifyToken(token) as {
        userId: string;
        role: string;
    };

    return decoded;
}
