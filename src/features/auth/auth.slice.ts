
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthData } from './auth.type'


const initialState: AuthData = {
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthData>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    clearSession: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setSession, clearSession } = authSlice.actions
export default authSlice.reducer
