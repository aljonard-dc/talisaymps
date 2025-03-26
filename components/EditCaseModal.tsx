"use client";
import { useState, useEffect } from "react";
import { CaseRecord } from "@/lib/props";
import { updateCaseRecord } from "@/app/api/actions"; // Import update function

interface EditCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseRecord: CaseRecord | null;
  
}

export default function EditCaseModal({ isOpen, onClose, caseRecord }: EditCaseModalProps) {
  const [formData, setFormData] = useState<CaseRecord | null>(caseRecord);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(caseRecord);
  }, [caseRecord]);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("id", String(formData.id));
      form.append("caseFileNo", formData.caseFileNo ?? "");
      form.append("respondent", formData.respondent ?? "");
      form.append("caseTitle", formData.caseTitle ?? "");
      form.append("dateFiled", formData.dateFiled ?? "");
      form.append("criminalCaseNo", formData.criminalCaseNo ?? "");
      form.append("investigator", formData.investigatorOnCase ?? "");
      form.append("complainant", formData.complainant ?? "");
      form.append("remarks", formData.remarks ?? "");

      await updateCaseRecord(form);
      onClose(); 
    } catch (error) {
      setError("Failed to update case record.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Case Record</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Case File No.
            </label>
            <input
              type="text"
              name="caseFileNo"
              value={formData.caseFileNo ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Respondent
            </label>
            <input
              type="text"
              name="respondent"
              value={formData.respondent ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Case Title
            </label>
            <input
              type="text"
              name="caseTitle"
              value={formData.caseTitle ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date Filed
            </label>
            <input
              type="date"
              name="dateFiled"
              value={formData.dateFiled ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Criminal Case No.
            </label>
            <input
              type="text"
              name="criminalCaseNo"
              value={formData.criminalCaseNo ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Investigator on Case
            </label>
            <input
              type="text"
              name="investigatorOnCase"
              value={formData.investigatorOnCase ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Complainant
            </label>
            <input
              type="text"
              name="complainant"
              value={formData.complainant ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Remarks
            </label>
            <textarea
              name="remarks"
              value={formData.remarks ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
