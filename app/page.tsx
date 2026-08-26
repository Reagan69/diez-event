import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact"
import Footer from"@/components/Footer"
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Menu,
} from "lucide-react";
import Portfolio from "@/components/Portfolio";

const portfolio = [
  {
    title: "Wedding Stories",
    category: "Mariage",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Golden Moments",
    category: "Événement",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Portrait",
    category: "Shooting",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop",
  },
];

const services = [
  {
    number: "01",
    title: "Photographie événementielle",
    description:
      "Nous immortalisons vos événements avec une approche naturelle, élégante et authentique.",
  },
  {
    number: "02",
    title: "Mariage",
    description:
      "Des images intemporelles qui racontent chaque émotion et chaque moment de votre journée.",
  },
  {
    number: "03",
    title: "Portrait & Corporate",
    description:
      "Des portraits professionnels et personnels qui mettent en valeur votre identité.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white"> 
    <Navbar />
    <Hero />
    <Portfolio />
    <Services />
    <About />
    <Contact />
    <Footer />
    </main>
  );
}