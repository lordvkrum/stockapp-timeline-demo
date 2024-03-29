import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MonthlyData } from "models/StockData";
import { RouteParams } from "models/Navigation";
import Loading from "components/UIElements/Loader";
import Alert from "components/UIElements/Alert";
import PricesList from "./PricesList";

const TabsWrapper = (): JSX.Element => {
  const params = useParams<RouteParams>();
  const [selectedTab, setSelectedTab] = useState("list");

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
          <li role="presentation">
            <button
              className={
                "p-3 border-b-2 text-blue-700 border-blue-700 hover:text-blue-700"
              }
              role="tab"
              onClick={() => setSelectedTab("list")}
            >
              Prices List
            </button>
          </li>
        </ul>
      </div>
      <div role="tabpanel" className="flex-1 overflow-y-auto">
        {selectedTab === "list" && <PricesList data={data} />}
      </div>
    </div>
  );
};

export default TabsWrapper;
