import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// Initialize recoilPersist to enable persistence for Recoil state
const { persistAtom } = recoilPersist();

// Define a Recoil atom to manage member state
export const memberState = atom({
  // Unique key to identify this atom
  key: 'memberState',

  // Default value for the atom
  default: {
    nickname: '',
    profileImage: '',
  },

  // Apply persistence effect to the atom
  effects_UNSTABLE: [persistAtom],
});
