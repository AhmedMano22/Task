
export interface Employee {
  id: number;
  fullName: string;
  department: string;
  hireDate: string;
  status: 'Active' | 'Suspended';
}