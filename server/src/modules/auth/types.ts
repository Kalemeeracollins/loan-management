export type UserRole =
  | 'SUPER_ADMIN'
  | 'LOAN_OFFICER'
  | 'CREDIT_ANALYST'
  | 'LOAN_APPROVER'
  | 'FINANCE_OFFICER'
  | 'AUDITOR'
  | 'APPLICANT';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: UserRole;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface RefreshPayload {
  refreshToken: string;
}
