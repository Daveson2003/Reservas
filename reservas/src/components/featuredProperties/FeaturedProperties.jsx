import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const {data, loading, error} = useFetch("/hotels?type=apartment&featured=true&limit=10&min=10&max=99999")
  return (
    <div className="fp">
      {loading ? "Cargando.." :
      (<>
        {data.map((item,i)=>(
          <div className="fpItem" key={item._id}>
          <img
            src={item.photos[0]}
            alt=""
            className="fpImg"
          />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Precio desde ${item.cheapestPrice}</span>
          {item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>}
          </div>
        ))} 
      </>)}
    </div>
  );
};

export default FeaturedProperties;
