
function Topbar({title}: { title?: string }) {
    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6">
            <h1 className="text-xl font-semibold">{title ? title : "Heart Disease Dashboard"}</h1>
        </header>
    );
}

export default Topbar;