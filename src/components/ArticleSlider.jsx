import React from "react";
import "react-awesome-slider/dist/styles.css";
import { Link, useNavigate } from "react-router";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";

const ArticleSlider = ({ articles }) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  //   const navigate = useNavigate();
  //   const handleReadMore = (id) => {
  //     navigate(`/article-details/${id}`, {
  //       state: { from: "allArticles" },
  //     });
  //   };
  return (
    <div className="relative w-full overflow-hidden mt-19">
      <AutoplaySlider
        className="h-80 md:h-100 lg:h-150"
        bullets={true}
        play={true}
        interval={5000}
      >
        {articles.map((article) => (
          <div
            key={article._id}
            className="relative h-full w-full"
            data-aos="fade-up"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover "
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 h-full flex items-end">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2">
                  <Link
                    to={`/article-details/${article._id}`}
                    state={{ from: "allArticles" }}
                    className="hover:underline"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-sm text-base-200">
                  {article.description.slice(0, 100)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </AutoplaySlider>
    </div>
  );
};

export default ArticleSlider;
