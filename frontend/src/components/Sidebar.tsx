import { Home, Users, Activity } from "lucide-react";

const navLinks = [
    { name: "Dashboard", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Patients", href: "/patients", icon: <Users className="w-5 h-5" /> },
    { name: "Evaluation", href: "/evaluation", icon: <Activity className="w-5 h-5" /> },
    // { name: "Settings", href: "#", icon: <Settings className="w-5 h-5" /> },
];

function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-gray-100 h-screen fixed">
            <div className="p-4 text-xl font-bold">Heart Disease Portal</div>
            <nav className="mt-4">
                <ul className="space-y-2">
                    {navLinks.map(link => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;