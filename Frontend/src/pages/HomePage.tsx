import NavBar from "../components/NavBar";
import NewArrivalCard from "../components/NewArrivalCard";
import ProductCardUI from "../components/ProductCard";

const HomePage = () => {
  return (
    <div className="bg-gray-10 min-h-screen">
      <NavBar />

      <div className="flex justify-center items-start py-16 px-4">
        <div className="max-w-5xl w-full">
          <NewArrivalCard />
        </div>
      </div>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Latest Products
        </h1>

        {/* Flex-based product row */}
        <div className="flex flex-wrap justify-center gap-8">
          <ProductCardUI />
          <ProductCardUI />
          <ProductCardUI />
          <ProductCardUI />
          <ProductCardUI />
          <ProductCardUI />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
