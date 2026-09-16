import Link from 'next/link';
import type { PublicWebsite } from '../types/public';

export function SiteShell({ website, children }: { website: PublicWebsite; children: React.ReactNode }) {
  const templateClass = `site-${(website.template ?? 'default').toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;
  const style = {
    '--brand': website.primaryColor ?? '#19c7b6',
    '--brand-dark': website.secondaryColor ?? '#071827'
  } as React.CSSProperties;

  return (
    <div className={`site ${templateClass}`} style={style}>
      <header className="nav">
        <Link className="brand" href="/">
          <span>{website.name.slice(0, 1)}</span>
          <strong>{website.name}</strong>
        </Link>
        <nav>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/providers">Providers</Link>
          <Link href="/location">Location</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link className="navCta" href="/contact">Request Appointment</Link>
      </header>
      {children}
      <footer className="footer">
        <div>
          <strong>{website.name}</strong>
          <p>Modern healthcare website powered by Globill.</p>
        </div>
        <nav>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </footer>
    </div>
  );
}
