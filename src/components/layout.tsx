import Footer from "@/components/footer";
import HomePage from "@/components/homePage";
import Navbar from "@/components/navbar";

export default function Layout({ children }: any) {
  return (
    <div className="min-h-100">
      <Navbar />
      <main className="py-5 px-2" style={{marginTop: '60px'}}>{children}</main>
      <Footer />
    </div>
  );
}
