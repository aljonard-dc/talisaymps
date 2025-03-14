"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { columns, CaseRecord } from "@/components/columns";
import { Button } from "@/components/ui/button";

export function CaseRecordsTable({ data }: { data: CaseRecord[] }) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true, // Enable row selection
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>{header.isPlaceholder ? null : header.column.columnDef.header}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{cell.renderValue()}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Debugging: Show Selected Rows */}
      <pre className="mt-4 p-2 border">{JSON.stringify(rowSelection, null, 2)}</pre>
    </div>
  );
}
