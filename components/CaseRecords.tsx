import React from "react";
import Header from "./ui/Header";

export default function CaseRecords() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <section className="bg-blue-50 flex-1 p-5">
        <div className="px-6 py-4 bg-white rounded-md shadow-md">
          <h1 className="text-lg font-bold ">ADD CASE</h1>
          <form className="flex flex-col w-full space-y-4">
            {/* Case File No. */}
            <div>
              <label
                className="text-xs mb-1 text-blue-950/80"
                htmlFor="caseFileNo"
              >
                Case File No.
              </label>
              <input
                className="text-base text-blue-950 px-3 py-1.5 w-full rounded-md border-2 border-blue-300 focus:outline-none focus:border-2 focus:border-blue-500"
                type="text"
                name="caseFileNo"
                placeholder="Enter Case File No."
                required
              />
            </div>

            {/* Respondent/s */}
            <div>
              <label
                className="text-xs mb-1 text-blue-950/80"
                htmlFor="respondents"
              >
                Respondent/s
              </label>
              <input
                className="text-base text-blue-950 px-3 py-1.5 w-full rounded-md border-2 border-blue-300 focus:outline-none focus:border-2 focus:border-blue-500"
                type="text"
                name="respondents"
                placeholder="Enter Respondent/s"
                required
              />
            </div>

            {/* Case Title */}
            <div>
              <label
                className="text-xs mb-1 text-blue-950/80"
                htmlFor="caseTitle"
              >
                Case Title
              </label>
              <input
                className="text-base text-blue-950 px-3 py-1.5 w-full rounded-md border-2 border-blue-300 focus:outline-none focus:border-2 focus:border-blue-500"
                type="text"
                name="caseTitle"
                placeholder="Enter Case Title"
                required
              />
            </div>

            {/* Date Filed (Date Input) */}
            <div>
              <label
                className="text-xs mb-1 text-blue-950/80"
                htmlFor="dateFiled"
              >
                Date Filed
              </label>
              <input
                className="text-base text-blue-950 px-3 py-1.5 w-full rounded-md border-2 border-blue-300 focus:outline-none focus:border-2 focus:border-blue-500"
                type="date"
                name="dateFiled"
                required
              />
            </div>

            {/* Criminal Case No. IOC */}
            <div>
              <label
                className="text-xs mb-1 text-blue-950/80"
                htmlFor="criminalCaseNo"
              >
                Criminal Case No. IOC
              </label>
              <input
                className="text-base text-blue-950 px-3 py-1.5 w-full rounded-md border-2 border-blue-300 focus:outline-none focus:border-2 focus:border-blue-500"
                type="text"
                name="criminalCaseNo"
                placeholder="Enter Criminal Case No. IOC"
                required
              />
            </div>

            {/* Complainant/s */}
            <div>
              <label
                className="text-xs mb-1 text-blue-950/80"
                htmlFor="complainants"
              >
                Complainant/s
              </label>
              <input
                className="text-base text-blue-950 px-3 py-1.5 w-full rounded-md border-2 border-blue-300 focus:outline-none focus:border-2 focus:border-blue-500"
                type="text"
                name="complainants"
                placeholder="Enter Complainant/s"
                required
              />
            </div>

            {/* Remarks */}
            <div>
              <label
                className="text-xs mb-1 text-blue-950/80"
                htmlFor="remarks"
              >
                Remarks
              </label>
              <textarea
                className="text-base text-blue-950 px-3 py-1.5 w-full rounded-md border-2 border-blue-300 focus:outline-none focus:border-2 focus:border-blue-500"
                name="remarks"
                rows={3}
                placeholder="Enter Remarks"
              />
            </div>

            {/* Submit Button */}
            <button
              className="bg-green-500 text-white mt-6 px-8 py-2 rounded-md cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
