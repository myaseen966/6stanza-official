const steps = [
  { n: "01", name: "Discover", sub: "Understand the real problem." },
  { n: "02", name: "Strategize", sub: "Decide the right approach." },
  { n: "03", name: "Build", sub: "Develop the solution." },
  { n: "04", name: "Secure", sub: "Protect data and systems." },
  { n: "05", name: "Scale", sub: "Prepare it to grow." },
  { n: "06", name: "Deliver", sub: "On time, as agreed." },
];

export default function Process() {
  return (
    <div className="process-pin-wrap" id="process">
      <div className="process-inner">
        <div className="eyebrow">How We Work</div>
        <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)" }}>One process, every project</h2>
        <div className="process-row" id="processRow">
          <div className="process-fill" id="processFill"></div>
          {steps.map((s) => (
            <div className="process-step" key={s.n}>
              <div className="p-order">{s.n}</div>
              <div className="p-name">{s.name}</div>
              <div className="p-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
