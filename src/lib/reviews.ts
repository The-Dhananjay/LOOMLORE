import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CustomerReview = {
  id: string;
  productId: string;
  reviewerName: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  createdAt: string;
  isVerified: boolean;
};

type ReviewState = {
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'createdAt' | 'isVerified'>) => CustomerReview;
  getReviewsForProduct: (productId: string) => CustomerReview[];
  getProductRatingStats: (productId: string, initialRating: number, initialCount: number) => {
    avgRating: number;
    totalCount: number;
  };
};

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    productId: 'raj-w-01', // Bandhani Saree
    reviewerName: 'Ananya Deshmukh',
    rating: 5,
    title: 'Exquisite handloom quality and vibrant colors!',
    comment: 'The bandhani dots are hand-tied so intricately. The silk feel is incredibly soft and heavy. Wore it for my cousin’s sangeet and received endless compliments.',
    createdAt: '12 May 2026',
    isVerified: true
  },
  {
    id: 'rev-02',
    productId: 'raj-w-01',
    reviewerName: 'Meera Singhania',
    rating: 5,
    title: 'Pure Rajasthani weave!',
    comment: 'Directly dispatched with weaving certificate. Fast shipping to Mumbai in 3 days.',
    createdAt: '28 April 2026',
    isVerified: true
  },
  {
    id: 'rev-03',
    productId: 'tn-w-01', // Kanjeevaram Saree
    reviewerName: 'Lakshmi Narayanan',
    rating: 5,
    title: 'Authentic Korvai border with real zari!',
    comment: 'The weight of the mulberry silk and contrast korvai border is divine. Authentic Kanchipuram craftsmanship.',
    createdAt: '04 June 2026',
    isVerified: true
  },
  {
    id: 'rev-04',
    productId: 'up-m-01', // Chikankari Kurta
    reviewerName: 'Vikramaditya Roy',
    rating: 5,
    title: 'Subtle Lucknawi shadow work',
    comment: 'Great fit and breathable cotton. The bakhiya chikankari threadwork is remarkably fine.',
    createdAt: '18 May 2026',
    isVerified: true
  }
];

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: INITIAL_REVIEWS,

      addReview: (data) => {
        const newReview: CustomerReview = {
          ...data,
          id: `rev-${Date.now()}`,
          createdAt: new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          isVerified: true
        };

        set((state) => ({
          reviews: [newReview, ...state.reviews]
        }));

        return newReview;
      },

      getReviewsForProduct: (productId) => {
        return get().reviews.filter((r) => r.productId === productId);
      },

      getProductRatingStats: (productId, initialRating, initialCount) => {
        const prodReviews = get().reviews.filter((r) => r.productId === productId);
        if (prodReviews.length === 0) {
          return { avgRating: initialRating, totalCount: initialCount };
        }

        const sumNew = prodReviews.reduce((acc, r) => acc + r.rating, 0);
        const totalCount = initialCount + prodReviews.length;
        const totalSum = initialRating * initialCount + sumNew;
        const avgRating = Math.round((totalSum / totalCount) * 10) / 10;

        return { avgRating, totalCount };
      }
    }),
    {
      name: 'loomlore-reviews-storage'
    }
  )
);
