import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { SearchAPIResponse } from "models/StockData";
import { RouteParams } from "models/Navigation";
import Loading from "components/UIElements/Loader";
import Alert from "components/UIElements/Alert";

interface SearchListProps {
  query: string;
}

const SearchList = ({ query }: SearchListProps): JSX.Element => {
  const params = useParams<RouteParams>();

  const { data, isLoading } = useQuery({
    queryKey: ["search", { query }],
    queryFn: async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.REACT_APP_APIKEY}`
      );
      const data = (await response.json()) as SearchAPIResponse;
      return data.bestMatches || [];
    },
    enabled: !!query,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!query) {
    return <Alert text="Type something to search" />;
  }

  if (data?.length === 0) {
    return <Alert text={`No results for "${query}"`} />;
  }

  return (
    <ul className="max-w-md divide-y divide-gray-700 flex-1 overflow-y-auto text-white">
      {data?.map((item) => {
        return (
          <li
            key={item["1. symbol"]}
            className={classNames("w-full p-3", {
              "bg-gray-700": params.symbol === item["1. symbol"],
            })}
          >
            <Link to={`/${item["1. symbol"]}`}>
              <div className="flex items-center">
                <div className="flex flex-col items-start flex-shrink-0">
                  <p className="font-semibold">{item["1. symbol"]}</p>
                  <p className="text-sm text-end font-medium">
                    {item["2. name"]}
                  </p>
                  <p className="text-sm text-gray-400">
                    {item["3. type"]} ({item["8. currency"]})
                  </p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchList;
