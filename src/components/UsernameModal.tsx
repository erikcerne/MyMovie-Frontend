import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const UsernameModal = () => {
  const { needsUsername, setNeedsUsername, getAccessTokenSilently } = useAuth();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!needsUsername) return null;

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const token = await getAccessTokenSilently();
      await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      });
      setNeedsUsername(false);
    } catch (error) {
      console.error("Kunde inte registrera användarnamn:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[90%] max-w-sm rounded-2xl border border-white/10 bg-black/80 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <h2 className="text-xl font-black uppercase tracking-[-0.02em] text-white">
          The registration was successful
        </h2>
        <p className="mt-2 text-sm text-white/60">Choose your username</p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your username"
          className="mt-6 w-full rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-white placeholder:text-white/40 outline-none transition-colors duration-200 focus:border-primary/40"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || !name.trim()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>{isSubmitting ? "Saving..." : "Save"}</span>
        </button>
      </div>
    </div>
  );
};
