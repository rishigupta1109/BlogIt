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
