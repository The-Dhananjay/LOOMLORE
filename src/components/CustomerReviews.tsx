'use client';

import { useEffect, useState } from 'react';
import { useReviewStore } from '@/lib/reviews';
import { useAuthStore } from '@/lib/auth';

type Props = {
  productId: string;
  productName: string;
  initialRating: number;
  initialReviewCount: number;
};

export function CustomerReviews({ productId, productName, initialRating, initialReviewCount }: Props) {
  const [mounted, setMounted] = useState(false);
  const { reviews, addReview, getReviewsForProduct, getProductRatingStats } = useReviewStore();
  const { user } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const productReviews = mounted ? getReviewsForProduct(productId) : [];
  const stats = mounted
    ? getProductRatingStats(productId, initialRating, initialReviewCount)
    : { avgRating: initialRating, totalCount: initialReviewCount };

  // Form state
  const [rating, setRating] = useState<number>(5);
  const [reviewerName, setReviewerName] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mounted && user?.name) {
      setReviewerName(user.name);
    }
  }, [mounted, user]);

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!reviewerName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!title.trim()) {
      setError('Please provide a review headline title.');
      return;
    }
    if (!comment.trim()) {
      setError('Please write your review comment.');
      return;
    }

    addReview({
      productId,
      reviewerName,
      rating,
      title,
      comment
    });

    setSubmitted(true);
    setTitle('');
    setComment('');
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section className="mt-20 border-t border-[#33272a]/15 pt-12 font-sans text-[#33272a]">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#33272a]/15 pb-6">
        <div>
          <span className="label-eyebrow text-xs">Verified Artisan Ratings</span>
          <h2 className="display-h mt-2 text-4xl text-[#33272a]">Customer Reviews ({stats.totalCount})</h2>
          <p className="mt-1 text-xs text-[#594a4e]">Authentic feedback from verified handloom collectors.</p>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#33272a]/15 bg-[#fffffe] px-6 py-3 shadow-xs">
          <div className="text-center">
            <span className="display-h text-3xl font-bold text-[#33272a]">{stats.avgRating.toFixed(1)}</span>
            <span className="text-xs text-[#594a4e]"> / 5</span>
          </div>
          <div className="border-l border-[#33272a]/15 pl-4">
            <div className="flex gap-1 text-amber-500 text-sm">
              {'★'.repeat(Math.floor(stats.avgRating))}{'☆'.repeat(5 - Math.floor(stats.avgRating))}
            </div>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[#594a4e] font-semibold">
              Based on {stats.totalCount} ratings
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr,1.2fr]">
        {/* LEFT COLUMN: Add Customer Review Form */}
        <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-7 shadow-xs">
          <h3 className="display-h text-2xl text-[#33272a]">Write a Review for {productName}</h3>
          <p className="mt-1 text-xs text-[#594a4e]">Share your experience with this handwoven heirloom.</p>

          {!user?.purchasedProductIds?.includes(productId) ? (
            <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-center text-amber-900">
              <div className="text-2xl mb-1">🔒</div>
              <h4 className="font-bold text-sm">Verified Purchaser Review Only</h4>
              <p className="mt-1.5 text-xs text-amber-800 leading-relaxed">
                To maintain authentic handloom ratings, only buyers who have purchased this garment can submit a customer review.
              </p>
              <p className="mt-3 text-[11px] font-semibold text-[#33272a]">
                Purchase this product to unlock verified review posting!
              </p>
            </div>
          ) : (
            <>
              {submitted && (
                <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-300 p-4 text-xs font-semibold text-emerald-800 text-center">
                  Thank you! Your review and rating have been added.
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-2xl bg-rose-50 border border-rose-300 p-3 text-xs font-semibold text-rose-800 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
                {/* Interactive Star Rating Selector */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold mb-1.5">
                    Your Rating (Click Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-2xl transition hover:scale-110 focus:outline-none"
                      >
                        <span className={star <= rating ? 'text-amber-500' : 'text-zinc-300'}>★</span>
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#33272a]">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Sunita Sharma"
                    className="w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-xs text-[#33272a] outline-none focus:border-[#ff8ba7]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold mb-1">
                    Review Title / Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Stunning silk texture & authentic weave!"
                    className="w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-xs text-[#33272a] outline-none focus:border-[#ff8ba7]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold mb-1">
                    Your Written Review Comment
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the fabric quality, stitching, weaving detail, and delivery experience..."
                    className="w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-xs text-[#33272a] outline-none focus:border-[#ff8ba7]"
                    required
                  />
                </div>

                <button type="submit" className="wax-button w-full py-3 text-xs">
                  Submit Rating &amp; Review →
                </button>
              </form>
            </>
          )}
        </div>

        {/* RIGHT COLUMN: Customer Reviews List */}
        <div className="space-y-4">
          {productReviews.length > 0 ? (
            productReviews.map((rev) => (
              <div key={rev.id} className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#33272a]/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#33272a] text-sm">{rev.reviewerName}</span>
                      {rev.isVerified && (
                        <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[8px] uppercase tracking-wider text-emerald-800 font-bold">
                          Verified Buyer ✓
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#594a4e] mt-0.5">{rev.createdAt}</p>
                  </div>
                  <div className="text-amber-500 text-sm">
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>

                <h4 className="display-h mt-3 text-lg text-[#33272a]">{rev.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#594a4e]">{rev.comment}</p>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 text-center">
              <p className="display-h text-2xl text-[#33272a]">Be the first to review this garment!</p>
              <p className="mt-1 text-xs text-[#594a4e]">Use the form on the left to submit your rating &amp; feedback.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
