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
  minPrice: number;
  maxPrice: number;
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
    minPrice: 0,
    maxPrice: 100000,
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
    const defaultFilters = {
      caseColor: [],
      dialColor: [],
      selectedBrand: [],
      category: [],
      minPrice: 0,
      maxPrice: 100000,
    };
    setFilters(defaultFilters);
    onApplyFilters(defaultFilters);
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

  const handleMinPriceChange = (newValue: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: newValue[0],
    }));
  };

  const handleMaxPriceChange = (newValue: number[]) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: newValue[0],
    }));
  };

  const FiltersContent = () => (
    <div
      className="space-y-4 text-two overflow-y-auto"
      style={{ maxHeight: "600px" }}
    >
      <div className="px-2">
        <label className="text-sm font-medium leading-none">Price Range:</label>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span>Min: ${filters.minPrice.toLocaleString()}</span>
            <span>Max: ${filters.maxPrice.toLocaleString()}</span>
          </div>
          <div className="flex space-x-4">
            <SliderPrimitive.Root
              min={0}
              max={100000}
              step={1}
              value={[filters?.minPrice]}
              onValueChange={handleMinPriceChange}
              className="relative flex items-center w-full h-5 m-5"
            >
              <SliderPrimitive.Track className="relative h-2 grow rounded-full bg-slate-200">
                <SliderPrimitive.Range className="absolute h-full bg-two rounded-full" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                className=" w-7 h-7 bg-two rounded-full hover:bg-two/80 focus:outline-none focus:ring-2 focus:ring-two"
                aria-label="Min price"
                // style={{ touchAction: "none" }}
              />
            </SliderPrimitive.Root>
            <SliderPrimitive.Root
              min={0}
              max={100000}
              step={1}
              value={[filters.maxPrice]}
              onValueChange={handleMaxPriceChange}
              className="relative flex items-center w-full h-5 m-5"
            >
              <SliderPrimitive.Track className="relative h-2 grow rounded-full bg-slate-200">
                <SliderPrimitive.Range className="absolute h-full bg-two rounded-full" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                className=" w-7 h-7 bg-two rounded-full hover:bg-main/80 focus:outline-none focus:ring-2 focus:ring-two"
                aria-label="Max price"
                // style={{ touchAction: "none" }}
              />
            </SliderPrimitive.Root>
          </div>
        </div>
      </div>
      {[
        { label: "Case Color", items: caseColors, filterKey: "caseColor" },
        { label: "Dial Color", items: dialColors, filterKey: "dialColor" },
        { label: "Brand", items: brands, filterKey: "selectedBrand" },
        { label: "Category", items: categories, filterKey: "category" },
      ].map(({ label, items, filterKey }) => (
        <div className="px-2" key={filterKey}>
          <label className="text-sm font-medium leading-none">{label}:</label>
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`${filterKey}-${item}`}
                className="h-4 w-4"
                checked={
                  Array.isArray(filters[filterKey as keyof Filters]) &&
                  (filters[filterKey as keyof Filters] as string[]).includes(
                    item
                  )
                }
                onChange={(e) =>
                  handleCheckboxChange(
                    filterKey as keyof Filters,
                    item,
                    e.target.checked
                  )
                }
              />
              <label htmlFor={`${filterKey}-${item}`}>{item}</label>
            </div>
          ))}
        </div>
      ))}
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
            <div className="my-6 flex justify-between">
              <Button onClick={applyFilters} className="mr-2 bg-two text-main">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
            <SheetHeader>
              <SheetTitle className="text-two">Filters</SheetTitle>
              <SheetDescription>
                Apply filters to refine your watch search.
              </SheetDescription>
            </SheetHeader>
            <div className="mb-28">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
