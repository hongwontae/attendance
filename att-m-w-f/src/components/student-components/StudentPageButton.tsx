import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type Props = {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
};

function StudentPageButton({ page, lastPage, setPage }: Props) {
  const pageGroupSize = 5;

  const currentGroup = Math.ceil(page / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, lastPage);

  return (
    <div className="flex items-center gap-2 mt-6">
      {/* 그룹 이전 */}
      <button
        disabled={startPage === 1}
        onClick={() => setPage(startPage - 1)}
        className="p-2 rounded-full border border-gray-600 hover:bg-gray-700 disabled:opacity-30 transition"
      >
        <ChevronsLeft size={18} />
      </button>

      {/* 이전 */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="p-2 rounded-full border border-gray-600 hover:bg-gray-700 disabled:opacity-30 transition"
      >
        <ChevronLeft size={18} />
      </button>

      {/* 페이지 번호 */}
      <div className="flex items-center gap-1 px-2">
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNumber = startPage + i;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-9 h-9 rounded-full text-sm transition
                ${
                  page === pageNumber
                    ? "bg-white text-black font-bold scale-105"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* 다음 */}
      <button
        disabled={page === lastPage}
        onClick={() => setPage(page + 1)}
        className="p-2 rounded-full border border-gray-600 hover:bg-gray-700 disabled:opacity-30 transition"
      >
        <ChevronRight size={18} />
      </button>

      {/* 그룹 다음 */}
      <button
        disabled={endPage === lastPage}
        onClick={() => setPage(endPage + 1)}
        className="p-2 rounded-full border border-gray-600 hover:bg-gray-700 disabled:opacity-30 transition"
      >
        <ChevronsRight size={18} />
      </button>
    </div>
  );
}

export default StudentPageButton;