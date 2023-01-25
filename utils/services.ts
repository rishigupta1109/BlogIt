import { server } from "./config";

export const signup = async (name: string, email: string, password: string) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  data.status = response.status;
  return data;
};

export const createBlog = async (formData: FormData) => {
  const response = await fetch("/api/blog/create", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  data.status = response.status;
  return data;
};
export const updateBlog = async (
  formData: FormData,
  id: string,
  saveLocally: boolean
) => {
  const response = await fetch(`/api/blog/${id}?saveLocally=${saveLocally}`, {
    method: "PUT",
    body: formData,
  });
  const data = await response.json();
  data.status = response.status;
  return data;
};
export const deleteBlog = async (id: string) => {
  const response = await fetch(`/api/blog/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  data.status = response.status;
  return data;
};
export const updateUserDetailsWithImage = async (
  formData: FormData,
  session: any
) => {
  const response = await fetch("/api/auth/update-details", {
    method: "PUT",
    body: formData,
  });
  const data = await response.json();
  data.status = response.status;
  return data;
};
export const updateUserDetailsWithoutImage = async (
  formData: FormData,
  session: any
) => {
  const response = await fetch("/api/auth/update-details", {
    method: "PATCH",
    body: formData,
  });
  const data = await response.json();
  data.status = response.status;
  return data;
};
export const getUserData = async (id: string) => {
  const response = await fetch(`/api/user/${id}`);
  const data = await response.json();
  data.status = response.status;
  return data;
};
export const getBlogDetails = async (id: string | string[]) => {
  console.log(id);
  const response = await fetch(`${server}/api/blog/${id}`);
  const data = await response.json();
  data.status = response.status;
  return data;
};
export const deleteLike = async (userId: string, blogId: string) => {
  const response = await fetch(`/api/blog/${blogId}/like?userId=${userId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  data.status = response.status;
  return data;
};
export const addLike = async (userId: string, blogId: string) => {
  const response = await fetch(`/api/blog/${blogId}/like`, {
    method: "POST",
    body: JSON.stringify({ userId, blogId }),
  });
  const data = await response.json();
  data.status = response.status;
  return data;
};
export const addComment = async (
  userId: string,
  blogId: string,
  text: string
) => {
  const response = await fetch(`/api/blog/${blogId}/comment`, {
    method: "POST",
    body: JSON.stringify({ userId, blogId, text }),
  });
  const data = await response.json();
  data.status = response.status;
  return data;
};
