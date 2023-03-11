import { Input, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addNewSubscription,
  removeSubscriptionById,
  Subscription,
} from "../subscripitions/subscripitionsSlice";
const { Text } = Typography;

export const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.user);
  const subscriptions = useAppSelector(
    (state) => state.subsciptions.subscriptions
  );

  const isUserSubscribed = (user: any) => {
    return !!subscriptions.find((sub) => sub.user_id === user.user_id);
  };

  const loadUsers = async () => {
    const { data } = await axiosInstance.post("/subscription/find-user", {
      email: email,
    });
    setUsers(data.users);
  };

  const onUnsubscribeClick = async (subscription: Subscription) => {
    const { data } = await axiosInstance.post(
      "/subscription/unsubscribe-user",
      { user_id: subscription.user_id }
    );
    dispatch(removeSubscriptionById(subscription.user_id));
    notification.success({
      message: `Successfully unsubscribed from ${subscription.email}`,
    });
  };

  const onSubscribeClick = async (subscription: Subscription) => {
    const { data } = await axiosInstance.post("/subscription/subscribe-user", {
      user_id: subscription.user_id,
    });
    dispatch(addNewSubscription(subscription));
    notification.success({
      message: `Successfully subscribed to ${subscription.email}`,
    });
  };

  useEffect(() => {
    loadUsers();
  }, [email]);

  return (
    <div className="content-container">
      <div className="list w-full">
        <Text className="default-text">Find user by email:</Text>
        <Input
          placeholder="Find by email"
          className="custom-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {users
          .filter((_user: any) => _user.user_id !== currentUser?.user_id)
          .map((user: any) => (
            <div key={user.user_id} className="list__item">
              <div className="list__item__block">
                <Text className="default-text">
                  {user.first_name} {user.last_name}
                </Text>
                <Text className="default-text" strong>
                  {user.email}
                </Text>
              </div>
              {isUserSubscribed(user) ? (
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => onUnsubscribeClick(user)}
                >
                  Unsubscribe
                </button>
              ) : (
                <button
                  className="btn-primary mr-2"
                  onClick={() => onSubscribeClick(user)}
                >
                  Subscribe
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
