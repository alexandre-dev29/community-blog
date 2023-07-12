import {AccessControlProvider, CanParams} from '@refinedev/core';
import nookies from 'nookies';

export const accessControlProvider: AccessControlProvider = {
  can: async ({resource}: CanParams) => {
    const auth = nookies.get()['auth'];
    if (auth) {
      const parsedUser = JSON.parse(auth);

      if (resource === 'categories' && parsedUser.role === 'Editor') {
        return Promise.resolve({can: false, reason: 'Unauthorized'});
      }
      if (resource === 'users' && parsedUser.role === 'Editor') {
        return Promise.resolve({can: false, reason: 'Unauthorized'});
      }

      return Promise.resolve({can: true});
    } else {
      return Promise.resolve({can: false, reason: 'Unauthorized'});
    }
  },
};
