import axios from "axios";

// Public population analytics — no auth required.
export const getPopulationInsights = async () => {
  try {
    const response = await axios.get("/insights/population");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Personalised positioning for the signed-in shopper.
export const getMyInsights = async (token) => {
  try {
    const response = await axios.get("/insights/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
