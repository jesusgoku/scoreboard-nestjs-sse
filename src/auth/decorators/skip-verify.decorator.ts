import { SetMetadata } from '@nestjs/common';

export const SKIP_VERIFY_KEY = 'AuthModule:skipVerify';

export const SkipVerify = () => SetMetadata(SKIP_VERIFY_KEY, true);
