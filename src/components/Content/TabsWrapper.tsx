import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { MonthlyData } from "models/StockData";
import { RouteParams } from "models/Navigation";
import Loading from "components/UIElements/Loader";
import Alert from "components/UIElements/Alert";
import PricesList from "./PricesList";
import MonthlyChart from "./MonthlyChart";
import YearlyChart from "./YearlyChart";

enum TabsEnum {
  list = "list",
  monthly = "monthly",
  yearly = "yearly",
}

const tabLabels = {
  [TabsEnum.list]: "Prices List",
  [TabsEnum.monthly]: "Monthly Chart",
  [TabsEnum.yearly]: "Yearly Timeline",
};

const TabsWrapper = (): JSX.Element => {
  const params = useParams<RouteParams>();
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(TabsEnum.list);

  const { data, isLoading } = useQuery({
    queryKey: ["monthly-data", { query: params.symbol }],
    queryFn: async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${params.symbol}&apikey=${process.env.REACT_APP_APIKEY}`
      );
      const data = (await response.json()) as MonthlyData;
      return data;
    },
    enabled: !!params.symbol,
  });

  useEffect(() => {
    setSelectedTab(TabsEnum.list);
  }, [params.symbol]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.["Meta Data"]) {
    return <Alert text="No data to display" />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3 border-b border-gray-800">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium"
          role="tablist"
        >
          {Object.values(TabsEnum).map((tab) => {
            return (
              <li key={tab} role="presentation">
                <button
                  className={classNames("p-3 hover:text-blue-700", {
                    "border-b-2 text-blue-700 border-blue-700":
                      selectedTab === tab,
                  })}
                  role="tab"
                  onClick={() => setSelectedTab(tab)}
                >
                  {tabLabels[tab]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div role="tabpanel" className="flex-1 overflow-y-auto">
        {selectedTab === TabsEnum.list && <PricesList data={data} />}
        {selectedTab === TabsEnum.monthly && <MonthlyChart data={data} />}
        {selectedTab === TabsEnum.yearly && <YearlyChart data={data} />}
      </div>
    </div>
  );
};

export default TabsWrapper;
