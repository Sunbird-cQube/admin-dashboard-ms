import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Layout({ children }: any) {
  return (
    <div className="min-h-100">
      <Navbar />
      <main className="p-2"  style={{marginTop: '60px'}}>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
