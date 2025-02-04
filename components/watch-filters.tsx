"use client";

import * as React from "react";
import { Filter } from "lucide-react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";

type Filters = {
  caseColor: string[];
  dialColor: string[];
  selectedBrand: string[];
  category: string[];
  priceRange: [number, number];
};

interface WatchFiltersComponentProps {
  onApplyFilters: (filters: Filters) => void;
}

export function WatchFiltersComponent({
  onApplyFilters,
}: WatchFiltersComponentProps) {
  const [filters, setFilters] = React.useState<Filters>({
    caseColor: [],
    dialColor: [],
    selectedBrand: [],
    category: [],
    priceRange: [0, 100000],
  });

  const [categories, setCategories] = React.useState<string[]>([]);
  const [caseColors, setCaseColors] = React.useState<string[]>([]);
  const [brands, setBrands] = React.useState<string[]>([]);
  const [dialColors, setDialColors] = React.useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const handleCheckboxChange = (
    name: keyof Filters,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name] as string[]), value]
        : (prev[name] as string[]).filter((v) => v !== value),
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  const resetFilters = () => {
    setFilters({
      caseColor: [],
      dialColor: [],
      selectedBrand: [],
      category: [],
      priceRange: [0, 100000],
    });
    onApplyFilters({
      caseColor: [],
      dialColor: [],
      selectedBrand: [],
      category: [],
      priceRange: [0, 100000],
    });
  };

  React.useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(
          "https://express.clockyeg.com/api/products/unique-filters"
        );
        const {
          brands: fetchedBrands,
          categories: fetchedCategories,
          caseColors: fetchedCaseColors,
          dialColors: fetchedDialColors,
        } = response.data;

        setBrands(fetchedBrands);
        setCategories(fetchedCategories);
        setCaseColors(fetchedCaseColors);
        setDialColors(fetchedDialColors);
      } catch (error) {
        console.error("Failed to fetch filters", error);
      }
    };

    fetchFilters();
  }, []);

  const handlePriceRangeChange = (newValue: number[]) => {
    if (newValue.length === 2) {
      setFilters((prev) => ({
        ...prev,
        priceRange: [newValue[0], newValue[1]] as [number, number],
      }));
    }
  };

  const FiltersContent = () => (
    <div
      className="space-y-4 text-two overflow-y-auto"
      style={{ maxHeight: "600px" }}
    >
      <div className="px-2">
        <label className="text-sm font-medium leading-none">Case Color:</label>
        {caseColors.map((color) => (
          <div key={color} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`caseColor-${color}`}
              className="h-4 w-4"
              checked={(filters.caseColor || []).includes(color)}
              onChange={(e) =>
                handleCheckboxChange("caseColor", color, e.target.checked)
              }
            />
            <label htmlFor={`caseColor-${color}`}>{color}</label>
          </div>
        ))}
      </div>

      <div className="px-2">
        <label className="text-sm font-medium leading-none">Dial Color:</label>
        {dialColors.map((color) => (
          <div key={color} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`dialColor-${color}`}
              className="h-4 w-4"
              checked={(filters.dialColor || []).includes(color)}
              onChange={(e) =>
                handleCheckboxChange("dialColor", color, e.target.checked)
              }
            />
            <label htmlFor={`dialColor-${color}`}>{color}</label>
          </div>
        ))}
      </div>

      <div className="px-2">
        <label className="text-sm font-medium leading-none">Brand:</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`selectedBrand-${brand}`}
              className="h-4 w-4"
              checked={(filters.selectedBrand || []).includes(brand)}
              onChange={(e) =>
                handleCheckboxChange("selectedBrand", brand, e.target.checked)
              }
            />
            <label htmlFor={`selectedBrand-${brand}`}>{brand}</label>
          </div>
        ))}
      </div>

      <div className="px-2">
        <label className="text-sm font-medium leading-none">Category:</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`category-${category}`}
              className="h-4 w-4"
              checked={(filters.category || []).includes(category)}
              onChange={(e) =>
                handleCheckboxChange("category", category, e.target.checked)
              }
            />
            <label htmlFor={`category-${category}`}>{category}</label>
          </div>
        ))}
      </div>

      <div className="px-2">
        <label className="text-sm font-medium leading-none">Price Range:</label>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span>Min: ${filters.priceRange[0].toLocaleString()}</span>
            <span>Max: ${filters.priceRange[1].toLocaleString()}</span>
          </div>
          <div className="flex space-x-4">
            <SliderPrimitive.Root
              min={0}
              max={100000}
              step={1}
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              className="relative flex items-center w-full h-5 m-5"
            >
              <SliderPrimitive.Track className="relative h-2 grow rounded-full bg-slate-200">
                <SliderPrimitive.Range className="absolute h-full bg-main rounded-full" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                className="block w-7 h-7 bg-main rounded-full hover:bg-main/80 focus:outline-none focus:ring-2 focus:ring-main"
                aria-label="Min price"
                style={{ touchAction: "none" }}
              />
              <SliderPrimitive.Thumb
                className="block w-7 h-7 bg-main rounded-full hover:bg-main/80 focus:outline-none focus:ring-2 focus:ring-main"
                aria-label="Max price"
                style={{ touchAction: "none" }}
              />
            </SliderPrimitive.Root>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">
        <div className="p-4 border border-gray-200 rounded-lg">
          <FiltersContent />
          <div className="mt-4 flex justify-between">
            <Button onClick={applyFilters} className="mr-2 bg-main text-two">
              Apply Filters
            </Button>
            <Button
              variant="outline"
              className="text-main"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="block lg:hidden text-main ">
        <Sheet onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-4 text-two bg-main mt-5">
              <Filter className="mr-2 h-4 w-4 text-two" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] p-4 bg-main text-two border-none"
          >
            <SheetHeader>
              <SheetTitle className="text-two">Filters</SheetTitle>
              <SheetDescription>
                Apply filters to refine your watch search.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <FiltersContent />
            </div>
            <div className="mt-4 flex justify-between">
              <Button onClick={applyFilters} className="mr-2 bg-two text-main">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
