import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import styles from '../styles/Header.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/insurance', label: 'Products' },
  { href: '/resume', label: 'Resume' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Publishes the header's real rendered height as a CSS variable so fixed
  // content below it (main padding, the insurance section nav) can stay
  // flush against it instead of relying on a hardcoded number that drifts
  // out of sync whenever the header's own size changes (e.g. the mobile
  // wordmark font-size breakpoint).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setHeightVar = () => {
      document.documentElement.style.setProperty('--header-height', `${el.getBoundingClientRect().height}px`);
    };
    setHeightVar();
    const observer = new ResizeObserver(setHeightVar);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.container}>
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Link href="/" className={styles.wordmark} onClick={closeMenu}>
          Achyut Niroula
        </Link>

        <ThemeToggle />
      </div>

      <nav className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ''}`}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={closeMenu} className={styles.overlayLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
