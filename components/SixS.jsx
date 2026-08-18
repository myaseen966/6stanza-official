const items = [
  { n: "01", name: "Strategy", line: "Understand first. Solve right.", desc: "We understand requirements, problems and goals before deciding what to build." },
  { n: "02", name: "Software", line: "Turn ideas into digital products.", desc: "Websites, web applications, SaaS products and custom software, built to spec." },
  { n: "03", name: "Systems", line: "Make technology work together.", desc: "Web, DevOps, cloud, cybersecurity and networking combined into one connected solution." },
  { n: "04", name: "Security", line: "Protect what matters.", desc: "Data, applications and infrastructure protected from day one, not bolted on later." },
  { n: "05", name: "Scalability", line: "Built to grow with you.", desc: "Solutions designed to evolve with new features, users and requirements." },
  { n: "06", name: "Speed", line: "Delivered on time.", desc: "We respect client time and deliver within the agreed timeframe, without cutting quality." },
];

export default function SixS() {
  return (
    <div className="six-pin-wrap" id="six-s">
      <div className="six-track" id="sixTrack">
        {items.map((it, i) => (
          <div
            className="six-panel"
            key={it.n}
            style={i === items.length - 1 ? { borderRight: "none" } : undefined}
          >
            <div className="six-bignum">{it.n}</div>
            <div className="six-eyebrow">
              The Foundation — {it.n} / 06
            </div>
            <h2 className="six-name">{it.name}</h2>
            <div className="six-line">{it.line}</div>
            <p className="six-desc">{it.desc}</p>
          </div>
        ))}
      </div>
      <div className="six-progress">
        <div className="six-progress-bar" id="sixProgressBar"></div>
      </div>
    </div>
  );
}
