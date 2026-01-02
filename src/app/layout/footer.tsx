// components/Footer.tsx
export function Footer() {
  return (
    <footer className="mt-16 border-t py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} <span>MyBlog. All rights reserved.</span>
    </footer>
  );
};