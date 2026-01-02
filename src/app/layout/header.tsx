// components/Header.tsx
import {LinkWrapper} from '@/components/ui/link-wrapper';
import { Navigation } from '../../components/custom/navigation';

export function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-3 border-b bg-white dark:bg-gray-950">
      <LinkWrapper href="/" className="text-xl font-semibold">
        <p>MyBlog</p>
      </LinkWrapper>
      <Navigation />
    </header>
  );
};