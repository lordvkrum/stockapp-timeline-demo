import React, { useMemo, useState } from "react";
import { compareAsc, formatDate, getYear } from "date-fns";
import { ResponsiveLine } from "@nivo/line";
import { MonthlyData } from "models/StockData";
import Dropdown from "components/UIElements/Dropdown";

interface MonthlyChartProps {
  data: MonthlyData;
}

const MonthlyChart = ({ data }: MonthlyChartProps): JSX.Element => {
  const currentYear = getYear(Date.now());
  const [year, setYear] = useState<number>(currentYear);

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
        return compareAsc(a["0. date"], b["0. date"]);
      });
  }, [data]);

  const chartData = useMemo(() => {
    return Object.keys(monthlyPrices[0] || {})
      .filter((key) => {
        return !["0. date", "5. volume"].includes(key);
      })
      .map((key) => {
        return {
          id: key.split(" ")[1],
          data: monthlyPrices
            .filter((item) => {
              return item["0. date"].includes(String(year));
            })
            .map((item) => {
              return {
                x: formatDate(item["0. date"], "MMM"),
                y: item[key as keyof typeof item],
              };
            }),
        };
      });
  }, [monthlyPrices, year]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <Dropdown
          text={`Year: ${year}`}
          value={String(year)}
          options={Array(
            currentYear +
              1 -
              Number(monthlyPrices[0]["0. date"].split("-")[0]) || 1
          )
            .fill("")
            .map((key, index) => {
              const value = currentYear - index;
              return {
                key: String(value),
                text: String(value),
                onClick: () => {
                  setYear(value);
                  window.resizeBy(0, 0);
                },
              };
            })}
        />
      </div>
      <div className="flex-1 w-full overflow-auto">
        <ResponsiveLine
          data={chartData}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
          }}
          pointSize={10}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          legends={[
            {
              anchor: "top-left",
              direction: "row",
              translateY: -50,
              itemWidth: 80,
              itemHeight: 20,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MonthlyChart;
