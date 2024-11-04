import { Message } from "@/providers/intl/IntlMessage";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-xl italic">
        <Message>PageNotFound</Message>
      </h1>
    </div>
  );
};

export default NotFoundPage;
