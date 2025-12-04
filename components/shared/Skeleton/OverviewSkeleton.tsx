export default function OverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-48 bg-gray-200 rounded"></div>
        <div className="h-10 w-60 bg-gray-200 rounded"></div>
      </div>

      {/* Attendance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-100 flex gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
              <div className="h-5 w-14 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-lg bg-gray-100 space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded"></div>
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Graph skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="h-5 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-40 w-full bg-gray-100 rounded"></div>
        </div>

        <div className="bg-white border rounded-lg shadow p-4">
          <div className="h-5 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-40 w-full bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}
