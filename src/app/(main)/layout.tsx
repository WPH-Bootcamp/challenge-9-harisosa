import { Footer } from "@/features/layout/Footer";
import Navbar from "@/features/layout/Navbar";


export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
