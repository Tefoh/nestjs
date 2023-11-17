import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { BycryptService } from './bycrypt/bycrypt.service';

@Module({
  providers: [
    {
      provide: HashService,
      useClass: BycryptService,
    },
  ],
  exports: [HashService],
})
export class HashModule {}
