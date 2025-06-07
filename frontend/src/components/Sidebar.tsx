import { NavLink } from "react-router-dom";
import { Home, Users, Activity } from "lucide-react";

const navLinks = [
    { name: "Dashboard", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Patients", href: "/patients", icon: <Users className="w-5 h-5" /> },
    { name: "Evaluation", href: "/evaluation", icon: <Activity className="w-5 h-5" /> },
];

interface SidebarProps {
    onLinkClick?: () => void;
}

function Sidebar({ onLinkClick }: SidebarProps) {
    return (
        <aside className="w-64 bg-gray-800 text-gray-100 h-screen fixed">
            <div className="p-4 ml-10 pt-5 text-lg 
            md:text-xl md:ml-0 font-bold">Heart Disease Portal</div>
            <nav className="mt-4">
                <ul className="space-y-2">
                    {navLinks.map(link => (
                        <li key={link.name}>
                            <NavLink
                                to={link.href}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded mx-2 transition-colors 
                                        ${isActive ? "bg-gray-700 text-white font-medium" : "text-gray-300"
                                    }`
                                }
                                onClick={onLinkClick}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;