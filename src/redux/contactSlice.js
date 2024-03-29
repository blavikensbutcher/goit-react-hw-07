import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { addContact, deleteContact, fetchContacts } from '../api/api';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      }).addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload.id)
      }).addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(addContact.pending, (state) => {
        state.isLoading = true;
      }).addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload)
      }).addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const contactReducer = contactSlice.reducer;

const persistContactsConfig = {
  key: 'contacts',
  storage,
};
export const persistedContactsReducer = persistReducer(persistContactsConfig, contactReducer);
