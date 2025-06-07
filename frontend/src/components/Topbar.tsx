function Topbar({title}: { title?: string }) {
    return (
        <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6 z-20">
            <h1 className="text-xl ml-10 md:ml-0 font-semibold">{title ? title : "Heart Disease Dashboard"}</h1>
        </header>
    );
}

export default Topbar;