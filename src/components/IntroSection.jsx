import Image from 'next/image';
import Link from 'next/link';

const IntroSection = ({ currentTheme }) => {

  return (
    <section
      className="flex items-center justify-center h-screen transition-all duration-500 ease-in-out"
      style={{ backgroundColor: currentTheme.colors.background || '#fff' }}
      aria-label="Introduction to 24XDEV Web Solutions"
      role="banner"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center px-16">

        <div
          className="md:w-1/2 text-center md:text-left order-last md:order-first mb-8"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4`}
            style={{ color: currentTheme.colors.text || '#000' }}
          >
            Welcome to <span style={{ color: currentTheme.colors.accent || '#FF0000' }}>24XDEV</span> - Your Trusted Partner in Web Solutions
            <br />
            Elevate Your <span style={{ color: currentTheme.colors.accent || '#FF0000' }}>Digital Presence</span>
          </h1>
          <p
            className="text-lg mb-6"
            style={{ color: currentTheme.colors.text || '#000' }}
          >
            At 24XDEV, we provide tailored web solutions that encompass development, design, hosting, deployment, and maintenance—empowering your digital excellence.
          </p>
          <div>
            <Link
              href="/gettingstarted"
              className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
              aria-label="Get started with 24XDEV's web solutions"
            >
              Get Started with 24XDEV
            </Link>
          </div>
        </div>

        <div
          className="md:w-1/2 order-first md:order-last flex justify-center transition-transform duration-500"
        >
          <Image
            src="/img/intro-img.svg"
            alt="Illustration showcasing comprehensive web solutions provided by 24XDEV"
            className="w-full h-auto max-w-md transition-transform duration-500 transform hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
