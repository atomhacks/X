import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
    return (
        <div id="faq" className="flex flex-col items-center justify-center my-8 container mx-auto gap-4">
            {/* Notice the id property? This is what lets us route to the sponsors section from the navbar */}
            <h2 className="mr-auto py-6 text-5xl underline decoration-green-500 decoration-4 underline-offset-8">FAQ</h2>
            <Accordion type="single" collapsible className="w-3/5 text-lg">
      <AccordionItem value="item-0">
        <AccordionTrigger>How long is the event?</AccordionTrigger>
        <AccordionContent>
            The hackathon lasts from 8 AM to around 7 PM.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1">
        <AccordionTrigger>Does participating cost money?</AccordionTrigger>
        <AccordionContent>
          No! Competing in the event and enjoying the food are both completely free!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Do I need coding experience to attend?</AccordionTrigger>
        <AccordionContent>
            No, not at all! There are several beginner-tailored workshops that will be hosted throughout the event. In fact, there may even be a special prize for the best beginner project...
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Do I need a laptop?</AccordionTrigger>
        <AccordionContent>
            No, a laptop is not necessary. You can use the provided school computers during the event to build your project. Of course, if you have a laptop, please feel free to bring it!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>I don't have a team.</AccordionTrigger>
        <AccordionContent>
            That's okay! We have a team finding event at the beginning to help match you with other like-minded participants. If you prefer, you can also work solo.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>How many people can I work with?</AccordionTrigger>
        <AccordionContent>
            You may work with up to three other people for a max team size of 4 people. You can also work solo if you'd like.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>How do I get in touch?</AccordionTrigger>
        <AccordionContent>
            Please feel free to email {" "} 
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-500 underline decoration-2 underline-offset-4"
                  href="mailto:atomhacks@bxscience.edu"
                >
                  atomhacks@bxscience.edu
                </a> with any questions or concerns, and we will get back to you.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
        </div>
    )
}