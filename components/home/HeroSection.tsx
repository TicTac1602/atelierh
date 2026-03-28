import HeroBackground from './HeroBackground';
import HeroText from './HeroText';
import HeroScrollIndicator from './HeroScrollIndicator';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16">
      <HeroBackground />
      <div className="relative z-10 w-full max-w-7xl mx-auto py-24 md:py-32">
        <HeroText />
      </div>
      <HeroScrollIndicator />
    </section>
  );
}
