import Link from "next/link";
import { verifyToken } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
    const user = await verifyToken();

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-8 py-3 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    Marketplace
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link
                                href="/ads/create"
                                className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                + Crear anuncio
                            </Link>
                            <span className="text-sm text-gray-600">{user.email}</span>
                            <LogoutButton />
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
