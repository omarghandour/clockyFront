// app/featured/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="paddingX w-full mx-auto my-8 py-10 px-5">
      <div className="flex flex-col items-center w-full bg-[#FCFCFC]">
        <h2 className="text-main font-bold text-xl md:text-3xl">FEATURED</h2>
        <div className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-2 w-full pb-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center p-4 gap-2 shadow-lg w-full"
            >
              <Skeleton className="w-full h-40 md:h-64" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-1/2 h-5" />
              <Skeleton className="w-1/3 h-7" />
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
