
export interface Record {
  id: string;
  item: string;
  amount: number;
  date: string; // YYYY-MM-DD
  createdAt: number;
}

export interface GroupedRecords {
  [date: string]: Record[];
}
