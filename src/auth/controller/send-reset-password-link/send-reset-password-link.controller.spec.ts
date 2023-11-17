import { Test, TestingModule } from '@nestjs/testing';
import { SendResetPasswordLinkController } from './send-reset-password-link.controller';

describe('SendResetPasswordLinkController', () => {
  let controller: SendResetPasswordLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendResetPasswordLinkController],
    }).compile();

    controller = module.get<SendResetPasswordLinkController>(SendResetPasswordLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
