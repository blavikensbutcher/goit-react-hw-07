import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [
      {
        id: 1,
        name: 'Triss Merigold',
        number: '80980985152',
      },
      {
        id: 2,
        name: 'Yennifer',
        number: '80500989999',
      },
      {
        id: 3,
        name: 'Geralt from Rivia',
        number: '80630988888',
      },
      {
        id: 4,
        name: 'Yarpen Zigrin',
        number: '80970985152',
      },
    ],
  },
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    removeContact(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});
export const { addContact, removeContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;

const persistContactsConfig = {
  key: 'contacts',
  storage,
};
export const persistedContactsReducer = persistReducer(persistContactsConfig, contactReducer);
