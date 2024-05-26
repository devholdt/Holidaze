"use client";

import { clsx } from "clsx";
import { BreadcrumbProps } from "@/app/lib/definitions";
import Link from "next/link";

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: BreadcrumbProps[] }) => {
   return (
      <nav aria-label="Breadcrumbs" className="mx-2 my-4 block md:mx-4">
         <ol className="flex text-base font-light md:text-lg">
            {breadcrumbs.map((breadcrumb, index) => (
               <li
                  key={breadcrumb.href}
                  aria-current={breadcrumb.active}
                  className={clsx(
                     breadcrumb.active
                        ? "text-body"
                        : "hover:text-body text-darkGrey transition"
                  )}
               >
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                  {index < breadcrumbs.length - 1 ? (
                     <span className="text-body mx-3 md:mx-2">/</span>
                  ) : null}
               </li>
            ))}
         </ol>
      </nav>
   );
};

export default Breadcrumbs;
