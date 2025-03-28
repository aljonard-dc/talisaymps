"use client";

import { useState } from "react";
import { createCaseRecord } from "@/app/api/actions";

export default function AddCaseModal() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Case
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-2xl">
            <h1 className="text-lg font-bold mb-4">ADD CASE</h1>
            <form
              action={async (formData) => {
                await createCaseRecord(formData);
                closeModal();
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-wrap gap-4">
                <input className="border p-2 rounded-md" type="text" name="caseFileNo" placeholder="Case File No." required />
                <input className="border p-2 rounded-md" type="text" name="respondent" placeholder="Respondent/s" required />
                <input className="border p-2 rounded-md" type="text" name="caseTitle" placeholder="Case Title" required />
                <input className="border p-2 rounded-md" type="date" name="dateFiled" required />
              </div>
              <div className="flex flex-wrap gap-4">
                <input className="border p-2 rounded-md" type="text" name="criminalCaseNo" placeholder="Criminal Case No." required />
                <input className="border p-2 rounded-md" type="text" name="investigator" placeholder="Investigator-on-Case" required />
                <input className="border p-2 rounded-md" type="text" name="complainant" placeholder="Complainant/s" required />
                <input className="border p-2 rounded-md" type="text" name="remarks" placeholder="Remarks" />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
