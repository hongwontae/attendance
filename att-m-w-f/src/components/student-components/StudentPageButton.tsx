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
    <div className="flex gap-2">
      {/* 이전 */}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        이전
      </button>

      {/* 그룹 이전 */}
      <button disabled={startPage === 1} onClick={() => setPage(startPage - 1)}>
        {"<<"}
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const pageNumber = startPage + i;

        return (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            style={{
              fontWeight: page === pageNumber ? "bold" : "normal",
            }}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* 그룹 다음 */}
      <button
        disabled={endPage === lastPage}
        onClick={() => setPage(endPage + 1)}
      >
        {">>"}
      </button>

      {/* 다음 */}
      <button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        다음
      </button>
    </div>
  );
}

export default StudentPageButton;
