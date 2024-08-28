import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Returns & Exchanges</h1>
      <p className="mb-6">
        We want you to be completely satisfied with your Sock Shop purchase. If you&apos;re not happy with your order, we&apos;re here to help.
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Return Policy</AccordionTrigger>
          <AccordionContent>
            You may return any unworn, unwashed items within 30 days of receipt for a full refund of the purchase price (excluding shipping costs).
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Exchange Policy</AccordionTrigger>
          <AccordionContent>
            If you need a different size or color, we&apos;re happy to exchange your item within 30 days of purchase. Exchanges are free of charge.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How to Initiate a Return or Exchange</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-4">
              <li>Log into your account and go to your order history.</li>
              <li>Select the item(s) you wish to return or exchange.</li>
              <li>Choose whether you want a refund or an exchange.</li>
              <li>Print the prepaid return label and include it with your return package.</li>
              <li>Drop off the package at any authorized shipping location.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Refund Processing</AccordionTrigger>
          <AccordionContent>
            Once we receive your return, please allow 5-7 business days for us to process it. Refunds will be issued to the original form of payment.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="mt-6">
        If you have any questions about our return policy or need assistance with a return or exchange, please don&apos;t hesitate to <a href="/contact" className="text-primary hover:underline">contact us</a>.
      </p>
    </div>
  )
}