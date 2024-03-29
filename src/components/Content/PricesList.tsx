import React, { useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { Virtuoso } from "react-virtuoso";
import { compareAsc, compareDesc, formatDate } from "date-fns";
import { MonthlyData } from "models/StockData";
import Dropdown from "components/UIElements/Dropdown";

interface PricesListProps {
  data: MonthlyData;
}

enum SortEnum {
  date = "0. date",
  open = "1. open",
  high = "2. high",
  low = "3. low",
  close = "4. close",
  volume = "5. volume",
}

enum SortDirEnum {
  asc = "asc",
  desc = "desc",
}

const PricesList = ({ data }: PricesListProps): JSX.Element => {
  const [sortBy, setSortBy] = useState<SortEnum>(SortEnum.date);
  const [sortDir, setSortDir] = useState<SortDirEnum>(SortDirEnum.desc);
  const divRef = useRef<HTMLDivElement>(null);

  const monthlyPrices = useMemo(() => {
    const monthlyFeed = data?.["Monthly Time Series"] || {};
    return Object.keys(monthlyFeed)
      .map((date) => {
        return {
          ...monthlyFeed?.[date],
          "0. date": date,
        };
      })
      .sort((a, b) => {
        if (sortBy.indexOf("date") !== -1) {
          return sortDir === SortDirEnum.asc
            ? compareAsc(a[sortBy], b[sortBy])
            : compareDesc(a[sortBy], b[sortBy]);
        }
        return sortDir === SortDirEnum.asc
          ? Number(a[sortBy]) - Number(b[sortBy])
          : Number(b[sortBy]) - Number(a[sortBy]);
      });
  }, [data, sortBy, sortDir]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex mb-3">
        <Dropdown
          text={`Sort by: ${sortBy.split(" ")[1]}`}
          value={sortBy}
          options={Object.values(SortEnum).map((key, index) => {
            return {
              key,
              text: key.split(" ")[1],
              onClick: () => setSortBy(key),
            };
          })}
        />
        <button
          className="w-16 p-3 ms-3 text-white bg-blue-700 rounded-lg"
          onClick={() =>
            setSortDir((prev) =>
              prev === SortDirEnum.asc ? SortDirEnum.desc : SortDirEnum.asc
            )
          }
        >
          {sortDir}
        </button>
      </div>
      <div ref={divRef} className="flex-1 overflow-y-auto">
        <Virtuoso
          data={monthlyPrices}
          style={{ height: "100%" }}
          itemContent={(index, item) => {
            return (
              <div
                key={item["0. date"]}
                className="mb-3 w-full text-white border bg-gray-800 border-gray-700 rounded-lg"
              >
                <div className="w-full p-1 ps-3 pe-3 rounded-t-lg bg-gray-700">
                  {formatDate(item["0. date"], "PP")}
                </div>
                <div className="p-3">
                  {Object.keys(item)
                    .filter((key) => key.indexOf("date") === -1)
                    .map((key) => {
                      const label = key.split(" ")[1];
                      return (
                        <div
                          key={label}
                          className="flex items-center justify-s"
                        >
                          <p
                            className={classNames({
                              "text-blue-700": key === sortBy,
                              "text-gray-400": key !== sortBy,
                            })}
                          >
                            {label}:
                          </p>
                          <p className="ms-3 font-extrabold">
                            {new Intl.NumberFormat("en-US", {
                              style: "decimal",
                              minimumFractionDigits: label !== "volume" ? 4 : 0,
                            }).format(Number(item[key as keyof typeof item]))}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default PricesList;
