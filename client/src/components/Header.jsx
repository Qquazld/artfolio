import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { LoupeIcon, SunIcon, MoonIcon } from "./Icons";

const Header = ({
  onAddClick,
  searchTerm,
  setSearchTerm,
  onLoginClick,
  onMenuOpen,
  isMenuOpen,
}) => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    // backdrop-blur creates a stacking context so MobileMenu is rendered in App to escape it
    <header className="bg-main-bg/80 dark:bg-dark-bg/80 border-main-border dark:border-dark-border sticky top-0 z-50 border-b backdrop-blur-sm transition-colors duration-300">
      <nav className="mx-auto grid h-20 max-w-7xl grid-cols-3 items-center px-4">
        {/* COL-1 LOGO */}
        <div
          className="group flex cursor-pointer items-center gap-2 justify-self-start lg:gap-4"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="bg-main-logo dark:bg-dark-logo flex h-12 w-12 items-center justify-center rounded-sm shadow-sm transition-transform duration-300 group-hover:rotate-12">
            <span className="text-dark-text-main dark:text-main-text text-2xl font-extrabold">
              Y
            </span>
          </div>
          <h1 className="text-main-text dark:text-dark-text-main hidden text-2xl font-semibold tracking-tight sm:block">
            Yann's{" "}
            <span className="text-main-text-secondary dark:text-dark-text-tertiary font-display font-light italic">
              Artfolio
            </span>
          </h1>
        </div>

        {/* COL-2 SEARCH BAR (Desktop) */}
        <div className="relative w-full max-w-sm px-2">
          <span className="text-main-text-secondary/50 absolute top-1/2 left-4 -translate-y-1/2">
            <LoupeIcon />
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-standard w-full pl-10"
          />
        </div>

        {/* COL 3 - ACTIONS */}
        <div className="flex items-center gap-2 justify-self-end lg:gap-4">
          {/* Desktop Buttons */}
          <div className="hidden items-center gap-2 md:flex lg:gap-4">
            {user ? (
              <>
                <button onClick={onAddClick} className="button-standard">
                  Add Artwork
                </button>
                <button onClick={logout} className="button-standard">
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-main-text-secondary hover:text-main-text dark:text-dark-text-tertiary dark:hover:text-dark-text-secondary cursor-pointer text-base font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* BURGER TRIGGER */}
          {/* isMenuOpen controls the burger/close icon toggle — state lives in App */}
          <button onClick={onMenuOpen} className="relative z-60 p-2 md:hidden">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="hover:bg-main-surface dark:hover:bg-dark-surface cursor-pointer rounded-full p-2 transition-all active:scale-90"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
