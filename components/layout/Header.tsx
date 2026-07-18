import { Link } from "@/lib/i18n/routing";
import { mainNavigation } from "@/lib/data/navigation";
import { DropdownNav } from "@/components/ui/DropdownNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-primary-dark shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
        <Link href="/" className="shrink-0 py-3">
          <div className="bg-black px-4 py-2">
            <span className="font-serif text-lg font-bold tracking-wide text-accent">
              tamlinh
            </span>
            <span className="font-serif text-lg font-bold text-white">.com</span>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="relative flex flex-1 items-center justify-end gap-4">
          <DropdownNav items={mainNavigation} />
          <MobileMenu items={mainNavigation} />
        </nav>
      </div>
    </header>
  );
}
