import Link from "next/link";
import { clsx } from "clsx";

interface Breadcrumb {
   label: string;
   href: string;
   active?: boolean;
}

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
   return (
      <nav className="m-4 block">
         <ol className="flex text-base font-light md:text-lg">
            {breadcrumbs.map((breadcrumb, index) => (
               <>
                  <li
                     key={breadcrumb.href}
                     aria-current={breadcrumb.active}
                     className={clsx(
                        breadcrumb.active
                           ? "text-dark"
                           : "text-grey transition hover:text-dark"
                     )}
                  >
                     <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                     {index < breadcrumbs.length - 1 ? (
                        <span className="mx-3 text-dark md:mx-2">/</span>
                     ) : null}
                  </li>
               </>
            ))}
         </ol>
      </nav>
   );
};

export default Breadcrumbs;
