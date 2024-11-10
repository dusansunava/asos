import PageTitle from "@/components/PageTitle";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tab } from "@/components/ui/tab";
import { Message } from "@/providers/intl/IntlMessage";
import { Loader } from "@/components/ui/loader";
import { useQuery } from '@tanstack/react-query';
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Portfolio } from "./schema";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import apiService from "@/lib/fetch/apiService";
import { MousePointerClick, PlusCircle } from "lucide-react";

const HomePage = () => {

  /*
  const { isLoading: loadingPortfolios, data: portfolios } = useQuery<Portfolio[]>({
    queryFn: async () => {
      const { data } = await apiService.get('/portfolios');
      const portfolios: Portfolio[] = JSON.parse(data);
      return portfolios;
    },
    retry: false,
    queryKey: ['portfolios'],
  });
  */

  const colors = ["#0000ff", "#4cac10", "#1aaf99", "#1aa0ff"];

  const foodData = [
    { name: 'halušky', calories: 100 },
    { name: 'bryndza', calories: 150 },
    { name: 'chlieb', calories: 200 },
    { name: 'rožok', calories: 20000 },
    { name: 'horalka', calories: 100 }
  ]

  const exerciseData = [
    { name: 'beh', calories: 100 },
    { name: 'plavanie', calories: 150 },
    { name: 'chlieb', calories: 200 },
    { name: 'rožok', calories: 20000 },
    { name: 'horalka', calories: 100 }
  ]

  return (
    <IntlMessagePathProvider value="Home" override>
      <PageTitle />
      <Card className="w-full p-10">
        <CardContent className="">
          <div className="text-left m-2">
            <Message>overview</Message>
            <div className="flex flex-wrap -mx-2">
              
              
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-left m-2">
            <Message>food</Message>
            <div className="flex flex-wrap -mx-2">
              {foodData.slice(0, 5).map((crypto, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                  <Tab name={crypto.name} value={crypto.calories} backgroundColor={colors[index]} />
                </div>
              ))}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                <Link to="/assets"
                      className={buttonVariants({ variant: "secondary" })}>
                  <MousePointerClick />
                  <Message>button.viewFood</Message>
                </Link>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-left m-2">
            <Message>exercise</Message>
            <div className="flex flex-wrap -mx-2">
              {exerciseData.slice(0, 5).map((stock, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                  <Tab name={stock.name} value={stock.calories} backgroundColor={colors[index]} />
                </div>
              ))}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                <Link to="/portfolios"
                      className={buttonVariants({ variant: "secondary" })}>
                  <MousePointerClick />
                  <Message>button.viewExercise</Message>
                </Link>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
        </CardContent>
      </Card>
      
    </IntlMessagePathProvider>
  );
};

export default HomePage;
