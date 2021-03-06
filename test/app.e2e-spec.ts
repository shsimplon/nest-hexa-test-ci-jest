import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from './mock/entity';
import { JobModule } from './mock/job.module';
import { JobDomain } from '../src/domain/job/JobDomain';
import { getConnection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          entities: [JobEntity],
          logging: true,
          synchronize: true,
        }),
        JobModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const connection = await getConnection();
    const entityManager = connection.createEntityManager();

    entityManager.insert<JobEntity>(JobEntity, {
      title: 'comptable',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
    entityManager.insert<JobEntity>(JobEntity, {
      title: 'dev',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
    entityManager.insert<JobEntity>(JobEntity, {
      title: 'CTO',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
  });

  it('/jobs (GET)', () => {
    let response;
    const job = new JobDomain({
      title: 'title',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
    request(app.getHttpServer())
      .post('/jobs')
      .send(job)
      .expect(HttpStatus.CREATED);
    request(app.getHttpServer()).get('/jobs').expect(HttpStatus.OK);
  });
});
