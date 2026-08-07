import { AiSearch } from '@/components/AiSearch';

export const metadata = { title: 'AI Search — Loomlore' };

export default function SearchPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-32 bg-[#fff5f7] text-[#2b0914]">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="label-eyebrow font-sans text-xs">AI Natural Language Search</p>
        <h1 className="display-h mt-2 text-4xl text-[#831843] sm:text-5xl">Tell Us What You Are Looking For.</h1>
        <p className="mt-3 text-sm text-[#4c0519]/75 font-sans leading-relaxed">
          Search by color, occasion, budget, fabric or Indian state.
        </p>
      </div>

      <AiSearch />
    </div>
  );
}
