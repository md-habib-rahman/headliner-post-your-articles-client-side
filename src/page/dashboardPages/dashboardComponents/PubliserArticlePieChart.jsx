import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import "aos/dist/aos.css";
import Chart from "react-google-charts";
import axiosInstanceSecure from "../../../api/axiosInstanceSecure";
import useAxiosInstanceSecure from "../../../api/axiosInstanceSecure";

const PubliserArticlePieChart = () => {
  const axiosSecure = useAxiosInstanceSecure();
  const [chartData, setChartData] = useState([["Publisher", "Articles"]]);
  const [loading, setLoading] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["publisherArticleCounts"],
    queryFn: async () => {
      const response = await axiosSecure.get("/stats/articles-by-publisher");
      return response.data;
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      const total = data.reduce((sum, item) => sum + item.count, 0);
      const formatted = data.map((item) => [
        item._id,
        parseFloat(((item.count / total) * 100).toFixed(2)),
      ]);
      setChartData([["Publisher", "Articles"], ...formatted]);
      setLoading(false);
    }
  }, [data, isLoading]);

  if (loading) return <div>Loading chart...</div>;
  if (isError) return <div>{"Error loading chart data"}</div>;

  return (
    <Chart
      className="shadow-xl "
      chartType="PieChart"
      data={chartData}
      options={{
        is3D: true,
        title: "Publisher wise article contribution",
        chartArea: {
          left: 0,
          top: 10,

          //   width: "100%",
          //   height: "100%",
        },

        slices: {
          0: { offset: 0.1 },
        },
      }}
      //   height="400px"
      //   width="100%"
    />
  );
};

export default PubliserArticlePieChart;
