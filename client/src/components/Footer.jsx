import { TopIcon } from "./Icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-main-border dark:border-dark-border bg-main-bg dark:bg-dark-bg mt-auto border-t px-6 py-8 transition-colors duration-300">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-0">
        {/* Empty div maintains 3-column grid alignment without visible content */}
        <div aria-hidden="true" />

        <div className="text-center">
          <p className="text-main-text-secondary dark:text-dark-text-tertiary text-xs font-bold tracking-widest uppercase">
            ©{" "}
            <a
              href="https://yannletertre.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-main-text-secondary hover:text-main-text dark:text-dark-text-tertiary dark:hover:text-dark-text-secondary cursor-pointer transition-colors"
            >
              Yann Letertre - {currentYear}
            </a>
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <button
            onClick={scrollToTop}
            className="text-main-text-secondary hover:text-main-text dark:text-dark-text-tertiary dark:hover:text-dark-text-secondary cursor-pointer text-base font-medium transition-colors"
          >
            <TopIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
