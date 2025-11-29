// components/Header.tsx
import {LinkWrapper} from '@/components/ui/link-wrapper';
import {Label} from '@/components/ui/label';
import { MobileNav } from '../../components/custom/mobile-nav';

export function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-3 border-b bg-white dark:bg-gray-950">
      <LinkWrapper href="/" className="text-xl font-semibold">
        <p>MyBlog</p>
      </LinkWrapper>
      <nav className="hidden md:flex space-x-6 text-sm">
        <LinkWrapper href="/"><span>Home</span></LinkWrapper>
        <LinkWrapper href="/blog"><span>Blog</span></LinkWrapper>
        <LinkWrapper href="/about"><span>About</span></LinkWrapper>
        <LinkWrapper href="/contact"><span>Contact</span></LinkWrapper>
      </nav>
      <MobileNav />
    </header>
  );
};