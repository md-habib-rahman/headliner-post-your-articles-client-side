import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Chart from "react-google-charts";

const UserArticleCountChart = () => {
  const [barChartData, setBarChartData] = useState([["User", "Articles"]]);
  const [loading, setLoading] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userArticleCounts"],
    queryFn: async () => {
      const response = await axiosInstance.get("/stats/articles-by-user");
      return response.data;
    },
  });

  console.log(data);

  useEffect(() => {
    if (!isLoading && data) {
      //   const total = data.reduce((sum, item) => sum + item.count, 0);

      //   const pieData = data.map((item) => [
      //     item._id,
      //     parseFloat(((item.count / total) * 100).toFixed(2)),
      //   ]);
      //   setChartData([["Publisher", "Articles"], ...pieData]);

      const barData = data.map((item) => [item.name, item.count]);
      setBarChartData([["User", "Articles"], ...barData]);

      setLoading(false);
    }
  }, [data, isLoading]);
  console.log(barChartData);
  if (loading) return <div>Loading chart...</div>;

  const options = {
    title: "User-wise Article Count",
  };

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="300px"
      data={barChartData}
      options={options}
    />
  );
};

export default UserArticleCountChart;
