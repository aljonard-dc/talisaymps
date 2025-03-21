import { NextResponse } from "next/server";
import pool from "@/lib/db";

// DELETE - Remove a case record by ID (single/multiple)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

    const ids = id.split(","); // Support multiple IDs
    const result = await pool.query("DELETE FROM caserecords WHERE id = ANY($1) RETURNING *", [ids]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Record(s) not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Record(s) deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete case record(s)" }, { status: 500 });
  }
}
