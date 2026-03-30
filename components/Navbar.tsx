import Link from "next/link";
import { verifyToken } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
    const user = await verifyToken();

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
                <Link href="/" className="logo-title text-2xl text-brand">
                    Marketplace
                </Link>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <Link
                                href="/ads/create"
                                className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                            >
                                + Publicar anuncio
                            </Link>
                            <span className="text-sm text-gray-500">{user.email}</span>
                            <LogoutButton />
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
