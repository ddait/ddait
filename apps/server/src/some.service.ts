import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService) {}

  someMethod() {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    // ... rest of the code
  }
}