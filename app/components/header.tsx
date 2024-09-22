import Link from "next/link";

const Header = () => {
    return (
        <header className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Conduit</h1>
                <nav className="mt-4">
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" legacyBehavior>
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" legacyBehavior>
                                <a>About</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;