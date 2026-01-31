// client/src/pages/BillingSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function BillingSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    async function confirm() {
      const sessionId =
        searchParams.get("session_id") ||
        searchParams.get("sessionId") ||
        searchParams.get("session");
      if (!sessionId) {
        setStatus("No session id provided.");
        return;
      }

      setStatus("Verifying purchase and signing you in...");

      try {
        const { data } = await API.post("/stripe/complete-checkout", {
          sessionId,
        });
        // Expected: { token, user }
        if (data?.token && data?.user) {
          localStorage.setItem("vl_token", data.token);
          localStorage.setItem("vl_user", JSON.stringify(data.user));
          setStatus("Payment confirmed — signing you in...");
          // small delay so user sees message
          setTimeout(() => navigate("/dashboard"), 800);
        } else {
          setStatus(
            "Payment verified but auto-login failed. Please log in manually.",
          );
        }
      } catch (err) {
        console.error("Complete checkout error", err);
        setStatus(
          err.response?.data?.message ||
            "Could not verify payment. Try logging in.",
        );
      }
    }

    confirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow max-w-lg text-center">
        <h2 className="text-lg font-semibold mb-3">
          Thank you for your purchase
        </h2>
        <p className="text-sm text-gray-600 mb-4">{status}</p>
        <div className="text-sm text-gray-500">
          If you are not redirected automatically,{" "}
          <a href="/login" className="text-blue-600">
            log in here
          </a>
          .
        </div>
      </div>
    </div>
  );
}
