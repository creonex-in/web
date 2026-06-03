import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SmoothScrollProvider from "@/components/shared/smooth-scroll-provider";

export default function MarketingShell({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <SmoothScrollProvider>
      <Navbar />
      {children}
      <Footer />
    </SmoothScrollProvider>
  );
}
