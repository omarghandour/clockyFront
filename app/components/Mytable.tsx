import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const watchDetails = [
  { attribute: "Department", value: "Men" },
  { attribute: "Dial Colour", value: "Blue" },
  { attribute: "Case Size/Diameter", value: "42 mm" },
  { attribute: "Face Material", value: "Stainless Steel" },
  { attribute: "Feature 1", value: "Water Resistant" },
  { attribute: "Model Number", value: "1514093" },
  { attribute: "Band Closure", value: "Clasp" },
  { attribute: "Band Colour", value: "Silver" },
  { attribute: "Band Material", value: "Stainless Steel" },
  { attribute: "Face/Dial Shape", value: "Round" },
  { attribute: "Face/Dial Type", value: "Analog" },
  { attribute: "Watch Movement", value: "Quartz" },
];
const Mytable = (product: any) => {
  console.log(product);

  return (
    <div className="w-full  flex justify-center items-center h-full text-pretty">
      <Card className="w-full m-auto rounded-none mt-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Watch Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Attribute</TableHead>
                  <TableHead className="w-1/2">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Gender</TableCell>
                  <TableCell>{product?.product?.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dial Color</TableCell>
                  <TableCell>{product?.product?.dialColor}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Case Size / Diameter
                  </TableCell>
                  <TableCell>{product?.product?.caseSize}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Face Material</TableCell>
                  <TableCell>{product?.product?.faceMaterial}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Features</TableCell>
                  <TableCell>{product?.product?.features}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Model Number</TableCell>
                  <TableCell>{product?.product?.modelNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Band Closure</TableCell>
                  <TableCell>{product?.product?.brandClosure}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Face / Dial Shape
                  </TableCell>
                  <TableCell>{product?.product?.faceDialShape}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Face / Dial Type
                  </TableCell>
                  <TableCell>{product?.product?.faceDialType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Watch Movement</TableCell>
                  <TableCell>{product?.product?.movmentType}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mytable;
