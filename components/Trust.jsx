const items = [
  { title: "Understanding", desc: "We understand the client and project before acting." },
  { title: "Honesty", desc: "We don't make promises we can't keep." },
  { title: "Quality", desc: "We never intentionally deliver low-quality work." },
  { title: "Reliability", desc: "We take every commitment seriously." },
];

export default function Trust() {
  return (
    <section className="section">
      <div className="eyebrow reveal">Why Trust 6STANZA</div>
      <h2 className="reveal" style={{ fontSize: "clamp(28px,3.6vw,44px)" }}>
        What we should be known for
      </h2>
      <div className="trust-grid">
        {items.map((it) => (
          <div className="trust-item reveal" key={it.title}>
            <h4>{it.title}</h4>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
      <div className="promise-box reveal">
        <p>
          &ldquo;6STANZA is the company you can trust to understand your needs, provide the best
          solution, and deliver quality work honestly and on time.&rdquo;
        </p>
      </div>
    </section>
  );
}
