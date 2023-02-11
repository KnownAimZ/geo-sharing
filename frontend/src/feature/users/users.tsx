import { Button, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import { useAppSelector } from "../../hooks";
import {
  addNewSubscription,
  removeSubscriptionById,
  Subscription,
} from "../subscripitions/subscripitionsSlice";
import "./users.scss";
const { Text } = Typography;

export const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const [email, setEmail] = useState("");
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

  const onUnsubscribeClick = async (id: number) => {
    const { data } = await axiosInstance.post(
      "/subscription/unsubscribe-user",
      { user_id: id }
    );
    removeSubscriptionById(id);
  };

  const onSubscribeClick = async (user: Subscription) => {
    const { data } = await axiosInstance.post("/subscription/subscribe-user", {
      user_id: user.user_id,
    });
    addNewSubscription(user);
  };

  useEffect(() => {
    loadUsers();
  }, [email]);

  return (
    <div className="users">
      <Text>Find user by email:</Text>
      <Input
        placeholder="Find by email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      {users
        .filter((_user: any) => _user.user_id !== currentUser?.user_id)
        .map((user: any) => (
          <div key={user.user_id} className="users__item">
            <div className="users__item__block">
              <Text>
                {user.first_name} {user.last_name}
              </Text>
              <Text strong>{user.email}</Text>
            </div>
            {isUserSubscribed(user) ? (
              <Button danger onClick={() => onUnsubscribeClick(user.user_id)}>
                Unsubscribe
              </Button>
            ) : (
              <Button type="primary" onClick={() => onSubscribeClick(user)}>
                Subscribe
              </Button>
            )}
          </div>
        ))}
    </div>
  );
};
