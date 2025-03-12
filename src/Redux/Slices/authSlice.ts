import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import customRequest from '../../utils/customRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';
import { jwtDecode } from 'jwt-decode';
type initialAuthTypes = {
  loading: boolean;
  isAuthenticated: boolean | undefined;
  isGuest: boolean | undefined;
  userId: string | null;
  role: string | null;
  userEmail: string | null;
};

const initialState: initialAuthTypes = {
  loading: false,
  isAuthenticated: false,
  isGuest: false,
  userId: null,
  role: null,
  userEmail: null,
};
export const checkGuestAuth = createAsyncThunk('auth/checkGuestAuth', async () => {
  try {
    const value = await AsyncStorage.getItem('guest');
    const token = await AsyncStorage.getItem('accesstoken');
    if (value) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('AsyncStorage error:', error);
  }
});
export const checkLoginAuth = createAsyncThunk('auth/checkLoginAuth', async () => {
  try {
    const token = await AsyncStorage.getItem('accesstoken');
    if (token) {
      const durum: boolean = true;
      return { durum, token };
    } else {
      const durum: boolean = false;
      return { durum };
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
export const LogOut = createAsyncThunk('auth/LogOut', async () => {
  try {
    await AsyncStorage.removeItem('accesstoken');
    await AsyncStorage.removeItem('refreshtoken');
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
      console.log('response authlogin', response.data);
      try {
        await AsyncStorage.setItem('accesstoken', response.data?.token);
        await AsyncStorage.setItem('refreshtoken', response.data?.refreshToken);
      } catch (error) {
        console.error('AsyncStorage error:', error);
      }
      return response.data;
    } catch (error: any) {
      Toast.error(
        error.response.data.message
          ?.replace('Username', 'Kullanıcı Adı')
          ?.replace('Password', 'Şifre')
          ?.replace('Confirm Password', 'Şifre Tekrarı')
      );
      return error.response.data.errors;
    }
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
      Toast.error(
        error.response.data.errors[0]
          ?.replace('Username', 'Kullanıcı Adı')
          ?.replace('Password', 'Şifre')
          ?.replace('Confirm Password', 'Şifre Tekrarı')
      );
      return error.response.data.errors;
    }
  }
);

export const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkGuestAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkGuestAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isGuest = action.payload;
      })
      .addCase(checkGuestAuth.rejected, (state) => {
        state.loading = false;
        state.isGuest = false;
      });
    builder
      .addCase(checkLoginAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLoginAuth.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.isAuthenticated = action.payload?.durum;
        if (action.payload?.token) {
          const decodedToken = jwtDecode<any>(action.payload?.token);
          state.userEmail = decodedToken.email;
          state.userId = decodedToken.jti;
          state.role = decodedToken.role;
        }
      })
      .addCase(checkLoginAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
    builder
      .addCase(guestLogOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(guestLogOut.fulfilled, (state, action) => {
        state.loading = false;
        state.isGuest = action.payload;
      })
      .addCase(guestLogOut.rejected, (state) => {
        state.loading = false;
        state.isGuest = false;
      });
    builder
      .addCase(LogOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(LogOut.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload;
        state.userEmail = null;
        state.userId = null;
        state.role = null;
      })
      .addCase(LogOut.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userRegister.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.token) {
          state.isAuthenticated = true;

          const decodedToken = jwtDecode<any>(action.payload.token);
          state.userEmail = decodedToken.email;
          state.userId = decodedToken.jti;
          state.role = decodedToken.role;
        }
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
