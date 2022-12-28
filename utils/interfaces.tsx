export interface IBlog {
  id: string;
  headline: string;
  body: Array<any>;
  tags: Array<string>;
  image: string;
  author: string;
  createdAt: Date;
  description: string;
}
