import { useState, useEffect } from "react";
import { VenueFilterProps, FilterCategories } from "@/app/lib/definitions";
import {
   Accordion,
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
} from "react-accessible-accordion";

const VenueFiltering: React.FC<VenueFilterProps> = ({
   venues,
   setFilteredVenues,
}) => {
   const [searchTerm, setSearchTerm] = useState("");
   const [sortOption, setSortOption] = useState("Latest");

   const [filters, setFilters] = useState({
      continents: new Set<string>(),
      prices: new Set<string>(),
      ratings: new Set<number>(),
   });

   useEffect(() => {
      let results = [...venues];

      if (searchTerm) {
         results = results.filter((venue) =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase())
         );
      }

      if (filters.continents.size > 0) {
         results = results.filter((venue) =>
            filters.continents.has(venue.location.continent)
         );
      }

      if (filters.prices.size > 0) {
         results = results.filter((venue) => {
            const price = venue.price;
            if (filters.prices.has("< 100") && price < 100) return true;
            if (filters.prices.has("100 - 200") && price >= 100 && price <= 200)
               return true;
            if (filters.prices.has("200 - 500") && price >= 200 && price <= 500)
               return true;
            if (filters.prices.has("500-1000") && price >= 500 && price <= 1000)
               return true;
            if (
               filters.prices.has("1000-2000") &&
               price >= 1000 &&
               price <= 2000
            )
               return true;
            if (filters.prices.has("> 2000") && price > 2000) return true;
            return false;
         });
      }

      if (filters.ratings.size > 0) {
         results = results.filter((venue) => filters.ratings.has(venue.rating));
      }

      switch (sortOption) {
         case "Latest":
            results.sort(
               (a, b) =>
                  new Date(b.created).getTime() - new Date(a.created).getTime()
            );
            break;
         case "Oldest":
            results.sort(
               (a, b) =>
                  new Date(a.created).getTime() - new Date(b.created).getTime()
            );
            break;
         case "Popular":
            results.sort((a, b) => b.bookings.length - a.bookings.length);
            break;
         default:
            break;
      }

      setFilteredVenues(results);
   }, [searchTerm, sortOption, filters, venues, setFilteredVenues]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };

   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value);
      setSearchTerm("");
   };

   const handleFilterChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      category: FilterCategories
   ) => {
      const value =
         category === "ratings" ? parseInt(e.target.value) : e.target.value;
      setFilters((prevFilters) => {
         const newFilters = { ...prevFilters };
         if (e.target.checked) {
            (newFilters[category] as Set<any>).add(value);
         } else {
            (newFilters[category] as Set<any>).delete(value);
         }
         return newFilters;
      });
   };

   return (
      <div className="my-8 w-full">
         <div className="mb-2 flex flex-col gap-4 xs:flex-row sm:gap-8">
            <div className="flex w-full flex-col">
               <label htmlFor="searchbar">Search:</label>
               <div className="flex gap-2 text-blue">
                  <input
                     type="text"
                     name="searchbar"
                     id="searchbar"
                     aria-label="Search venues"
                     placeholder="Search venues..."
                     className="placeholder:text-gray-500 h-12 w-full rounded-full border-2 border-yellow py-2 pl-4"
                     onChange={handleChange}
                     value={searchTerm}
                  />
               </div>
            </div>
            <div className="flex max-w-[200px] flex-col">
               <label htmlFor="filter">Filter by:</label>
               <select
                  name="filter"
                  id="filter"
                  className="h-12 rounded-full border-2 border-yellow px-4 font-light uppercase tracking-wide text-blue hover:cursor-pointer"
                  onChange={handleSelectChange}
                  value={sortOption}
               >
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                  <option value="Popular">Popular</option>
               </select>
            </div>
         </div>
         <Accordion
            className="border-x border-t border-yellow bg-white"
            allowZeroExpanded={true}
         >
            <AccordionItem>
               <AccordionItemHeading>
                  <AccordionItemButton className="border-b border-yellow bg-yellow px-2 py-1">
                     <div className="flex items-center gap-2 uppercase tracking-wide text-blue">
                        <p className="icon-[mdi--chevron-down] h-6 w-6"></p>
                        <p>Filters</p>
                     </div>
                  </AccordionItemButton>
               </AccordionItemHeading>
               <AccordionItemPanel>
                  <div className="border-b border-yellow p-4">
                     <div className="flex flex-col gap-5">
                        <div className="flex gap-5 font-light text-dark">
                           <p className="font-normal">Continent:</p>
                           <div className="flex flex-wrap items-center gap-2 sm:gap-6">
                              {[
                                 "Africa",
                                 "Asia",
                                 "Europe",
                                 "North America",
                                 "Oceania",
                                 "South America",
                              ].map((continent) => (
                                 <div
                                    key={continent}
                                    className="flex items-center gap-1 border px-2 py-1 sm:border-0 sm:p-0"
                                 >
                                    <label className="flex w-fit cursor-pointer items-center">
                                       <input
                                          type="checkbox"
                                          name="continent"
                                          value={continent}
                                          className="h-4 w-4 cursor-pointer"
                                          onChange={(e) =>
                                             handleFilterChange(e, "continents")
                                          }
                                       />
                                       <span className="ms-1">{continent}</span>
                                    </label>
                                 </div>
                              ))}
                           </div>
                        </div>
                        <div className="flex gap-5 font-light text-dark">
                           <p className="font-normal">Price (£):</p>
                           <div className="flex flex-wrap items-center gap-2 sm:gap-6">
                              {[
                                 "< 100",
                                 "100 - 200",
                                 "200 - 500",
                                 "500-1000",
                                 "1000-2000",
                                 "> 2000",
                              ].map((priceRange) => (
                                 <div
                                    key={priceRange}
                                    className="flex items-center gap-1 border px-2 py-1 sm:border-0 sm:p-0"
                                 >
                                    <label className="flex w-fit cursor-pointer items-center">
                                       <input
                                          type="checkbox"
                                          name="price"
                                          value={priceRange}
                                          className="h-4 w-4 cursor-pointer"
                                          onChange={(e) =>
                                             handleFilterChange(e, "prices")
                                          }
                                       />
                                       <span className="ms-1">
                                          {priceRange}
                                       </span>
                                    </label>
                                 </div>
                              ))}
                           </div>
                        </div>
                        <div className="flex gap-5 font-light text-dark">
                           <p className="font-normal">Rating:</p>
                           <div className="flex flex-wrap items-center gap-2 sm:gap-6">
                              {[0, 1, 2, 3, 4, 5].map((rating) => (
                                 <div
                                    key={rating}
                                    className="flex items-center gap-1 border px-2 py-1 sm:border-0 sm:p-0"
                                 >
                                    <label className="flex w-fit cursor-pointer items-center">
                                       <input
                                          type="checkbox"
                                          name="rating"
                                          value={rating}
                                          className="h-4 w-4 cursor-pointer"
                                          onChange={(e) =>
                                             handleFilterChange(e, "ratings")
                                          }
                                       />
                                       <span className="ms-1">{rating}</span>
                                    </label>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </AccordionItemPanel>
            </AccordionItem>
         </Accordion>
      </div>
   );
};

export default VenueFiltering;
