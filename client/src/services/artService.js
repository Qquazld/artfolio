import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor automatically attaches JWT token from localStorage to every request for protected routes (create, update, delete)
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getAllArtworks = async () => {
  const response = await api.get("/");
  return response.data;
};

export const createArtwork = async (artworkData) => {
  const response = await api.post("/", artworkData);
  return response.data;
};

export const deleteArtwork = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const updateArtwork = async (id, updateData) => {
  const response = await api.patch(`/${id}`, updateData);
  return response.data;
};

export const getSingleArtwork = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};
