"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Separator } from "./separator"
import { Button } from "./button"
import { CheckCircle2, ChevronsRight } from "lucide-react"
import useCart from "@/lib/useCart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

    //source: https://www.avalara.com/taxrates/en/state-rates.html
    const taxItems = [
      {
          stateName: "Alabama",
          stateTax: 0.07
      },
      {
          stateName: "Alaska",
          stateTax: 0.00
      },
      {
          stateName: "Arizona",
          stateTax: 0.056
      },
      {
          stateName: "Arkansas",
          stateTax: 0.065
      },
      {
          stateName: "California",
          stateTax: 0.06
      },
      {
          stateName: "Colorado",
          stateTax: 0.029
      },
      {
          stateName: "Connecticut",
          stateTax: 0.0635
      },
      {
          stateName: "Delaware",
          stateTax: 0.00
      },
      {
          stateName: "Florida",
          stateTax: 0.06
      },
      {
          stateName: "Georgia",
          stateTax: 0.04
      },
      {
          stateName: "Hawaii",
          stateTax: 0.04
      },
      {
          stateName: "Idaho",
          stateTax: 0.06
      },
      {
          stateName: "Illinois",
          stateTax: 0.0625
      },
      {
          stateName: "Indiana",
          stateTax: 0.07
      },
      {
          stateName: "Iowa",
          stateTax: 0.06
      },
      {
          stateName: "Kansas",
          stateTax: 0.065
      },
      {
          stateName: "Kentucky",
          stateTax: 0.06
      },
      {
          stateName: "Louisiana",
          stateTax: 0.0445
      },
      {
          stateName: "Maine",
          stateTax: 0.055
      },
      {
          stateName: "Maryland",
          stateTax: 0.06
      },
      {
          stateName: "Massachusetts",
          stateTax: 0.056
      },
      {
          stateName: "Michigan",
          stateTax: 0.06
      },
      {
          stateName: "Minnesota",
          stateTax: 0.0688
      },
      {
          stateName: "Mississippi",
          stateTax: 0.07
      },
      {
          stateName: "Missouri",
          stateTax: 0.0423
      },
      {
          stateName: "Montana",
          stateTax: 0.00
      },
      {
          stateName: "Nebraska",
          stateTax: 0.055
      },
      {
          stateName: "Nevada",
          stateTax: 0.046
      },
      {
          stateName: "New Hampshire",
          stateTax: 0.00
      },
      {
          stateName: "New Jersey",
          stateTax: 0.0663
      },
      {
          stateName: "New Mexico",
          stateTax: 0.0513
      },
      {
          stateName: "New York",
          stateTax: 0.04
      },
      {
          stateName: "North Carolina",
          stateTax: 0.0475
      },
      {
          stateName: "North Dakota",
          stateTax: 0.05
      },
      {
          stateName: "Ohio",
          stateTax: 0.0575
      },
      {
          stateName: "Oklahoma",
          stateTax: 0.045
      },
      {
          stateName: "Oregon",
          stateTax: 0.00
      },
      {
          stateName: "Pennsylvania",
          stateTax: 0.06
      },
      {
          stateName: "Rhode Island",
          stateTax: 0.07
      },
      {
          stateName: "South Carolina",
          stateTax: 0.06
      },
      {
          stateName: "South Dakota",
          stateTax: 0.045
      },
      {
          stateName: "Tennessee",
          stateTax: 0.07
      },
      {
          stateName: "Texas",
          stateTax: 0.0625
      },
      {
          stateName: "Utah",
          stateTax: 0.047
      },
      {
          stateName: "Vermont",
          stateTax: 0.06
      },
      {
          stateName: "Virginia",
          stateTax: 0.043
      },
      {
          stateName: "Washington",
          stateTax: 0.065
      },
      {
          stateName: "West Virginia",
          stateTax: 0.06
      },    
      {
          stateName: "Wisconsin",
          stateTax: 0.05
      }, 
      {
          stateName: "Wyoming",
          stateTax: 0.04
      }
  ]

  const shippingOptions = [
    {
      name: "Standard",
      time: "2-5 Business Days",
      cost: 7.99,
    },
    {
      name: "Expediated",
      time: "2 Business Days",
      cost: 27.99,
    },
    {
      name: "Priority",
      time: "1 Business Day",
      cost: 30.99,
    }
  ]
  
export default function Summary({ onProceed }: any) {
    const items = useCart((state) => state.items)
    const orderTotal = items.reduce((total, item) => {
        return total + Number(item.price)
    }, 0)
      const handleCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id),
            shippingType: shippingType,
            shippingCost: shippingCost,
            stateTax: stateTax
        })
        console.log(response.config.data)
        window.location = response.data.url
      }

      const [ shippingType, setShippingType ] = useState("")
      const [ shippingCost, setShippingCost ] = useState<Number>(0)
      const [ state, setState ] = useState("")
      const taxByState = taxItems.find(item => item.stateName === state)?.stateTax 
      const stateTax = taxByState ? ((orderTotal + Number(shippingCost)) * taxByState).toFixed(2) : "0.00"
      const grandTotal = stateTax && shippingCost ? (orderTotal + Number(shippingCost) + Number(stateTax)).toFixed(2) : "0.00"
    return (
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2">
          {shippingOptions.map((option, index) => (
            <div key={index} className="border flex gap-2 p-2 rounded-md">
              <input type="radio" id={option.name} value={option.cost} required name="shippingTypes" onChange={(e) => { setShippingCost(parseFloat(e.target.value)); setShippingType(option.name)}} />
            <label 
              htmlFor={option.name}
              className="flex items-center justify-between gap-2 w-full font-normal"
            >
              <div className="flex flex-col text-slate-950 cursor-pointer font-medium">
                {option.name}
                <span className="font-normal text-slate-500">
                  {option.time}
                </span>
              </div>
              ${option.cost}
            </label>
            </div>
          ))}
        </div>
        <Select onValueChange={(e) => setState(e.valueOf())}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent className="h-[200px] overflow-hidden">
            {taxItems.map((item, index) => (
              <SelectItem key={index} value={item.stateName}>{item.stateName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-slate-900 p-6 bg-slate-50 rounded-md">
          <h1 className="font-bold mb-4 text-xl">Order Summary</h1>
          <button onClick={() => console.log(taxByState)}>test</button>
          <Separator />
          <div className="flex flex-col font-bold gap-2 my-4">
            <span className="flex items-center gap-2 justify-between">
              Items: <span className="font-medium">${orderTotal}.00</span>
            </span>
            <span className="flex items-center gap-2 justify-between">
              Shipping Cost: <span className="font-medium">{shippingCost ? "$" + Number(shippingCost) : "$0.00"}</span>
            </span>
            <span className="flex items-center gap-2 justify-between">
              Taxes: <span className="font-medium">${stateTax}</span>
            </span>
            <Separator />
            <span className="flex items-center gap-2 justify-between">
              Grand Total: <span className="font-medium">${grandTotal}</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
          <Button
            disabled={state === ""}
            onClick={handleCheckout}
            className="w-full flex gap-2 items-center"
          >
            Submit Order
            <CheckCircle2 size={16} />
          </Button>
          <Button
            variant="outline"
            disabled={items.length === 0}
            onClick={onProceed}
            className="w-full bg-inherit"
          >
            Cancel
          </Button>
          </div>
        </div>
      </div>
    );
}

export function Subsummary({ onProceed }: any) {
  const items = useCart((state) => state.items)
  const searchParams = useSearchParams()
  const removeAll = useCart((state) => state.removeAll)
  useEffect(() => {
    if(searchParams.get("success")) {
        toast.success("Payment completed!")
        removeAll()
    }
    if(searchParams.get("canceled")) {
        toast.error("Order cancelled!")
    }
  }, [searchParams, removeAll])
  const orderTotal = items.reduce((total, item) => {
      return total + Number(item.price)
  }, 0)
  return (
    <div className="text-slate-900 p-6 bg-slate-50 rounded-md">
    <div className="flex items-center gap-2 justify-between">
    <h1 className="font-bold text-xl">Total:</h1>
    <span className="text-[18px] font-bold">${orderTotal}.00</span>
    </div>
    <Separator className="my-4"/>
    <Button disabled={items.length === 0} onClick={onProceed} className="w-full flex gap-2 items-center">Proceed<ChevronsRight /></Button>
  </div>
  )
}