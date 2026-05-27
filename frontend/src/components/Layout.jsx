import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children, hero }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      {hero}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
