import { Link } from "@/lib/i18n/routing";
import { mainNavigation } from "@/lib/data/navigation";
import { DropdownNav } from "@/components/ui/DropdownNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-primary-dark shadow-sm">
      <div className="container-main flex h-[4.5rem] items-center justify-between gap-4 px-4 lg:px-6">
        <Link href="/" className="focus-ring shrink-0 rounded-sm py-1">
          <span className="flex items-baseline gap-px font-serif text-base tracking-wide lg:text-lg">
            <span className="font-medium text-white">tamlinhhuyenbi</span>
            <span className="text-sm font-light text-accent-soft lg:text-base">.com</span>
          </span>
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
