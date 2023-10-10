import useFetchCategories from "@/lib/useCategories";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Categories({ activeCategory, setActiveCategory }: any) {

    const categories = useFetchCategories()
    const [ isActive, setIsActive ] = useState(null)
    const handleButtonClick = (category:any) => {
      if (category === null) {
        setIsActive(null);
        setActiveCategory("All");
      } else {
        setIsActive(category.id);
        setActiveCategory(category.name);
      }
    };

    return (
        <div className="flex sm:w-full lg:mx-16 sm:mx-4 lg:gap-1 sm:gap-0 my-8 border p-1 lg:w-fit rounded-md">
        <Button
          variant="ghost"
          className={`text-sm ${isActive === null ? 'bg-slate-100 text-slate-800' : 'text-slate-500'} font-medium hover:text-slate-800`}
          onClick={() => handleButtonClick(null)}
        >
          All
        </Button>
          {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={`text-sm ${isActive === category.id ? 'bg-slate-100 text-slate-800' : 'text-slate-500'} font-medium hover:text-slate-800`}
                onClick={() => handleButtonClick(category)}
              >
                {category.name}
              </Button>
          ))}
      </div>
    )
}