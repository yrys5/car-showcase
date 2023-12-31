"use client";

import React, { useState } from "react";
import { SearchManufacturer } from ".";
import Image from "next/image";
import { useRouter } from "next/navigation";

// V1
// const SearchButton = ({ otherClasses }: { otherClasses: string }) => {
//   return (
//     <button type="submit" className={`-ml-3 z-5 p-1 ${otherClasses}`}>
//       <Image
//         src="/magnifying-glass.svg"
//         alt="magnifying-glass"
//         width={40}
//         height={40}
//         className="object-contain"
//       />
//     </button>
//   );
// };


// V2
const SearchButton = ({ otherClasses }: { otherClasses: string }) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchClick = () => {
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <button 
      type="submit" 
      className={`-ml-3 z-5 p-1 max-sm:cursor-default ${otherClasses}`} 
      onClick={handleSearchClick}
    >
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying-glass"
        width={40}
        height={40}
        className={`object-contain ${isSearching ? 'max-sm:animate-spin' : ''}`}
      />
    </button>
  );
};


const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === "" && model === ""){
      return alert("Please fill in the search bar.");
    }

      updateSearchParams(model.toLocaleLowerCase(), manufacturer.toLocaleLowerCase())
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    model ? searchParams.set("model", model) : searchParams.delete("model");
    manufacturer ? searchParams.set("manufacturer", manufacturer) : searchParams.delete("manufacturer");

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname, {scroll: false})
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
