import { Button, Empty, notification, Typography } from "antd";
import { axiosInstance } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./my-subscriptions.scss";
import { removeSubscriptionById, Subscription } from "./subscripitionsSlice";
const { Text } = Typography;

export const MySubscriptions = () => {
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

  return (
    <div className="my-subscriptions">
      {subscriptions.length ? (
        subscriptions.map((subscription) => (
          <div className="my-subscriptions__item" key={subscription.user_id}>
            <div className="my-subscriptions__item__block">
              <Text>
                {subscription.first_name} {subscription.last_name}
              </Text>
              <Text strong>{subscription.email}</Text>
            </div>
            <Button danger onClick={() => onUnsubscribeClick(subscription)}>
              Unsubscribe
            </Button>
          </div>
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};
