import { Products } from "@/interface/interface";
import { Separator } from "./separator";

export default function ProductDetails({ brand, size, material, compatibility, width, height, weight, condition, color, isShipping, shippingCost }: Products | any) {
    const items = [
        {
            name: "Brand",
            type: brand
        },
        {
            name: "Width",
            type: width
        },
        {
            name: "Size",
            type: size
        },
        {
            name: "Height",
            type: height
        },
        {
            name: "Material",
            type: material
        },
        {
            name: "Weight",
            type: weight
        },
        {
            name: "Compatibility",
            type: compatibility
        },
        {
            name: "Condition",
            type: condition
        }
    ]
    return (
        <>
        <Separator />
        <div className="lg:m-16 sm:m-4">
        <div className="flex lg:gap-8 sm:gap-2 my-8 justify-between flex-wrap">
            <div className="flex lg:gap-8 sm:gap-2 flex-wrap">
            <div className="lg:grid lg:grid-cols-2 gap-y-3 gap-x-10 sm:flex sm:flex-col capitalize sm:mb-3 lg:mb-0">
                {items.map((item, index) => (
                    <div key={index} className="font-bold">{item.name}: <span className="font-normal text-slate-600">{item.type ? item.type : "Not specified"}</span></div>
                ))}
            </div>
            </div>
            <div className="flex lg:border sm:border-0 sm:w-full lg:w-fit lg:flex-col sm:flex-col-reverse lg:gap-4 sm:gap-2 lg:p-4 sm:p-0 rounded-md h-fit">
                {color ? <div className="font-bold flex items-center gap-3 lg:justify-between sm:justify-start">Color: <div className="border rounded-[100px] w-[32px] h-[32px]" style={{ backgroundColor: color }}></div></div> : null}
                {isShipping ? <div className="font-bold">Shipping Cost: <span className="font-normal text-slate-600">{shippingCost === "" || shippingCost === "0" ? "Free" : shippingCost + ".00"}</span></div> : null}
            </div>
        </div>
        </div>
    <Separator />
    </>
    )
}