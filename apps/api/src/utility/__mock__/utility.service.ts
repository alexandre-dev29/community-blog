import { jest } from '@jest/globals';
import { tokenStub } from '../../users/test/stubs/token.stub';
import { Tokens } from '../../../types';

export const UtilityServiceMock: any = {
  getTokens: jest.fn<() => Promise<Tokens>>().mockResolvedValue(tokenStub()),
};
