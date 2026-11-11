import type { RowDataPacket } from 'mysql2';
import { db } from '../../database/pool.js';
import type { Applicant } from './types.js';

const memoryApplicants: Applicant[] = [];

type ApplicantRow = Applicant & RowDataPacket;

function mapDbApplicant(row: ApplicantRow): Applicant {
  return {
    id: row.id,
    type: row.type,
    fullName: row.full_name ?? row.fullName,
    email: row.email,
    phone: row.phone,
    createdAt: row.created_at ?? row.createdAt,
    updatedAt: row.updated_at ?? row.updatedAt,
  };
}

export async function listApplicantsRepo(): Promise<Applicant[]> {
  try {
    const [rows] = await db.execute<ApplicantRow[]>('SELECT * FROM applicants ORDER BY created_at DESC');
    return rows.map(mapDbApplicant);
  } catch {
    return memoryApplicants;
  }
}

export async function createApplicantRepo(applicant: Applicant): Promise<Applicant> {
  try {
    await db.execute(
      `INSERT INTO applicants (id, type, full_name, email, phone, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        applicant.id,
        applicant.type,
        applicant.fullName,
        applicant.email,
        applicant.phone,
        applicant.createdAt,
        applicant.updatedAt,
      ],
    );
    return applicant;
  } catch {
    memoryApplicants.push(applicant);
    return applicant;
  }
}

export async function findApplicantByEmailRepo(email: string): Promise<Applicant | undefined> {
  try {
    const [rows] = await db.execute<ApplicantRow[]>('SELECT * FROM applicants WHERE email = ? LIMIT 1', [email]);
    return rows[0] ? mapDbApplicant(rows[0]) : memoryApplicants.find((item) => item.email.toLowerCase() === email.toLowerCase());
  } catch {
    return memoryApplicants.find((item) => item.email.toLowerCase() === email.toLowerCase());
  }
}

export async function findApplicantByIdRepo(id: string): Promise<Applicant | undefined> {
  try {
    const [rows] = await db.execute<ApplicantRow[]>('SELECT * FROM applicants WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? mapDbApplicant(rows[0]) : memoryApplicants.find((item) => item.id === id);
  } catch {
    return memoryApplicants.find((item) => item.id === id);
  }
}
