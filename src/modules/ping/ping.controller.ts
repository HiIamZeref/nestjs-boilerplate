import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'ping', version: '1' })
export class PingController {
  @Get()
  ping() {
    return { ok: true, ts: new Date().toISOString() };
  }
}
