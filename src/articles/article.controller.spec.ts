import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

const moduleMocker = new ModuleMocker(global);

describe('CatsController', () => {
  let controller: ArticlesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ArticlesController],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === ArticlesService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get(ArticlesController);
  });
});
