export type ApplicantType = 'INDIVIDUAL' | 'BUSINESS';

export interface Applicant {
  id: string;
  type: ApplicantType;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicantPayload {
  type: ApplicantType;
  fullName: string;
  email: string;
  phone: string;
}
