export const metadata = { title: 'Address Formats — Loomlore' };

export default function AddressPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-32 bg-[#fff5f7] text-[#2b0914] font-sans">
      <header className="max-w-2xl">
        <p className="label-eyebrow font-sans text-xs">Indian Address Delivery</p>
        <h1 className="display-h mt-3 text-5xl text-[#831843]">Delivering To Every PIN Code.</h1>
        <p className="mt-4 text-base text-[#4c0519]/75">
          We ship to all 28 states and union territories across India using verified courier networks.
        </p>
      </header>

      <div className="royal-card mt-10 p-8 font-sans">
        <h2 className="display-h text-2xl text-[#831843]">Sample Address Format</h2>
        <address className="mt-4 not-italic text-base leading-relaxed text-[#4c0519]">
          <strong>Priya Sharma</strong><br />
          H.No. 14, Lane 6, Near Bank of India<br />
          Lanka, Varanasi<br />
          District: Varanasi<br />
          Uttar Pradesh — 221005<br />
          India
        </address>
      </div>
    </div>
  );
}
