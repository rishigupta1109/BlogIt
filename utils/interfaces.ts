export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role?: string;
  description?: string;
}

export interface Icomment {
  _id?: string;
  text: string;
  createdAt: Date;
  user: IUser;
  blogId: string;
}
export interface ILike {
  _id?: string;
  createdAt: Date;
  userId: string;
  blogId: string;
}
export interface IBlog {
  _id: string;
  title: string;
  tags: string;
  image: string | File;
  author: string;
  createdAt: Date;
  body: string;
  authorAvatar?: string;
  authorName: string;
  likes?: number;
  comments?: Array<Icomment>;
  views?: number;
}

export const defaultBlog: IBlog = {
  _id: "",
  title: "",
  tags: "",
  image: "",
  createdAt: new Date(),
  body: "",
  author: "",
  authorName: "",
};
