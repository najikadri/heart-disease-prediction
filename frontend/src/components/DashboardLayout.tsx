import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="relative">
            {/* Mobile sidebar toggle button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Sidebar - hidden on mobile by default, shown when sidebarOpen is true */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-gray-100 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <Sidebar onLinkClick={closeSidebar} />
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/70 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content area */}
            <main className="pt-16 md:pl-64 bg-gray-100 min-h-screen">
                <div className="px-6 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;