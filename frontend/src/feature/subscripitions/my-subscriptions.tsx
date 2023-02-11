import { Button, Empty, Typography } from "antd";
import { axiosInstance } from "../../api";
import { useAppSelector } from "../../hooks";
import "./my-subscriptions.scss";
import { removeSubscriptionById } from "./subscripitionsSlice";
const { Text } = Typography;

export const MySubscriptions = () => {
  const subscriptions = useAppSelector(
    (state) => state.subsciptions.subscriptions
  );

  const onUnsubscribeClick = async (id: number) => {
    const { data } = await axiosInstance.post(
      "/subscription/unsubscribe-user",
      { user_id: id }
    );
    removeSubscriptionById(id);
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
            <Button
              danger
              onClick={() => onUnsubscribeClick(subscription.user_id)}
            >
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
