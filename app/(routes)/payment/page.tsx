import Textblock from "@/components/ui/textblock";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function PaymentPage() {
    const returnCriteria = ["The item must be returned within 14 days of the purchase date.", "The item is unused, uninstalled, and not disassembled.", "All parts, hardware, and instructions are included and not missing.", "The item is in its original packaging."]
    return (
        <div>
            <Textblock title="Payment & Shipping" description="Thank you for choosing to shop with AUTODOC. We understand that sometimes things don't work out as planned, and we want to make the return process as easy as possible for you. Please take a moment to review our shipping and return policies below." />
            <div className="flex w-full justify-center outline-none">
            <Accordion type="single" collapsible className="lg:w-[800px] sm:w-full mx-8">
            <AccordionItem value="item-1">
                <AccordionTrigger>What orders are non-returnable?</AccordionTrigger>
                <AccordionContent>
                We are unable to accept returns for items that have been installed, used, or disassembled.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>What are the return criteria?</AccordionTrigger>
                <AccordionContent>
                To ensure that your return is accepted and processed quickly, please make sure that your return meets the following criteria:
                <div className="flex flex-col gap-2 mt-4 mx-4">
                    {returnCriteria.map((criterium, index) => (
                        <span className="flex items-center gap-2" key={index}><li>{criterium}</li></span>
                    ))}
                </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>What is the refund process like?</AccordionTrigger>
                <AccordionContent>
                Once your return is received, we will conduct an inspection of the products to verify that the return meets the above requirements. If the return is accepted, we will issue a refund to the original method of payment. Please note if the order received free shipping, the shipping cost will be deducted from the cost of the merchandise returned. The return shipping will also be paid by the customer.
                </AccordionContent>
            </AccordionItem>
            </Accordion>
            </div>
        </div>
    )
}