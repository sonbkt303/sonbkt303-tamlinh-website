import { Link } from "@/lib/i18n/routing";
import { mainNavigation } from "@/lib/data/navigation";
import { DropdownNav } from "@/components/ui/DropdownNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-primary-dark shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center">
          <div className="bg-black px-3 py-2 lg:px-4">
            <span className="font-serif text-sm font-bold tracking-tight text-accent lg:text-base">
              tamlinhhuyenbi
            </span>
            <span className="font-serif text-sm font-bold text-white lg:text-base">.com</span>
          </div>
        </Link>

        <nav
          aria-label="Main navigation"
          className="relative flex flex-1 items-center justify-end"
        >
          <DropdownNav items={mainNavigation} />
          <MobileMenu items={mainNavigation} />
        </nav>
      </div>
    </header>
  );
}
