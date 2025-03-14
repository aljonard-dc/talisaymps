'use server'

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

// Add Case Record
export async function createCaseRecord(formData: FormData) {
  const caseFileNo = formData.get("caseFileNo");
  const respondent = formData.get("respondent");
  const caseTitle = formData.get("caseTitle");
  const dateFiled = formData.get("dateFiled");
  const criminalCaseNo = formData.get("criminalCaseNo");
  const investigator = formData.get("investigator");
  const complainant = formData.get("complainant");
  const remarks = formData.get("remarks");

  if (
    !caseFileNo ||
    !respondent ||
    !caseTitle ||
    !dateFiled ||
    !criminalCaseNo ||
    !investigator ||
    !complainant
  ) {
    throw new Error("All required fields must be filled");
  }
  await pool.query(
    `INSERT INTO "caserecords" 
    ("caseFileNo", respondent, "caseTitle", "dateFiled", "criminalCaseNo", "investigatorOnCase", complainant, remarks) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [caseFileNo, respondent, caseTitle, dateFiled, criminalCaseNo, investigator, complainant, remarks || null] // Handle optional value
  );
  
  revalidatePath("/case-records");
}

// Update Case Record
export async function updateCaseRecord(formData: FormData) {
  const id = formData.get("id");
  const caseFileNo = formData.get("caseFileNo");
  const respondent = formData.get("respondent");
  const caseTitle = formData.get("caseTitle");
  const dateFiled = formData.get("dateFiled");
  const criminalCaseNo = formData.get("criminalCaseNo");
  const investigator = formData.get("investigator");
  const complainants = formData.get("complainant");
  const remarks = formData.get("remarks");

  if (!id) {
    throw new Error("Invalid ID");
  }

  await pool.query(
    `UPDATE "caserecords" SET 
    "caseFileNo" = $1, respondent = $2, "caseTitle" = $3, "dateFiled" = $4, 
    "criminalCaseNo" = $5, "investigatorOnCase" = $6, complainant = $7, remarks = $8 
    WHERE id = $9`,
    [caseFileNo, respondent, caseTitle, dateFiled, criminalCaseNo, investigator, complainants, remarks, id]
  );
  revalidatePath("/case-records");
}

// Delete Case Record
export async function deleteCaseRecord(formData: FormData) {
  const id = formData.get("id");

  if (!id) {
    throw new Error("Invalid ID");
  }

  await pool.query('DELETE FROM "caserecords" WHERE id = $1', [id]);
  revalidatePath("/case-records");
}
