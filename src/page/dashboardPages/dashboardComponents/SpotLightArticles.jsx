import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../api/axiosInstanceSecure";
import axiosInstance from "../../api/axiosInstance";

export default function SpotlightManager() {
	const axiosSecure = useAxiosInstanceSecure();
  const queryClient = useQueryClient();

  // Search state
  const [searchTitle, setSearchTitle] = useState("");
  const [publisher, setPublisher] = useState("");

  // Fetch spotlight bucket
  const { data: spotlightBucket } = useQuery({
    queryKey: ["spotlightBucket"],
    queryFn: async () => (await axiosSecure.get("/spotlight-bucket")).data,
  });

  // Search approved articles (only when search input changes)
  const { data: searchResults } = useQuery({
    queryKey: ["articleSearch", searchTitle, publisher],
    queryFn: async () => {
      const res = await axiosInstance.get("/articles/search", {
        params: { title: searchTitle, publisher, approved: true },
      });
      return res.data;
    },
    enabled: !!searchTitle || !!publisher, // only run when search/filter applied
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: (articleId) => axiosInstance.post("/spotlight-bucket/add", { articleId }),
    onSuccess: () => queryClient.invalidateQueries(["spotlightBucket"]),
  });

  const removeMutation = useMutation({
    mutationFn: (articleId) => axiosInstance.post("/spotlight-bucket/remove", { articleId }),
    onSuccess: () => queryClient.invalidateQueries(["spotlightBucket"]),
  });

  return (
    <div className="grid grid-cols-2 gap-8 p-6">
      {/* Spotlight Bucket */}
      <div>
        <h2 className="text-xl font-bold mb-4">Spotlight Bucket</h2>
        <div className="space-y-4">
          {spotlightBucket?.articles?.length ? (
            spotlightBucket.articles.map((article) => (
              <div key={article._id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img src={article.imageUrl} alt={article.title} className="w-20 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{article.title}</h3>
                  <p className="text-sm text-gray-500">{article.publisher}</p>
                </div>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => removeMutation.mutate(article._id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No spotlight articles yet.</p>
          )}
        </div>
      </div>

      {/* Search & Add to Spotlight */}
      <div>
        <h2 className="text-xl font-bold mb-4">Add Article to Spotlight</h2>

        {/* Search Filters */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <select
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Publishers</option>
            <option value="International">International</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            {/* 🔹 You can fetch publishers dynamically from API */}
          </select>
        </div>

        {/* Search Results */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {searchResults?.map((article) => (
            <div key={article._id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img src={article.imageUrl} alt={article.title} className="w-20 h-16 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.publisher}</p>
              </div>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => addMutation.mutate(article._id)}
              >
                Add
              </button>
            </div>
          ))}
          {!searchResults?.length && (searchTitle || publisher) && (
            <p className="text-gray-500">No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
