"use client";
import { CaseRecord } from "@/lib/props";

interface ViewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseRecord: CaseRecord | null;
}

export default function ViewCaseModal({
  isOpen,
  onClose,
  caseRecord,
}: ViewCaseModalProps) {
  if (!isOpen || !caseRecord) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Case Record Details</h2>

        <div className="space-y-2">
          <p>
            <strong>Case File No.:</strong> {caseRecord.caseFileNo}
          </p>
          <p>
            <strong>Respondent:</strong> {caseRecord.respondent}
          </p>
          <p>
            <strong>Case Title:</strong> {caseRecord.caseTitle}
          </p>
          <p>
            <strong>Date Filed:</strong>{" "}
            {new Date(caseRecord.dateFiled).toLocaleDateString()}
          </p>
          <p>
            <strong>Criminal Case No.:</strong> {caseRecord.criminalCaseNo}
          </p>
          <p>
            <strong>Investigator:</strong> {caseRecord.investigatorOnCase}
          </p>
          <p>
            <strong>Complainant:</strong> {caseRecord.complainant}
          </p>
          <p>
            <strong>Remarks:</strong> {caseRecord.remarks || "None"}
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
