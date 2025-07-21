import React from "react";
import PubliserArticlePieChart from "./dashboardComponents/PubliserArticlePieChart";
import UserArticleCountChart from "./dashboardComponents/UserArticleCountChart";
import ArticleCountByDate from "./dashboardComponents/ArticleCountByDate";
import DashboardCard from "./dashboardComponents/DashboardCard";

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to dashboard</h2>
      <DashboardCard />
      <div className="flex flex-wrap">
        <PubliserArticlePieChart />
        <UserArticleCountChart />
        <ArticleCountByDate />
      </div>
    </div>
  );
};

export default Dashboard;
