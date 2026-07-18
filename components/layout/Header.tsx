import { Link } from "@/lib/i18n/routing";
import { mainNavigation } from "@/lib/data/navigation";
import { DropdownNav } from "@/components/ui/DropdownNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-primary-dark shadow-sm">
      <div className="container-main flex h-[4.5rem] items-center justify-between gap-4 px-4 lg:px-6">
        <Link href="/" className="focus-ring flex shrink-0 items-center rounded-md">
          <div className="rounded-md bg-primary/90 px-3 py-2 lg:px-4">
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
