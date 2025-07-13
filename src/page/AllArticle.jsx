import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { FaCrown } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { PrimaryButton } from "../components/Buttons";
import { BiCategoryAlt } from "react-icons/bi";
import { tags } from "../js/tags";

const AllArticle = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [searchPublisher, setSearchPublisher] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [articles, setArticles] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allArticles", debouncedSearch, searchPublisher, searchTag],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles/all", {
        params: {
          search: debouncedSearch,
          publisher: searchPublisher,
          tags: searchTag,
        },
      });
      return response.data;
    },
  });

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/publishers");
      return res.data;
    },
  });

  console.log(publishers);

  useEffect(() => {
    if (data) setArticles(data);
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const searchText = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleDetails = (id) => {
    navigate(`/article-details/${id}`);
  };

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (isError)
    return <div className="text-center p-8">Error loading articles</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary mb-4 font-montserrat">
        All Articles
      </h2>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={searchText}
          className="input input-bordered w-full sm:w-1/3"
        />
        <select
          className="select select-bordered w-full sm:w-1/3"
          onChange={(e) => setSearchPublisher(e.target.value)}
        >
          <option value="">Filter by Publisher</option>
          {publishers.map((publisher, idx) => (
            <option key={idx} value={publisher.name}>
              {publisher.name}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-full sm:w-1/3"
          onChange={(e) => setSearchTag(e.target.value)}
        >
          <option value="" defaultChecked={true}>
            Filter by Tags
          </option>
          {tags.map((tag, idx) => (
            <option key={idx} value={tag.value}>
              {tag.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-6">
        {articles.map((article, index) => {
          const iswide = index % 5 === 0;
          return (
            <div
              key={article._id}
              className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 flex-grow
				${iswide ? "basis-full sm:basis-[65%]" : "basis-full sm:basis-[31%]"}
				${article.isPremium ? "bg-secondary/20" : "bg-base-300"}`}
              data-aos="fade-up"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-50 object-cover object-top rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-base-content mb-2">
                {article.description.slice(0, 100)}
                ...
              </p>
              <div className="flex justify-between text-sm text-base-content mb-4">
                <span className="text-accent-content italic flex items-center gap-2">
                  <BiCategoryAlt /> {article.publisher}
                </span>
                <span className="flex items-center gap-2">
                  <LuCalendarDays />{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                {
                  <PrimaryButton
                    onClick={() => handleDetails(article._id)}
                    to={``}
                    className={!article.isPremium ? "" : "btn-disabled"}
                  >
                    Details
                  </PrimaryButton>
                }

                {article.isPremium && (
                  <span className="badge badge-warning">
                    Premium <FaCrown />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllArticle;
