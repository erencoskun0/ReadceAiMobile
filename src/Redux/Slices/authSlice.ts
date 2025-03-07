import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import customRequest from '../../utils/customRequest';

type initialAuthTypes = {
  loading: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  isPremium: boolean;
  userEmail: string | null;
};

const initialState: initialAuthTypes = {
  loading: false,
  isAuthenticated: false,
  userId: null,
  isPremium: false,
  userEmail: null,
};

export const userLogin = createAsyncThunk(
  'userLogin',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await customRequest.post(`/api/Auth/Login`, {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {}
  }
);
export const userRegister = createAsyncThunk(
  'userLogin',
  async ({
    username,
    email,
    password,
    confirmPassword,
    nativeLanguageId,
    learningLanguageId,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    nativeLanguageId: string;
    learningLanguageId: string;
  }) => {
    try {
      const response = await customRequest.post(`/api/Auth/Register`, {
        username,
        email,
        password,
        confirmPassword,
        nativeLanguageId,
        learningLanguageId,
      });
      return response.data;
    } catch (error) {}
  }
);

export const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.succeeded == true) {
        state.isAuthenticated = true;
        state.loading = false;
      } else {
        state.isAuthenticated = false;
        state.loading = false;
      }
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
