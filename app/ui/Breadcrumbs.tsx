import Link from "next/link";

interface Breadcrumb {
   label: string;
   href: string;
   active?: boolean;
}

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
   return (
      <nav className="m-4 block">
         <ol className="flex text-lg md:text-xl">
            {breadcrumbs.map((breadcrumb, index) => (
               <li key={breadcrumb.href} aria-current={breadcrumb.active}>
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                  {index < breadcrumbs.length - 1 ? (
                     <span className="mx-3 inline-block">/</span>
                  ) : null}
               </li>
            ))}
         </ol>
      </nav>
   );
};

export default Breadcrumbs;
