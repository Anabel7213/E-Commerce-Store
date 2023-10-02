import Textblock from "@/components/ui/textblock";
import Image from "next/image";

export default function DeliveryPage() {
    const deliveryTerms = [
        {
            title: "Delivery Timeframes:",
            description: "AUTODOC offers fast and reliable delivery for all orders. Delivery times vary depending on your location, but you can expect to receive your order within 1-3 business days. Please note that delivery times may be longer for remote or rural areas."
        },
        {
            title: "Delivery Fees:",
            description: "The shipping is free of charge for all orders on the website. We also offer international delivery to Canada and Mexico apart from the US. Please ensure that the delivery address you provide is accurate and complete."
        }
    ]
    return (
        <>
        <Textblock title="Delivery" description="Thank you for shopping with us. Rest assured your items will arrive safely and promptly. All of our equipment is 100% original with a guarantee fit for its specified vehicles." />
        <div className="flex justify-between items-center sm:mx-8 md:mx-16 my-8 md:flex-nowrap sm:flex-wrap gap-4">
            <div className="flex gap-4 flex-col md:w-[664px] sm:w-full">
                {deliveryTerms.map((instance, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <h1 className="font-bold">{instance.title}</h1>
                    <p className="text-slate-500">{instance.description}</p>
                </div>
                ))}
            </div>
            <Image src="/box.png" width={400} height={700} alt="Product packaging" className="md:my-0 sm:my-8"/>
        </div>
        </>
    )
}