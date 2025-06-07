import { useState } from "react";
import type { Patient } from "../types/Patient";
import PatientTable from "./PatientTable";

type Props = {
  patients: Patient[];
};

function PatientTableWithFilters({ patients }: Props) {
  // Filter states
  const [ageMin, setAgeMin] = useState<number | "">("");
  const [ageMax, setAgeMax] = useState<number | "">("");
  const [sex, setSex] = useState<"" | "M" | "F">("");
  const [heartDisease, setHeartDisease] = useState<"" | 0 | 1>("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filtering logic
  const filtered = patients.filter((p) => {
    if (ageMin !== "" && p.Age < Number(ageMin)) return false;
    if (ageMax !== "" && p.Age > Number(ageMax)) return false;
    if (sex !== "" && p.Sex !== sex) return false;
    if (heartDisease !== "" && p.HeartDisease !== heartDisease) return false;
    return true;
  });

  // Pagination logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-4 items-end mb-4 p-4 rounded-lg bg-white shadow">
        {/* Age Min */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Age Min</label>
          <input
            type="number"
            min={0}
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value === "" ? "" : Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            placeholder="Min"
          />
        </div>
        {/* Age Max */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Age Max</label>
          <input
            type="number"
            min={0}
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value === "" ? "" : Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            placeholder="Max"
          />
        </div>
        {/* Sex */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Sex</label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value as "" | "M" | "F")}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          >
            <option value="">All</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        {/* Heart Disease */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Heart Disease</label>
          <select
            value={heartDisease}
            onChange={(e) => {
              const val = e.target.value;
              setHeartDisease(val === "" ? "" : Number(val) as 0 | 1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          >
            <option value="">All</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        {/* Items per page */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Items per page</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        {/* Reset Filters */}
        <button
          onClick={() => {
            setAgeMin("");
            setAgeMax("");
            setSex("");
            setHeartDisease("");
            setCurrentPage(1);
          }}
          className="ml-2 px-5 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition cursor-pointer"
          >
            Reset
        </button>
      </div>

      <PatientTable patients={currentItems} totalPatients={filtered.length} />

      {/* Pagination controls */}
      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 p-4 bg-white rounded-lg shadow border border-gray-100">
          <div className="text-sm text-gray-600 mb-2 sm:mb-0">
            Showing <span className="font-medium">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)}</span> of <span className="font-medium">{totalItems}</span> patients
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`w-8 h-8 rounded-md ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-1">...</span>
            )}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => paginate(totalPages)}
                className={`w-8 h-8 rounded-md ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {totalPages}
              </button>
            )}
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientTableWithFilters;