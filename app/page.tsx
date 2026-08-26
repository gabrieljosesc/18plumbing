import About from "@/components/About";
import CallBar from "@/components/CallBar";
import Contact from "@/components/Contact";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import Membership from "@/components/Membership";
import Reviews from "@/components/Reviews";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceArea from "@/components/ServiceArea";
import Services from "@/components/Services";
import TopBar from "@/components/TopBar";
import TeamTrust from "@/components/TeamTrust";
import TrustStrip from "@/components/TrustStrip";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const signedIn = Boolean(user);

  return (
    <>
      <TopBar />
      <Header signedIn={signedIn} />

      <main id="main">
        <span id="top" />
        <Hero />
        <TrustStrip />
        <Services />
        <About />
        <Gallery />
        <Membership signedIn={signedIn} />
        <Reviews />
        <TeamTrust />
        <Faq />
        <ServiceArea />
        <CtaBand />
        <Contact signedIn={signedIn} />
      </main>

      <Footer />
      <CallBar />
      <ScrollReveal />
    </>
  );
}
