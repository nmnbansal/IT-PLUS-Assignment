import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './ProductList.css'

function ProductList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          const list = await res.json();
          setData(list);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
    };
  
    const filteredData = data.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      return titleMatch && categoryMatch;
    });
  
    const categories = [...new Set(data.map(item => item.category))];
  
    return (
      <div className="product-list-container">
        <div className="filters-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a product..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <select className="category-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="product-list">
          {loading ? "Loading ..." :
            filteredData.map((item, index) => {
              return (
                <div key={index} className="product-item">
                  <h2>
                    <Link to={`/product/${item.id}`} className="product-title">{item.title}</Link>
                  </h2>
                  <p className="product-category">Category: {item.category}</p>
                  <p className="product-price">Price: ${item.price}</p>
                  <p className="product-description">Description: {item.description}</p>
                  <img className="product-image" src={item.image} alt={item.title} />
                </div>
              )
            })}
        </div>
      </div>
    );
  }

  export {ProductList}