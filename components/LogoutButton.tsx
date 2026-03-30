"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
        >
            Cerrar sesión
        </button>
    );
}
