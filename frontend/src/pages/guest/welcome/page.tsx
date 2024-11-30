import { Button } from "@/components/ui/button";
import { Message } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Utensils, Dumbbell, BookText, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <IntlMessagePathProvider value="Welcome" override>
      <div className="mx-auto px-4 max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            <Message>title</Message>
          </h1>
          <ul className="mt-20 space-y-4">
            <li className="flex items-start gap-3 p-4 rounded-lg border dark:border-gray-600 border-gray-300 bg-gray-50 dark:bg-gray-800">
              <BookText className="w-6 h-6 flex-shrink-0 text-blue-500" />
              <span className="text-md sm:text-lg leading-7 dark:text-gray-400 text-gray-600">
                <Message>firstPoint</Message>
              </span>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-lg border dark:border-gray-600 border-gray-300 bg-gray-50 dark:bg-gray-800">
              <Dumbbell className="w-6 h-6 flex-shrink-0 text-green-500" />
              <span className="text-md sm:text-lg leading-7 dark:text-gray-400 text-gray-600">
                <Message>secondPoint</Message>
              </span>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-lg border dark:border-gray-600 border-gray-300 bg-gray-50 dark:bg-gray-800">
              <MessageSquare className="w-6 h-6 flex-shrink-0 text-yellow-500" />
              <span className="text-md sm:text-lg leading-7 dark:text-gray-400 text-gray-600">
                <Message>thirdPoint</Message>
              </span>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-lg border dark:border-gray-600 border-gray-300 bg-gray-50 dark:bg-gray-800">
              <Utensils className="w-6 h-6 flex-shrink-0 text-red-500" />
              <span className="text-md sm:text-lg leading-7 dark:text-gray-400 text-gray-600">
                <Message>fourthPoint</Message>
              </span>
            </li>
          </ul>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="p-0">
              <Link to="/register" className="px-4 py-2">
                <Message>getStarted</Message>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </IntlMessagePathProvider>
  );
};


export default WelcomePage;
