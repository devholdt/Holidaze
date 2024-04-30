"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Search = () => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   const handleSearch = (searchTerm: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (searchTerm) {
         params.set("query", searchTerm);
      } else {
         params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
   };

   return (
      <div className="flex w-full flex-col text-blue">
         <label htmlFor="search">Search:</label>
         <input
            className="placeholder:text-gray-500 rounded-full border border-2 border-yellow py-2 pl-4"
            placeholder="Search venues..."
            onChange={(e) => {
               handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
         />
      </div>
   );
};

export default Search;
