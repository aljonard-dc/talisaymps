import React from "react";
import Header from "./ui/Header";

export default function CaseRecords() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <section className="bg-blue-50 flex-1 p-5 ">
        <div className="w-full bg-white rounded-md shadow-md px-6 py-4">
          <h1 className="text-lg font-bold mb-4">ADD CASE</h1>
          <form className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {/* Case File No. */}
              <div className="flex flex-col grow md:grow-0 ">
                <label className="text-xs mb-1 text-blue-950/80">
                  Case File No.
                </label>
                <input
                  className="w-full"
                  type="text"
                  name="caseFileNo"
                  placeholder="Enter Case File No."
                  required
                />
              </div>

              {/* Respondent/s */}
              <div className="flex flex-col grow min-w-[250px]">
                <label className="text-xs mb-1 text-blue-950/80">
                  Respondent/s
                </label>
                <input
                  className="w-full"
                  type="text"
                  name="respondents"
                  placeholder="Enter Respondent/s"
                  required
                />
              </div>

              {/* Case Title */}
              <div className="flex flex-col grow min-w-[250px]">
                <label className="text-xs mb-1 text-blue-950/80">
                  Case Title
                </label>
                <input
                  className="w-full"
                  type="text"
                  name="caseTitle"
                  placeholder="Enter Case Title"
                  required
                />
              </div>

              {/* Date Filed */}
              <div className="flex flex-col grow-0 min-w-[200px]">
                <label className="text-xs mb-1 text-blue-950/80">
                  Date Filed
                </label>
                <input className="w-full" type="date" name="dateFiled" required />
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap gap-4">
              {/* Criminal Case No. */}
              <div className="flex flex-col min-w-[200px]">
                <label className="text-xs mb-1 text-blue-950/80">
                  Criminal Case No.
                </label>
                <input
                  className="w-full"
                  type="text"
                  name="criminalCaseNo"
                  placeholder="Enter Criminal Case No."
                  required
                />
              </div>

              {/* Investigator-on-Case */}
              <div className="flex flex-col grow min-w-[250px]">
                <label className="text-xs mb-1 text-blue-950/80">
                  Investigator-on-Case
                </label>
                <input
                  className="w-full"
                  type="text"
                  name="investigator"
                  placeholder="Enter Investigator-on-Case"
                  required
                />
              </div>

              {/* Complainant/s */}
              <div className="flex flex-col grow min-w-[250px]">
                <label className="text-xs mb-1 text-blue-950/80">
                  Complainant/s
                </label>
                <input
                  className="w-full"
                  type="text"
                  name="complainants"
                  placeholder="Enter Complainant/s"
                  required
                />
              </div>

              {/* Remarks */}
              <div className="flex flex-col min-w-[200px]">
                <label className="text-xs mb-1 text-blue-950/80">Remarks</label>
                <input
                  className="w-full"
                  type="text"
                  name="remarks"
                  placeholder="Enter Remarks"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-fit px-8 py-2 bg-green-500 text-white rounded-md self-center md:self-start cursor-pointer">
              Save
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
