import React from "react";

const FeaturePublisher = () => {
  const [publisher, setPublisher] = useState("BBC"); // default publisher
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, [publisher]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      // Example API - replace with your backend API
      const res = await fetch(
        `https://your-api.com/articles?publisher=${publisher}`
      );
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    setLoading(false);
  };

  return (
    <section className="py-8 px-4 md:px-10">
      {/* Header */}
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <FaNewspaper className="text-primary" /> Today's Feature Publisher
      </h2>

      {/* Horizontal Scrollable Publisher List */}
      {publishersLoading ? (
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {/* "All" option */}
          <button
            onClick={() => setPublisher("")}
            className={`px-4 py-2 rounded-full border transition whitespace-nowrap ${
              publisher === ""
                ? "bg-primary text-white border-primary"
                : "bg-base-200 hover:bg-base-300"
            }`}
          >
            All
          </button>

          {publishers.map((pub) => (
            <button
              key={pub.id}
              onClick={() => setPublisher(pub.name)}
              className={`px-4 py-2 rounded-full border transition whitespace-nowrap ${
                publisher === pub.name
                  ? "bg-primary text-white border-primary"
                  : "bg-base-200 hover:bg-base-300"
              }`}
            >
              {pub.name}
            </button>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {articlesLoading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : articlesError ? (
        <p className="text-center text-error">Error fetching articles</p>
      ) : articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
            >
              <figure>
                <img
                  src={article.image || "https://via.placeholder.com/400x200"}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{article.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {article.summary}
                </p>
                <div className="card-actions justify-end">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No articles found {publisher && `for ${publisher}`}.
        </p>
      )}
    </section>
  );
};

export default FeaturePublisher;
