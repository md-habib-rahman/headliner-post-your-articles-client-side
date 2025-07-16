import React from "react";
import PubliserArticlePieChart from "./dashboardComponents/PubliserArticlePieChart";
import UserArticleCountChart from "./dashboardComponents/UserArticleCountChart";
import ArticleCountByDate from "./dashboardComponents/ArticleCountByDate";

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to dashboard</h2>
      <PubliserArticlePieChart />
      <UserArticleCountChart />
      <ArticleCountByDate />
    </div>
  );
};

export default Dashboard;
