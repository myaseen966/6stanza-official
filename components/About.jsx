const steps = [
  { n: "01", title: "Listen", desc: "Discuss the problem, without assuming." },
  { n: "02", title: "Understand", desc: "Clarify the real requirements before proposing anything." },
  { n: "03", title: "Advise", desc: "Recommend the right approach, and agree on it together." },
  { n: "04", title: "Solve", desc: "Build it, and deliver on the agreed timeframe." },
  { n: "05", title: "Add Value", desc: "Offer additional value wherever reasonably possible." },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="about">
        <div>
          <div className="eyebrow reveal">About 6STANZA</div>
          <h2 className="reveal">
            We don&apos;t start by asking
            <br />
            &ldquo;what can we sell?&rdquo;
          </h2>
          <p className="reveal">
            We start by asking what problem we&apos;re actually solving. Six principles form the
            foundation of how we think, build, protect, grow and deliver — for startups,
            schools, businesses and organizations turning an idea into something real.
          </p>
        </div>
        <div className="philosophy-steps reveal">
          {steps.map((s) => (
            <div className="philosophy-step" key={s.n}>
              <div className="p-num">{s.n}</div>
              <div>
                <div className="p-title">{s.title}</div>
                <div className="p-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
