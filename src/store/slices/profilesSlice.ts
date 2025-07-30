import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  picture: string;
  email: string;
  bio?: string;
  matchPercentage?: number;
  interests?: string[];
  phone?: string;
  nationality?: string;
}

interface ProfilesState {
  profiles: Profile[];
  currentIndex: number;
}

const initialState: ProfilesState = {
  profiles: [],
  currentIndex: 0,
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.profiles = action.payload;
      state.currentIndex = 0; // Reset to first profile when setting new profiles
    },
    appendProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.profiles.push(...action.payload);
    },
    nextProfile: (state) => {
      state.currentIndex += 1;
    },
    undoSwipe: (state) => {
      if (state.currentIndex > 0) state.currentIndex -= 1;
    },
  },
});

export const { setProfiles, appendProfiles, nextProfile, undoSwipe } = profilesSlice.actions;
export default profilesSlice.reducer;
