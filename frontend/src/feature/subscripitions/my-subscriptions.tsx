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
      "/subscripiton/unsubscribe-user",
      { user_id: id }
    );
    removeSubscriptionById(id);
  };

  return (
    <div className="my-subscriptions">
      {subscriptions.length ? (
        subscriptions.map((subscription) => (
          <div className="subscription-block" key={subscription.user_id}>
            <div>
              <Text>{subscription.first_name}</Text>
              <Text>{subscription.last_name}</Text>
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
