import { useState, useEffect, useCallback } from "react";
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

   const [checkedFilters, setCheckedFilters] = useState({
      continents: {} as Record<string, boolean>,
      prices: {} as Record<string, boolean>,
      ratings: {} as Record<number, boolean>,
   });

   const filterVenues = useCallback(() => {
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
            const priceRanges = [
               { range: "< 100", min: 0, max: 100 },
               { range: "100 - 200", min: 100, max: 200 },
               { range: "200 - 500", min: 200, max: 500 },
               { range: "500-1000", min: 500, max: 1000 },
               { range: "1000-2000", min: 1000, max: 2000 },
               { range: "> 2000", min: 2000, max: Infinity },
            ];

            return priceRanges.some(({ range, min, max }) => {
               return filters.prices.has(range) && price >= min && price < max;
            });
         });
      }

      if (filters.ratings.size > 0) {
         results = results.filter((venue) => filters.ratings.has(venue.rating));
      }

      return results;
   }, [searchTerm, filters, venues]);

   const sortVenues = useCallback((venues: any[]) => {
      switch (sortOption) {
         case "Latest":
            return venues.sort(
               (a, b) =>
                  new Date(b.created).getTime() - new Date(a.created).getTime()
            );
         case "Oldest":
            return venues.sort(
               (a, b) =>
                  new Date(a.created).getTime() - new Date(b.created).getTime()
            );
         case "Popular":
            return venues.sort((a, b) => b.bookings.length - a.bookings.length);
         default:
            return venues;
      }
   }, [sortOption]);

   useEffect(() => {
      const filteredVenues = filterVenues();
      const sortedVenues = sortVenues(filteredVenues);
      setFilteredVenues(sortedVenues);
   }, [searchTerm, sortOption, filters, venues, setFilteredVenues, filterVenues, sortVenues]);

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
      const isChecked = e.target.checked;

      setFilters((prevFilters) => {
         const newFilters = { ...prevFilters };
         if (isChecked) {
            (newFilters[category] as Set<any>).add(value);
         } else {
            (newFilters[category] as Set<any>).delete(value);
         }
         return newFilters;
      });

      setCheckedFilters((prevCheckedFilters) => {
         const newCheckedFilters = { ...prevCheckedFilters };
         newCheckedFilters[category] = {
            ...newCheckedFilters[category],
            [value]: isChecked,
         };
         return newCheckedFilters;
      });
   };

   const handleResetFilters = () => {
      setFilters({
         continents: new Set<string>(),
         prices: new Set<string>(),
         ratings: new Set<number>(),
      });

      setCheckedFilters({
         continents: {},
         prices: {},
         ratings: {},
      });
   };

   return (
      <div className="mb-8 mt-12 w-full bg-white px-4 pb-4 pt-6 shadow">
         <h2 className="text-center text-xl font-extralight uppercase tracking-widest text-blue sm:text-3xl sm:font-thin">
            Find your next adventure
         </h2>
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
                  <div className="flex justify-between gap-4 border-b border-yellow p-4">
                     <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 font-light">
                           <p className="font-normal">Continent:</p>
                           <div className="flex flex-wrap items-center gap-2">
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
                                    className="flex items-center gap-1 bg-yellow px-2 py-1 text-blue"
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
                                          checked={
                                             !!checkedFilters.continents[
                                                continent
                                             ]
                                          }
                                       />
                                       <span className="ms-1">{continent}</span>
                                    </label>
                                 </div>
                              ))}
                           </div>
                        </div>
                        <div className="flex flex-col gap-2 font-light">
                           <p className="font-normal">Price (£):</p>
                           <div className="flex flex-wrap items-center gap-2">
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
                                    className="flex items-center gap-1 bg-yellow px-2 py-1 text-blue"
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
                                          checked={
                                             !!checkedFilters.prices[priceRange]
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
                        <div className="flex flex-col gap-2 font-light">
                           <p className="font-normal">Rating:</p>
                           <div className="flex flex-wrap items-center gap-2">
                              {[0, 1, 2, 3, 4, 5].map((rating) => (
                                 <div
                                    key={rating}
                                    className="flex items-center gap-1 bg-yellow px-2 py-1 text-blue"
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
                                          checked={
                                             !!checkedFilters.ratings[rating]
                                          }
                                       />
                                       <span className="ms-1">{rating}</span>
                                    </label>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div>
                        <button
                           className="bg-red px-3 py-1 font-light uppercase tracking-wider text-white hover:bg-darkRed"
                           onClick={handleResetFilters}
                        >
                           Reset
                        </button>
                     </div>
                  </div>
               </AccordionItemPanel>
            </AccordionItem>
         </Accordion>
      </div>
   );
};

export default VenueFiltering;
