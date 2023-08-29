import Footer from "@/components/footer";
import HomePage from "@/components/homePage";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
