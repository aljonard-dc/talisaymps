
import React, { useState } from "react";
import { FaSort } from "react-icons/fa";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";

interface CaseRecord {
  id: number;
  caseFileNo: string;
  respondent: string;
  caseTitle: string;
  dateFiled: string;
  criminalCaseNo: string;
  investigatorOnCase: string;
  complainant: string;
  remarks: string | null;
}

interface CaseRecordsTableProps {
  records: CaseRecord[];
  onDelete: (ids: number[]) => Promise<void>;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function CaseRecordsTable({
  records,
  onDelete,
  selectedIds,
  setSelectedIds,
}: CaseRecordsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof CaseRecord | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Filtered Records (Based on Search)
  const filteredRecords = records.filter(
    (record) =>
      record.respondent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.complainant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔢 Sorted Records
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortColumn) return 0; // No sorting applied

    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    } else {
      return sortOrder === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    }
  });

  // 📄 Pagination Logic
  const totalPages = Math.ceil(sortedRecords.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRecords = sortedRecords.slice(startIndex, startIndex + rowsPerPage);

  // ✅ Selection Handlers
  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedRecords.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedRecords.map((record) => record.id));
    }
  };

  // ⬆️⬇️ Sorting Handler
  const handleSort = (column: keyof CaseRecord) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-4">
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by Respondent or Complainant..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      {/* 🏷️ Selected Rows & Pagination Controls */}
      <div className="flex justify-between items-center mb-2">
        <span>{selectedIds.length} of {records.length} row(s) selected</span>
        <div>
          Rows per page:
          <select
            className="ml-2 p-1 border rounded"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 20, 30, 40, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🗑️ Delete Button */}
      {selectedIds.length > 0 && (
        <button
          onClick={() => onDelete(selectedIds)}
          className="mb-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete ({selectedIds.length})
        </button>
      )}

      {/* 📝 Case Records Table */}
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">
              <input
                type="checkbox"
                checked={selectedIds.length === paginatedRecords.length}
                onChange={handleSelectAll}
              />
            </th>
            {[
              { key: "caseFileNo", label: "Case File No." },
              { key: "respondent", label: "Respondent" },
              { key: "caseTitle", label: "Case Title" },
              { key: "dateFiled", label: "Date Filed" },
              { key: "criminalCaseNo", label: "Criminal Case No." },
              { key: "investigatorOnCase", label: "Investigator" },
              { key: "complainant", label: "Complainant" }
            ].map(({ key, label }) => (
              <th
                key={key}
                className="border p-2 cursor-pointer"
                onClick={() => handleSort(key as keyof CaseRecord)}
              >
                <div className="flex items-center justify-center">
                  {label} {sortColumn === key ? (
                    sortOrder === "asc" ? <TbSortAscending /> : <TbSortDescending />
                  ) : <FaSort />}
                </div>
              </th>
            ))}
            <th className="border p-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRecords.map((record) => (
            <tr key={record.id}>
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(record.id)}
                  onChange={() => handleSelect(record.id)}
                />
              </td>
              <td className="border p-2">{record.caseFileNo}</td>
              <td className="border p-2">{record.respondent}</td>
              <td className="border p-2">{record.caseTitle}</td>
              <td className="border p-2">{new Date(record.dateFiled).toLocaleDateString()}</td>
              <td className="border p-2">{record.criminalCaseNo}</td>
              <td className="border p-2">{record.investigatorOnCase}</td>
              <td className="border p-2">{record.complainant}</td>
              <td className="border p-2">{record.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <span>Page {currentPage} of {totalPages}</span>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="ml-2 px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


