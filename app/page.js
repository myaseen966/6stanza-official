import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import SixS from "@/components/SixS";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Vision from "@/components/Vision";
import Trust from "@/components/Trust";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MotionController from "@/components/MotionController";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <SixS />
      <About />
      <Capabilities />
      <Process />
      <Vision />

      <Trust />

      <section className="section cta-section" id="start-project">
        <div className="eyebrow reveal" style={{ justifyContent: "center" }}>
          Let&apos;s Build It
        </div>
        <h2 className="reveal">
          Have an idea?
          <br />
          Have a problem?
        </h2>
        <p className="sub reveal">
          Tell us what you&apos;re trying to solve. We&apos;ll come back with the right approach —
          not a sales pitch.
        </p>
        <ContactForm />
      </section>

      <Footer />
      <WhatsAppFloat />
      <MotionController />
    </>
  );
}
