import React, { useState } from "react";
import { useMemo } from "react";
import { FaSort } from "react-icons/fa";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import MenuModal from "./ui/MenuModal";
import EditCaseModal from "./EditCaseModal"; // Import the modal
import { CaseRecord, CaseRecordsTableProps } from "@/lib/props";
import ViewCaseModal from "./ViewCaseModal";

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
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    remarks: true,
    createdAt: true,
    updatedAt: true,
  });
  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  //Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CaseRecord | null>(null);

  //View Modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const filteredRecords = useMemo(() => {
    return records.filter(
      (record) =>
        record.respondent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.complainant.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [records, searchQuery]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortColumn) return 0;

    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    // Ensure valueA and valueB are not null or undefined
    if (["dateFiled", "createdAt", "updatedAt"].includes(sortColumn)) {
      const dateA = valueA ? new Date(valueA).getTime() : 0;
      const dateB = valueB ? new Date(valueB).getTime() : 0;

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }

    // Default sorting logic for numbers and strings
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    } else {
      return sortOrder === "asc"
        ? String(valueA || "").localeCompare(String(valueB || ""))
        : String(valueB || "").localeCompare(String(valueA || ""));
    }
  });

  const totalPages = Math.ceil(sortedRecords.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRecords = sortedRecords.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id];
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    const allIds = filteredRecords.map((record) => record.id);
    setSelectedIds(selectedIds.length === allIds.length ? [] : allIds);
  };

  const handleSort = (column: keyof CaseRecord) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleEdit = (record: CaseRecord) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  //View
  const handleView = (record: CaseRecord) => {
    setSelectedCase(record);
    setIsViewModalOpen(true);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by Respondent or Complainant..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <div className="mb-2 relative">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setShowColumnDropdown(!showColumnDropdown)}
        >
          Toggle Columns
        </button>
        {showColumnDropdown && (
          <div className="absolute bg-white border p-2 rounded shadow-md z-10">
            {Object.keys(visibleColumns).map((column) => {
              const typedColumn = column as keyof typeof visibleColumns;
              return (
                <label key={column} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleColumns[typedColumn]}
                    onChange={() => toggleColumn(typedColumn)}
                  />
                  <span>{column}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mb-2">
        <span>
          {selectedIds.length} of {records.length} row(s) selected
        </span>
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

      {selectedIds.length > 0 && (
        <button
          onClick={() => onDelete(selectedIds)}
          className="mb-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete ({selectedIds.length})
        </button>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredRecords.length}
                  onChange={handleSelectAll}
                />
              </th>

              {[
                "caseFileNo",
                "respondent",
                "caseTitle",
                "dateFiled",
                "criminalCaseNo",
                "investigatorOnCase",
                "complainant",
              ].map((key) => (
                <th
                  key={key}
                  className="border p-2 w-60 cursor-pointer"
                  onClick={() => handleSort(key as keyof CaseRecord)}
                >
                  <div className="flex items-center justify-start">
                    {key}{" "}
                    {sortColumn === key ? (
                      sortOrder === "asc" ? (
                        <TbSortAscending />
                      ) : (
                        <TbSortDescending />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
              ))}

              {/* Remarks column - Walang sorting */}
              {visibleColumns.remarks && (
                <th className="border p-2">Remarks</th>
              )}

              {/* Sorting para sa Created At */}
              {visibleColumns.createdAt && (
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center justify-start">
                    Created At{" "}
                    {sortColumn === "createdAt" ? (
                      sortOrder === "asc" ? (
                        <TbSortAscending />
                      ) : (
                        <TbSortDescending />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
              )}

              {/* Sorting para sa Updated At */}
              {visibleColumns.updatedAt && (
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("updatedAt")}
                >
                  <div className="flex items-center justify-start">
                    Updated At{" "}
                    {sortColumn === "updatedAt" ? (
                      sortOrder === "asc" ? (
                        <TbSortAscending />
                      ) : (
                        <TbSortDescending />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
              )}

              <th className="border p-2 w-24">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRecords.map((record) => (
              <tr key={record.id}>
                {/* Checkbox for row selection */}
                <td className="border p-2 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(record.id)}
                    onChange={() => handleSelect(record.id)}
                  />
                </td>

                <td className="border p-2">{record.caseFileNo}</td>
                <td className="border p-2">
                  {truncateText(record.respondent, 80)}
                </td>
                <td className="border p-2">
                  {truncateText(record.caseTitle, 80)}
                </td>
                <td className="border p-2">{formatDate(record.dateFiled)}</td>
                <td className="border p-2">{record.criminalCaseNo}</td>
                <td className="border p-2">
                  {truncateText(record.investigatorOnCase, 80)}
                </td>
                <td className="border p-2">
                  {truncateText(record.complainant, 80)}
                </td>

                {/* Conditionally visible columns */}
                {visibleColumns.remarks && (
                  <td className="border p-2">
                    {truncateText(record.remarks ?? "", 30)}
                  </td>
                )}
                {visibleColumns.createdAt && (
                  <td className="border p-2">{formatDate(record.createdAt)}</td>
                )}
                {visibleColumns.updatedAt && (
                  <td className="border p-2">{formatDate(record.updatedAt)}</td>
                )}

                <td className="border p-2">
                  <MenuModal
                    onView={() => handleView(record)}
                    onEdit={() => handleEdit(record)}
                    onDelete={() => onDelete([record.id])}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViewCaseModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        caseRecord={selectedCase}
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isEditModalOpen && selectedRecord && (
        <EditCaseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          caseRecord={selectedRecord}
        />
      )}
    </div>
  );
}
