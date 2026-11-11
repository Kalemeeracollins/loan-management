export interface LoanProduct {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  currency: string;
  interestRate: number;
  interestMethod: 'FLAT' | 'REDUCING_BALANCE';
  minTermMonths: number;
  maxTermMonths: number;
  repaymentFrequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  createdAt: string;
  updatedAt: string;
}

export interface CreateLoanProductPayload {
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  currency: string;
  interestRate: number;
  interestMethod: 'FLAT' | 'REDUCING_BALANCE';
  minTermMonths: number;
  maxTermMonths: number;
  repaymentFrequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
}
