
const LogoCarousel = () => {
  // Array of logo details to make the component more dynamic
  const logos = [
    { src: "/assets/black-worker.jpg", alt: "Ford" },
    { src: "/assets/black-worker.jpg", alt: "Mercedes" },
    { src: "/assets/black-worker.jpg", alt: "Societe" },
    { src: "/assets/black-worker.jpg", alt: "Vodafone" },
    { src: "/assets/black-worker.jpg", alt: "Philips" },
  ];

  return (
    <div className="relative overflow-hidden bg-[#0a0c10] py-6">
      <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="animate-infinite-scroll flex">
          {/* First set of logos */}
          <img
            src="/assets/black-worker.jpg"
            alt="Ford"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="/assets/black-worker.jpg"
            alt="Mercedes"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="/assets/black-worker.jpg"
            alt="Societe"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="/assets/black-worker.jpg"
            alt="Vodafone"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="/assets/black-worker.jpg"
            alt="Philips"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          {logos.map((logo, index) => (
            <img
              key={`first-${index}`}
              src={logo.src}
              alt={logo.alt}
              className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
        <div className="animate-infinite-scroll flex" aria-hidden="true">
          {/* Duplicate set of logos */}
          <img
            src="/assets/black-worker.jpg"
            alt="Ford"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="/assets/black-worker.jpg"
            alt="Mercedes"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="/assets/black-worker.jpg"
            alt="Societe"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="/assets/black-worker.jpg"
            alt="Vodafone"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img
            src="/assets/black-worker.jpg"
            alt="Philips"
            className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          {logos.map((logo, index) => (
            <img
              key={`second-${index}`}
              src={logo.src}
              alt={logo.alt}
              className="mx-4 h-16 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
