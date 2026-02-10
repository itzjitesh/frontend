import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://valuelens-z0dm.onrender.com/api";

const API = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  // baseURL: import.meta.env.VITE_API_URL || "/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("vl_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export async function login(email, password) {
  return API.post("/auth/login", { email, password });
}
export async function signup(email, password) {
  return API.post("/auth/signup", { email, password });
}

// Calculators
export async function runCampaignROI(inputs) {
  return API.post("/calculators/campaign-roi", inputs);
}

// Scenarios (saving)
export async function saveScenario(payload) {
  return API.post("/scenarios", payload);
}
export async function listScenarios() {
  return API.get("/scenarios");
}

// Stripe
// export async function createCheckoutSession(body) {
//   return API.post("/stripe/create-checkout-session", body);
// }

export const createCheckoutSession = (data) =>
  axios.post("/api/stripe/create-checkout-session", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Helpers

export const getCalculatorsList = () =>
  Promise.resolve({
    data: [
      {
        id: "campaign-roi",
        title: "campaign ROI",
        desc: "Estimate ROI, CPA and revenue",
      },
      { id: "cpa", title: "CPA Calculator", desc: "Cost per acquisition" },
    ],
  });

export const runCPA = (payload) => API.post("/calculators/cpa", payload);

export const getScenarios = () => API.get(`/scenarios`);
export const deleteScenario = (id) => API.delete(`/scenarios/${id}`);

export default API;
