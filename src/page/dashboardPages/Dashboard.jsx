import React from "react";
import PubliserArticlePieChart from "./dashboardComponents/PubliserArticlePieChart";
import UserArticleCountChart from "./dashboardComponents/UserArticleCountChart";

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to dashboard</h2>
      <PubliserArticlePieChart />
      <UserArticleCountChart />
    </div>
  );
};

export default Dashboard;
