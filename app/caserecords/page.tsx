"use client";

import { useEffect, useState } from "react";
import AddForm from "@/components/AddForm";
import CaseRecordsTable from "@/components/CaseRecordsTable";

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

async function fetchCaseRecords(): Promise<CaseRecord[]> {
  try {
    const res = await fetch("/api/caserecords", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch case records");
    return await res.json();
  } catch (error) {
    console.error(error);
    return []; // Avoid crash
  }
}

export default function CaseRecordsPage() {
  const [records, setRecords] = useState<CaseRecord[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseRecords().then((data) => {
      setRecords(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (ids: number[]) => {
    if (!confirm("Are you sure you want to delete the selected record(s)?")) return;

    const previousRecords = [...records];
    setRecords((prevRecords) => prevRecords.filter((record) => !ids.includes(record.id)));

    try {
      await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`/api/caserecords/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error(`Failed to delete record with ID ${id}`);
        })
      );
      setSelectedIds([]); // Clear selection after deletion
    } catch (error) {
      console.error(error);
      alert("Error deleting record!");
      setRecords(previousRecords); // Restore previous state if delete fails
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>Loading case records...</h1>
      </div>
    );

  return (
    <main>
      <AddForm />
      <CaseRecordsTable 
        records={records} 
        onDelete={handleDelete} 
        selectedIds={selectedIds} 
        setSelectedIds={setSelectedIds} 
      />
    </main>
  );
}
