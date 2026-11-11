export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'DOCUMENT_REVIEW'
  | 'ASSESSMENT_PENDING'
  | 'UNDER_REVIEW'
  | 'MORE_INFORMATION_REQUIRED'
  | 'APPROVED'
  | 'REJECTED'
  | 'AGREEMENT_PENDING'
  | 'READY_FOR_DISBURSEMENT'
  | 'DISBURSED'
  | 'WITHDRAWN';

export interface LoanApplication {
  id: string;
  applicantId: string;
  productId: string;
  requestedAmount: number;
  termMonths: number;
  purpose: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationPayload {
  applicantId: string;
  productId: string;
  requestedAmount: number;
  termMonths: number;
  purpose: string;
}
