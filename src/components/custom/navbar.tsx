import { ThemeChanger } from "@/components/custom/theme-changer";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-100 dark:bg-popover border-b h-[var(--header-height)] font-geist-sans text-foreground">
      <span className="container h-full w-full mx-auto flex items-center justify-between">
        <span className="relative">
          <h3 className="prose-h3">Task Dashboard</h3>
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-full w-1 bg-red-400 dark:bg-red-600"/>
        </span>
        <ThemeChanger />
      </span>
    </nav>
  );
}
