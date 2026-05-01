export const BlogSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-4"></div>
      <div className="flex items-center justify-between mt-6">
        <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-24"></div>
      </div>
    </div>
  );
};
