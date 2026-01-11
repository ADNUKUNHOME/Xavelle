import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function requireAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        throw new Error("Unauthorized");
    }

    const decoded = verifyToken(token) as any;

    if (decoded.role !== "admin") {
        throw new Error("Forbidden");
    }

    return decoded;
}
