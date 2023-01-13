export interface IBlog {
  id: string;
  title: string;
  tags: string;
  image: string;
  author: string;
  createdAt: Date;
  body: string;
}

export const defaultBlog: IBlog = {
  id: "",
  title: "",
  tags: "",
  image: "",
  createdAt: new Date(),
  body: "",
  author: "",
};
