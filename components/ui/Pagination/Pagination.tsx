import clsx from "clsx";
import styles from "./Pagination.module.scss";
const Pagination = ({
  pageCount,
  handlePageClick,
  currentPage,
}: {
  pageCount: number;
  handlePageClick: (event: any) => void;
  currentPage: number;
}) => {
  console.log("Pagination.tsx: pageCount: ", currentPage, pageCount);
  return (
    <div className={styles.pagination}>
      {
        <span
          onClick={() => handlePageClick({ selected: currentPage - 1 })}
          className={
            currentPage === 0
              ? clsx(styles.navbtn, styles.disabled)
              : styles.navbtn
          }
        >
          Prev
        </span>
      }
      {pageCount + 1 >= 1 &&
        Array.from(Array(pageCount).keys()).map((item, index) => {
          return (
            <span
              key={index}
              className={
                index === currentPage
                  ? clsx(styles.active, styles.pagebtn)
                  : styles.pagebtn
              }
              onClick={() => handlePageClick({ selected: index })}
            >
              {index + 1}
            </span>
          );
        })}
      <span
        onClick={() => handlePageClick({ selected: currentPage + 1 })}
        className={
          currentPage === pageCount - 1
            ? clsx(styles.navbtn, styles.disabled)
            : styles.navbtn
        }
      >
        Next
      </span>
    </div>
  );
};

export default Pagination;
