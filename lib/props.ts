export interface CaseRecord {
    id: number;
    caseFileNo: string;
    respondent: string;
    caseTitle: string;
    dateFiled: string;
    criminalCaseNo: string;
    investigatorOnCase: string;
    complainant: string;
    remarks: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
export interface CaseRecordsTableProps {
    records: CaseRecord[];
    onDelete: (ids: number[]) => Promise<void>;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  }
  