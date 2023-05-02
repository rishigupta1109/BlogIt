import React, { useEffect, useState } from "react";
import { IBlog } from "../../../utils/interfaces";
import BlogItem from "../blogItem/BlogItem";
import styles from "./BlogList.module.scss";
import Modal from "../../Modal/Modal";
import Pagination from "../../ui/Pagination/Pagination";
type Props = {
  blogs: Array<IBlog>;
  isMyBlog?: boolean;
  setBlogs?: React.Dispatch<React.SetStateAction<IBlog[]>>;
};

export default function BlogList({ blogs, setBlogs, isMyBlog }: Props) {
  console.log(blogs);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<IBlog[]>([]);
  useEffect(() => {
    const endOffset = itemOffset + 6;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(blogs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(blogs.length / 6));
  }, [itemOffset]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * 6) % blogs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );

    setItemOffset(newOffset);
    const endOffset = newOffset + 6;
    setCurrentItems(blogs.slice(newOffset, endOffset));
  };
  return (
    <>
      <div className={styles.bloglist}>
        {currentItems &&
          currentItems.map((blog) => {
            return (
              <BlogItem
                setBlogs={setBlogs}
                key={blog._id}
                isMyBlog={isMyBlog}
                data={blog}
              />
            );
          })}
      </div>
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
      />
    </>
  );
}
