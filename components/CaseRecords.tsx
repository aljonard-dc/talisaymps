"use server";

import React from "react";
import Header from "./ui/Header";
import pool from "@/lib/db";
import AddForm from "./ui/AddForm";
import { DataTable } from "@/components/DataTable";
import { columns, CaseRecord } from "@/components/columns";

export default async function CaseRecords() {
  "use server"; // Ensure this runs only on the server

  const result = await pool.query("SELECT * FROM caserecords");
  const records: CaseRecord[] = result.rows;

  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <AddForm />
      <section className="bg-blue-50 flex-1 grow p-4">
        <div className="w-full bg-white rounded-md shadow-md p-4">
          <h1 className="text-lg font-bold mb-4">CASE RECORDS</h1>
          <DataTable columns={columns} data={records} />
        </div>
      </section>
    </div>
  );
}
