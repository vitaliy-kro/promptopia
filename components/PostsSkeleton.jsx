export const PostsSkeleton = () => {
  return (
    <div role="status" className="mt-16 prompt_layout">
      <div className="border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-700 mr-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div className="flex flex-col">
              <div className="w-20 h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3"></div>
            </div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className=" h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3 w-full"></div>
        <div className=" h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3 w-5/6"></div>
        <div className="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-4"></div>
      </div>
      <div className="border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-700 mr-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div className="flex flex-col">
              <div className="w-20 h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3"></div>
            </div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className=" h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3 w-full"></div>
        <div className=" h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3  w-5/6"></div>
        <div className="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-4"></div>
      </div>
      <div className="border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-700 mr-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div className="flex flex-col">
              <div className="w-20 h-3 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3"></div>
            </div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className=" h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3  w-full"></div>
        <div className=" h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3 w-5/6"></div>
        <div className="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-4"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// card - w-full p-4 h-fit border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700
// layout - mt-16 space-y-6 py-8 w-full sm:columns-2 sm:gap-6 xl:columns-3
