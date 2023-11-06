import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

describe('ReviewService', () => {
  let service: ReviewService;

  const exec = { exec: jest.fn() };
  const reviewRepositoryFactory = () => ({
    find: () => exec,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          useFactory: reviewRepositoryFactory,
          provide: getModelToken('Review'),
        },
      ],
    }).compile();

    service = module.get(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId', async () => {
    const productId = new Types.ObjectId().toHexString();
    reviewRepositoryFactory().find().exec.mockReturnValueOnce([{ productId }]);
    const res = await service.findByProductId(productId);
    expect(res[0].productId).toBe(productId);
  });
});
