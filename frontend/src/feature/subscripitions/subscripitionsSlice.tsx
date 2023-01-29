import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Subscription {
  first_name: string;
  last_name: string;
  user_id: number;
}

export interface SubscriptionState {
  subscriptions: Subscription[];
}

const setSubscriptionsToLocalStorage = (subscriptions: Subscription[]) => {
  localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
};

const removeSubscriptionsFromLocalStorage = () => {
  localStorage.removeItem("subscriptions");
};

const getSubscriptionsFromLocalStorage = () => {
  const _subscriptions = localStorage.getItem("subscriptions");
  if (!_subscriptions) {
    return [];
  }
  return JSON.parse(_subscriptions);
};

const initialState: SubscriptionState = {
  subscriptions: getSubscriptionsFromLocalStorage(),
};

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setSubscriptions: (state, action: PayloadAction<Subscription[]>) => {
      state.subscriptions = action.payload;
      setSubscriptionsToLocalStorage(action.payload);
    },
    removeSubscriptions: (state) => {
      state.subscriptions = [];
      removeSubscriptionsFromLocalStorage();
    },
    removeSubscriptionById: (state, action: PayloadAction<number>) => {
      state.subscriptions = state.subscriptions.filter(
        (subscription) => subscription.user_id !== action.payload
      );
    },
    addNewSubscription: (state, action: PayloadAction<Subscription>) => {
      state.subscriptions.push(action.payload);
    },
  },
});

export const {
  setSubscriptions,
  removeSubscriptions,
  removeSubscriptionById,
  addNewSubscription,
} = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
