import { useState } from "react";

type ReviewFormModalProps = {
  onClose: () => void;
  onSubmit: (content: string, rating: number) => void;
  isSubmitting: boolean;
};

export function ReviewFormModal({
  onClose,
  onSubmit,
  isSubmitting,
}: ReviewFormModalProps) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-2xl border border-white/10 bg-black/80 p-8 backdrop-blur-md">
        <h2 className="text-xl font-black uppercase tracking-[-0.02em] text-white">
          Write a review
        </h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you think of the movie?"
          rows={4}
          className="mt-6 w-full resize-none rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/40 outline-none focus:border-primary/40"
        />

        <label className="mt-4 block text-sm text-white/60">
          Rating: {rating}/10
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full accent-primary"
        />

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-white/70 hover:bg-white/10 active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(content, rating)}
            disabled={isSubmitting || !content.trim()}
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white hover:border-primary/40 hover:bg-white/15 active:scale-[0.98] disabled:opacity-40"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
