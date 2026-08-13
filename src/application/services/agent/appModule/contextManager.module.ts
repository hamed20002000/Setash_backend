import { Global, Module } from '@nestjs/common';
import { ContextManager } from '../contextManager';

@Global()
@Module({
  providers: [ContextManager],
  exports: [ContextManager],
})
export class ContextManagerModule {}