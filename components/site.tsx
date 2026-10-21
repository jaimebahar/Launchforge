"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Zap } from "lucide-react";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Kivorly Studio home">
      <span className="logo-icon">
        <Zap size={21} fill="currentColor" />
      </span>
      Kivorly<span className="muted-logo"> Studio</span>
      <span className="logo-dot">.</span>
    </Link>
  );
}
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container nav">
        <Logo />
        <button
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          aria-label="Main navigation"
          className={open ? "nav-links open" : "nav-links"}
        >
          {[
            ["/", "Home"],
            ["/services", "Services"],
            ["/pricing", "Pricing"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button small nav-cta">
          Let’s build your business <ArrowUpRight size={16} />
        </Link>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p>
              Big ideas deserve a strong beginning.
              <br />
              Let’s build what’s next.
            </p>
          </div>
          <div className="footer-links">
            <Link href="/services">Services</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Get in touch</Link>
          </div>
          <div className="footer-links">
            <Link href="/dashboard">Client inquiries ↗</Link>
            <Link href="/privacy">Privacy policy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Kivorly Studio. All rights reserved.
          </span>
          <span>
            Built for the next big thing. <span className="blue">↗</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
