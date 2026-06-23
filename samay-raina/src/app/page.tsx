import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Shows from "@/components/sections/Shows";
import ChessStory from "@/components/sections/ChessStory";
import QuoteWall from "@/components/sections/QuoteWall";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Shows />
      <ChessStory />
      <QuoteWall />
    </main>
  );
}
