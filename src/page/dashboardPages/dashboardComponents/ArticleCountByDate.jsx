import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../../../api/axiosInstance";
import Chart from "react-google-charts";

const ArticleCountByDate = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["articlesByDate"],
    queryFn: async () => {
      const res = await axiosInstance.get("/stats/articles-by-date");
      return res.data;
    },
  });

  const chartData = [
    ["Date", "Articles"],
    ...data.map((item) => [item.date, item.count]),
  ];

  const options = {
    title: "Article post per Day",
  };

  if (isLoading) return <p>Loading chart...</p>;
  return (
    <Chart
      className="flex-1 shadow-xl"
      chartType="ColumnChart"
      //   width="50%"
      //   height="400px"
      data={chartData}
      options={options}
    />
  );
};

export default ArticleCountByDate;
