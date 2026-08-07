export const metadata = { title: 'The Journal — Loomlore' };

export default function JournalPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-32 bg-[#fff5f7] text-[#2b0914] font-sans">
      <header className="max-w-2xl">
        <p className="label-eyebrow font-sans text-xs">Stories From The Loom</p>
        <h1 className="display-h mt-3 text-5xl text-[#831843] sm:text-6xl">The Journal.</h1>
      </header>

      <article className="mt-10 space-y-6 text-base leading-relaxed text-[#4c0519]/85 rounded-3xl border border-rose-200 bg-white p-8 md:p-12 shadow-sm font-sans">
        <p className="text-lg leading-relaxed text-[#831843] font-medium">
          Cloth is one of the oldest languages in India. A motif on a Banarasi saree is a letter; a stitch on a phulkari is a sentence; a tie on a bandhani is a wish.
        </p>
        <p>
          Loomlore visits every atelier in person. We sit with the weavers. We watch the pit looms. We translate what they tell us — into our catalog notes, craft certificates, and stories tucked into every heirloom delivery box.
        </p>
        <p>
          This journal is where we document the living heritage of Indian handlooms, weaver co-operatives, GI-tagged crafts, and royal textile histories.
        </p>
      </article>
    </div>
  );
}
