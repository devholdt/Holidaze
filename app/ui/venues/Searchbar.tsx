import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { VenueProps } from "@/app/lib/definitions";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface SearchbarProps {
   venues: VenueProps[];
   setFilteredVenues: React.Dispatch<React.SetStateAction<VenueProps[]>>;
}

const Searchbar: React.FC<SearchbarProps> = ({ venues, setFilteredVenues }) => {
   const [searchTerm, setSearchTerm] = useState("");
   const navigate = useRouter();

   useEffect(() => {
      const results = venues.filter((venue: any) =>
         venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVenues(results);
   }, [searchTerm, venues, setFilteredVenues]);

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

   return (
      <div className="flex w-full w-full flex-col">
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
            />
            <button
               onClick={handleButtonClick}
               className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-yellow p-3 text-blue"
            >
               <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
         </div>
      </div>
   );
};

export default Searchbar;
