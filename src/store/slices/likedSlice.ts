import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikedState {
  liked: string[];
}

const initialState: LikedState = { liked: [] };

const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    likeUser: (state, action: PayloadAction<string>) => {
      if (!state.liked.includes(action.payload)) state.liked.push(action.payload);
    },
    removeLiked: (state, action: PayloadAction<string>) => {
      state.liked = state.liked.filter((id) => id !== action.payload);
    },
  },
});

export const { likeUser, removeLiked } = likedSlice.actions;
export default likedSlice.reducer;
