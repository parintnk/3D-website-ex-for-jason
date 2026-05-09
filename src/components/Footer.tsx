import { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Bounded } from "./Bounded";

export function Footer() {
  return (
    <Bounded as="footer" className="bg-gray-950 py-12 text-gray-400 md:py-16">
      <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="max-w-md">
          <Link href="/" className="shrink-0">
            <Logo className="h-8 w-auto" />
            <span className="sr-only">Vapor home</span>
          </Link>
          <p className="mt-5 text-sm leading-6 text-gray-400">
            Precision mechanical keyboards with a crisp feel, durable materials,
            and a layout built for daily work.
          </p>
        </div>

        <nav className="grid gap-3">
          <h2 className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
            Shop
          </h2>
          <FooterLink href="/products">Products</FooterLink>
          <FooterLink href="/support">Support</FooterLink>
          <FooterLink href="#buy-button">Buy Keyboard</FooterLink>
        </nav>

        <nav className="grid gap-3">
          <h2 className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
            Company
          </h2>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/">Home</FooterLink>
        </nav>
      </div>

      <div className="flex flex-col gap-3 pt-8 text-sm md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Vapor Keyboards. All rights reserved.</p>
        <p className="text-gray-500">Designed for focused typing.</p>
      </div>
    </Bounded>
  );
}

type FooterLinkProps = {
  href: string;
  children: ReactNode;
};

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="w-fit text-sm transition-colors hover:text-white focus:ring-2 focus:ring-[#01A7E1] focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none"
    >
      {children}
    </Link>
  );
}
