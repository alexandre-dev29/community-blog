import { MyAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new MyAuthGuard()).toBeDefined();
  });
});
