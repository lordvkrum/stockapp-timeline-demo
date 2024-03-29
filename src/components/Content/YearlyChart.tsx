import React, { useEffect, useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { compareAsc, getMonth, getYear } from "date-fns";
import { MonthlyData } from "models/StockData";

interface YearlyChartProps {
  data: MonthlyData;
}

const YearlyChart = ({ data }: YearlyChartProps): JSX.Element => {
  const [chartIndex, setChartIndex] = useState<number>(3);

  const monthlyPrices = useMemo(() => {
    const monthlyFeed = data?.["Monthly Time Series"] || {};
    const result = Object.keys(monthlyFeed).map((date) => {
      return {
        ...monthlyFeed?.[date],
        "0. date": date,
      };
    });
    const prices = [...result]
      .sort((a, b) => {
        return compareAsc(a["0. date"], b["0. date"]);
      })
      .filter((item) => {
        return getMonth(item["0. date"]) === 11;
      });
    if (getMonth(result[0]["0. date"]) !== 11) {
      prices.push(result[0]);
    }
    return prices;
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartIndex((prev) => {
        if (prev < monthlyPrices.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [monthlyPrices]);

  const chartData = useMemo(() => {
    return Object.keys(monthlyPrices[0] || {})
      .filter((key) => {
        return !["0. date", "5. volume"].includes(key);
      })
      .map((key) => {
        return {
          id: key.split(" ")[1],
          data: monthlyPrices
            .filter((item, index) => {
              return index < chartIndex;
            })
            .map((item) => {
              return {
                x: `'${String(getYear(item["0. date"])).substring(2)}`,
                y: item[key as keyof typeof item],
              };
            }),
        };
      });
  }, [monthlyPrices, chartIndex]);

  return (
    <div className="flex flex-col h-full">
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

export default YearlyChart;
