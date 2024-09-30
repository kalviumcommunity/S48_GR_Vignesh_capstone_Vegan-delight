import React, { useState } from "react";
import Menu from "./menu";
import Navbar from "./navbar";
import Footer from "../Landingpage/footer";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (category) => {
    setFilter(category);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} onFilter={handleFilter} />
      <Menu searchTerm={searchTerm} filter={filter} />
      <Footer />
    </div>
  );
};

export default HomePage;
