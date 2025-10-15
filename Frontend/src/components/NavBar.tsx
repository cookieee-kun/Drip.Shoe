import { ShoppingCart, Search, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 shadow-sm">
      {/* Left: Logo */}
      <div className="uppercase text-gray-800 font-black text-3xl">
        DRIP.SHOE
      </div>
      {/* Center: Navigation */}
      <div className="flex space-x-12 font-rounded">
        <button className="text-gray-600 hover:text-indigo-600 font-semibold text-sm transition-colors">
          EXCLUSIVE
        </button>
        <button className="text-gray-600 hover:text-indigo-600 font-semibold text-sm transition-colors">
          NEW ARRIVAL
        </button>
      </div>

      {/* Right: Icons */}
      <div className="flex space-x-4">

        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="h-6 w-6 text-gray-400" />
          </button>
          {/* Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
            3
          </span>
        </div>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Search"
        >
          <Search className="h-6 w-6 text-gray-400" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Profile"
        >
          <User className="h-6 w-6 text-gray-400" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
