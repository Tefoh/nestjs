import { Test, TestingModule } from '@nestjs/testing';
import { SendResetPasswordLinkService } from './send-reset-password-link.service';

describe('SendResetPasswordLinkService', () => {
  let service: SendResetPasswordLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendResetPasswordLinkService],
    }).compile();

    service = module.get<SendResetPasswordLinkService>(SendResetPasswordLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
