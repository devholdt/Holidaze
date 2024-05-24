import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { VenueProps } from "@/app/lib/definitions";

interface SearchbarProps {
   venues: VenueProps[];
   setFilteredVenues: React.Dispatch<React.SetStateAction<VenueProps[]>>;
}

const VenueFiltering: React.FC<SearchbarProps> = ({
   venues,
   setFilteredVenues,
}) => {
   const [searchTerm, setSearchTerm] = useState("");
   const [sortOption, setSortOption] = useState("Latest");
   const navigate = useRouter();

   useEffect(() => {
      const results = venues.filter((venue: any) =>
         venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVenues(results);
   }, [searchTerm, venues, setFilteredVenues]);

   useEffect(() => {
      let sorted = [...venues];
      switch (sortOption) {
         case "Latest":
            sorted.sort(
               (a, b) =>
                  new Date(b.created).getTime() - new Date(a.created).getTime()
            );
            break;
         case "Oldest":
            sorted.sort(
               (a, b) =>
                  new Date(a.created).getTime() - new Date(b.created).getTime()
            );
            break;
         case "Popular":
            sorted.sort((a, b) => b.bookings.length - a.bookings.length);
            break;
         default:
            break;
      }
      setFilteredVenues(sorted);
   }, [sortOption, venues, setFilteredVenues]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };

   const performSearch = () => {
      if (searchTerm !== "") {
         const results = venues.filter((venue: any) =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase())
         );

         if (results.length > 0) {
            navigate.push(`/venues/${results[0].id}`);
         }
      }
   };

   const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
         performSearch();
      }
   };

   const handleButtonClick = () => {
      performSearch();
   };

   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value);
      setSearchTerm("");
   };

   return (
      <>
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
                  onKeyDown={handleOnKeyDown}
                  value={searchTerm}
               />
               <button
                  onClick={handleButtonClick}
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-yellow p-3 text-blue"
               >
                  <span className="icon-[mdi--search] h-6 w-6 text-blue"></span>
               </button>
            </div>
         </div>
         <div className="flex max-w-[200px] flex-col">
            <label htmlFor="filter">Filter by:</label>
            <select
               name="filter"
               id="filter"
               className="h-12 rounded-full border-2 border-yellow px-4 text-blue hover:cursor-pointer"
               onChange={handleSelectChange}
               value={sortOption}
            >
               <option value="Latest">Latest</option>
               <option value="Oldest">Oldest</option>
               <option value="Popular">Popular</option>
            </select>
         </div>
      </>
   );
};

export default VenueFiltering;
