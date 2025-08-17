import { useQuery } from "@tanstack/react-query";
import { FaCrown, FaRegBookmark } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router";
import "aos/dist/aos.css";

const FeatureArticles = () => {
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredArticles"],
    queryFn: async () => {
      const res = await axiosInstance.get("/feature-articles");
      return res.data;
    },
  });

  console.log(articles);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-secondary">Error loading articles</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2
        className="text-4xl font-bold mb-6 text-center text-primary"
        data-aos="fade-down"
        data-aos-delay="100"
        data-aos-duration="700"
      >
        Featured Articles
      </h2>
      <p
        className="text-gray-500 mb-6 max-w-2xl mx-auto text-center"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
      >
        A quick spotlight on the latest reads from our publishers — one featured
        highlight with image, plus seven more fresh perspectives for you to
        explore.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article, index) =>
          index !== 1 ? (
            <div key={article._id} className={`p-4 border-b border-base-300`}>
              <div
                className=""
                data-aos="zoom-in-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                <Link to={`/article-details/${article._id}`}>
                  <h3 className="font-semibold text-lg line-clamp-2 hover:underline hover:text-secondary text-primary">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-400">
                    {article.publisher}
                  </span>
                  {article.isPremium ? (
                    <FaCrown className="text-warning" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={article._id}
              className={`p-2 lg:row-span-3 lg:col-span-2 `}
            >
              <div
                className="mt-10 space-y-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                <img src={article.imageUrl} alt="" />
                <Link to={`/article-details/${article._id}`}>
                  <h3 className="font-semibold text-lg line-clamp-2 hover:text-secondary hover:underline text-primary">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-400">
                    {article.publisher}
                  </span>
                  {article.isPremium ? (
                    <FaCrown className="text-warning" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};
export default FeatureArticles;
