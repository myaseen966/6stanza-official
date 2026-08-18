const stages = [
  { tag: "STAGE 1 — PAKISTAN", title: "Build locally.", desc: "Build a trusted technology business with a strong reputation, team and client relationships." },
  { tag: "STAGE 2 — SAUDI ARABIA & UAE", title: "Earn trust regionally.", desc: "Expand into Saudi Arabia and the UAE, then gradually into other international markets." },
  { tag: "STAGE 3 — GLOBAL", title: "Expand globally.", desc: "Grow from selected IT solutions into comprehensive technology, with proprietary products." },
];

export default function Vision() {
  return (
    <div className="vision-pin-wrap" id="vision">
      <div className="vision-inner">
        {stages.map((s, i) => (
          <div
            className={"vision-stage" + (i === 0 ? " stage-init" : "")}
            data-stage={i}
            key={s.tag}
          >
            <div className="v-tag">{s.tag}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
        <div className="vision-dots">
          {stages.map((_, i) => (
            <div
              className={"vision-dot" + (i === 0 ? " active" : "")}
              data-dot={i}
              key={i}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
