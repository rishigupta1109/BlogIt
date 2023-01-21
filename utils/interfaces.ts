export interface IBlog {
  id: string;
  title: string;
  tags: string;
  image: string | File;
  author: string;
  createdAt: Date;
  body: string;
  authorAvatar?: string;
  authorName: string;
}

export const defaultBlog: IBlog = {
  id: "",
  title: "",
  tags: "",
  image: "",
  createdAt: new Date(),
  body: "",
  author: "",
  authorName: "",
};
