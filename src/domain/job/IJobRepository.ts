import { JobDomain } from './JobDomain';

export interface IJobRepository {
  save(job: JobDomain): Promise<string>;
  getAll(): Promise<JobDomain[]>;
  remove(jobId: number): Promise<string>;
  update(jobId: number, job: JobDomain): Promise<JobDomain>;
  getJob(jobId: number): Promise<JobDomain>;
}
