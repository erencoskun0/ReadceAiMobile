import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import customRequest from '../../utils/customRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractFirstErrorMessage } from '../../utils/extractErrorMessage';
import { Toast } from 'toastify-react-native';
type initialAuthTypes = {
  loading: boolean;
  isAuthenticated: boolean | undefined;
  userId: string | null;
  isPremium: boolean;
  userEmail: string | null;
};

const initialState: initialAuthTypes = {
  loading: false,
  isAuthenticated: false, // Varsayılan olarak `false`
  userId: null,
  isPremium: false,
  userEmail: null,
};
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  try {
    const value = await AsyncStorage.getItem('guest');
    if (value !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('AsyncStorage error:', error);
  }
});
export const guestAuth = createAsyncThunk('auth/guestAuth', async () => {
  try {
    await AsyncStorage.setItem('guest', 'true');
  } catch (error) {
    console.error('AsyncStorage error:', error);
  }
});
export const guestLogOut = createAsyncThunk('auth/guestLogOut', async () => {
  try {
    await AsyncStorage.removeItem('guest');
    return false;
  } catch (error) {
    console.error('AsyncStorage error:', error);
  }
});
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
  'userRegister',
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
    } catch (error: any) {
      console.log(error.response?.data.message);
      if (error) {
        Toast.warn(extractFirstErrorMessage(error.response?.data.message));
      } else {
        Toast.warn('Bilinmeyen bir hata oluştu!');
      }
      return error.response?.data;
    }
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
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
    builder
      .addCase(guestLogOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(guestLogOut.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload;
      })
      .addCase(guestLogOut.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
