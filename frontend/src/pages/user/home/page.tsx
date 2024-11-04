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

  const { isLoading: loadingPortfolios, data: portfolios } = useQuery<Portfolio[]>({
    queryFn: async () => {
      const { data } = await apiService.get('/portfolios');
      const portfolios: Portfolio[] = JSON.parse(data);
      return portfolios;
    },
    retry: false,
    queryKey: ['portfolios'],
  });

  const colors = ["#0000ff", "#4cac10", "#1aaf99", "#1aa0ff"];

  const stockData = [
    { name: 'Tesla', price: 100 },
    { name: 'Amazon', price: 150 },
    { name: 'Microsoft', price: 200 },
    { name: 'Coca-cola', price: 20000 },
    { name: 'OpenAI', price: 100 },
    { name: 'Nvidia', price: 100 }
  ];

  const cryptoData = [
    { name: 'Bitcoin', price: 100 },
    { name: 'Ethereum', price: 150 },
    { name: 'Cardano', price: 200 },
    { name: 'Solana', price: 200000 },
    { name: 'DogeCoin', price: 100 },
    { name: 'Matic', price: 100 }
  ];

  return (
    <IntlMessagePathProvider value="Home" override>
      <PageTitle />
      <Card className="w-full p-10">
        <CardContent className="">
          <div className="text-left m-2">
            <Message>portfolios</Message>
            <div className="flex flex-wrap -mx-2">
              {loadingPortfolios ? (
                <Loader />
              ) : (
                portfolios?.slice(0, 3).map((portfolio, index) => (
                  <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                    <Tab name={portfolio.name} value={portfolio.value} backgroundColor={colors[index]} />
                  </div>
                ))
              )}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                <Link to="/portfolios"
                      className={buttonVariants({ variant: "secondary" })}>
                  <PlusCircle />
                  <Message>button.addPortfolio</Message>
                </Link>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-left m-2">
            <Message>crypto</Message>
            <div className="flex flex-wrap -mx-2">
              {cryptoData.slice(0, 5).map((crypto, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                  <Tab name={crypto.name} value={crypto.price} backgroundColor={colors[index]} />
                </div>
              ))}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                <Link to="/assets"
                      className={buttonVariants({ variant: "secondary" })}>
                  <MousePointerClick />
                  <Message>button.viewCrypto</Message>
                </Link>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-left m-2">
            <Message>stocks</Message>
            <div className="flex flex-wrap -mx-2">
              {stockData.slice(0, 5).map((stock, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                  <Tab name={stock.name} value={stock.price} backgroundColor={colors[index]} />
                </div>
              ))}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                <Link to="/portfolios"
                      className={buttonVariants({ variant: "secondary" })}>
                  <MousePointerClick />
                  <Message>button.viewStocks</Message>
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
