import Sidebar from "./Sidebar";

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <Sidebar />
            <main className="pt-16 pl-64 bg-gray-100 min-h-screen">
                <div className="px-6 py-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout;