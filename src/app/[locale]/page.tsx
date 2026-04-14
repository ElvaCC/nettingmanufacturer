// 首页 - 仅框架，无内容填充
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Products from "@/components/home/Products";
import Applications from "@/components/home/Applications";
import Factory from "@/components/home/Factory";
import Blog from "@/components/home/Blog";
import Contact from "@/components/home/Contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Products />
      <Applications />
      <Factory />
      <Blog />
      <Contact />
    </main>
  );
}
