"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi"; // Import sorting icon
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type CaseRecord = {
  id: number;
  caseFileNo: string;
  respondent: string;
  caseTitle: string;
  dateFiled: string;
  criminalCaseNo: string;
  investigatorOnCase: string;
  complainant: string;
  remarks: string;
};

export const columns: ColumnDef<CaseRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // ✅ Sorting enabled columns with sort toggle icon
  {
    accessorKey: "caseFileNo",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Case File No. <BiSortAlt2 />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "respondent",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Respondent/s <BiSortAlt2 />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "caseTitle",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Case Title <BiSortAlt2 />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "dateFiled",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Date Filed <BiSortAlt2 />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateFiled"));
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
    },
    sortingFn: "datetime",
    enableSorting: true,
  },
  {
    accessorKey: "criminalCaseNo",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Criminal Case No. <BiSortAlt2 />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "investigatorOnCase",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Investigator-on-Case <BiSortAlt2 />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "complainant",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Complainant/s <BiSortAlt2 />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },

  // ✅ Actions Dropdown Menu
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <FiMoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("View", row.original)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit", row.original)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete", row.original)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
