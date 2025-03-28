import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET - Fetch all case records
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM caserecords ORDER BY id ASC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch case records" },
      { status: 500 }
    );
  }
}

// POST - Add a new case record
export async function POST(req: Request) {
  try {
    const {
      caseFileNo,
      respondent,
      caseTitle,
      dateFiled,
      criminalCaseNo,
      investigatorOnCase,
      complainant,
      remarks,
    } = await req.json();

    const result = await pool.query(
      "INSERT INTO caserecords (caseFileNo, respondent, caseTitle, dateFiled, criminalCaseNo, investigatorOnCase, complainant, remarks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        caseFileNo,
        respondent,
        caseTitle,
        dateFiled,
        criminalCaseNo,
        investigatorOnCase,
        complainant,
        remarks,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to add case record" },
      { status: 500 }
    );
  }
}

// DELETE - Remove all case records
export async function DELETE() {
  try {
    const result = await pool.query("DELETE FROM caserecords RETURNING *");

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "No records found" }, { status: 404 });
    }

    return NextResponse.json({ message: "All records deleted successfully" });
  } catch (error) {
    console.error("DELETE ALL Error:", error);
    return NextResponse.json({ error: "Failed to delete all case records" }, { status: 500 });
  }

}

