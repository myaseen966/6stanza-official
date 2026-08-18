const groups = [
  { title: "Technology", items: ["Web & software development", "SaaS development", "DevOps & cloud computing", "Cybersecurity & networking", "IT solutions"] },
  { title: "Growth", items: ["Digital marketing", "SEO", "Advertising"] },
  { title: "Creative", items: ["Video editing", "Digital content", "Other creative technology solutions"] },
];

export default function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="eyebrow reveal">What We Do</div>
      <h2 className="reveal" style={{ fontSize: "clamp(28px,3.6vw,44px)" }}>
        Capabilities, grouped by outcome
      </h2>
      <div className="cap-grid">
        {groups.map((g) => (
          <div className="cap-card reveal" key={g.title}>
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
