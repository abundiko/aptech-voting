import MainBody from "./components/MainBody";
import Navbar from "./components/Navbar";
import VoterSection from "./components/VoterSection";

export default function Home() {
  return (
    <main className="bg-light text-dark-text h-screen w-screen overflow-y-auto">
      <Navbar />
      <MainBody />
      <VoterSection />
    </main>
  );
}
