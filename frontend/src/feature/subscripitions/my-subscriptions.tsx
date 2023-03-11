import { Empty, Input, notification, Typography } from "antd";
import { useState } from "react";
import { axiosInstance } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeSubscriptionById, Subscription } from "./subscripitionsSlice";
const { Text } = Typography;

export const MySubscriptions = () => {
  const [searchUser, setSearchUser] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const subscriptions = useAppSelector(
    (state) => state.subsciptions.subscriptions
  );

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

  const filterUsersByEmail = (subscription: Subscription) => {
    if (!searchUser) return true;
    return subscription.email.toLowerCase().includes(searchUser.toLowerCase());
  };

  return (
    <div className="content-container">
      <div className="list w-full">
        {subscriptions.length ? (
          <>
            <Text className="default-text">Find user by email:</Text>
            <Input
              placeholder="Find by email"
              className="custom-input"
              value={searchUser}
              onChange={(event) => setSearchUser(event.target.value)}
            />
            {subscriptions.filter(filterUsersByEmail).map((subscription) => (
              <div className="list__item" key={subscription.user_id}>
                <div className="list__item__block">
                  <Text className="default-text">
                    {subscription.first_name} {subscription.last_name}
                  </Text>
                  <Text className="default-text" strong>
                    {subscription.email}
                  </Text>
                </div>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => onUnsubscribeClick(subscription)}
                >
                  Unsubscribe
                </button>
              </div>
            ))}
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};
