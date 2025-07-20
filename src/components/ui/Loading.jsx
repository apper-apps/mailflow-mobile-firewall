const Loading = ({ type = "skeleton" }) => {
  if (type === "skeleton") {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded-lg w-48 shimmer"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-32 shimmer"></div>
        </div>
        
        {/* Metrics skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2 shimmer"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mb-2 shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-lg shimmer"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Table skeleton */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-32 shimmer"></div>
          </div>
          <div className="divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-6 flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded w-32 shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-24 shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );
};

export default Loading;