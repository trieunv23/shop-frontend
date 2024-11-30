import { configureStore, combineReducers, createReducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import cartReducer from '../features/Checkout/Cart/slice';
import authReducer from '../features/User/slice';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ 
            serializableCheck: false, 
        }),
});

export const persistor = persistStore(store);