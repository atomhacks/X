import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/Accordion";
// Todo: Add a question answer block and update the ai policy
const qas = [
  {
    question: "How long is the event?",
    answer: "The hackathon lasts from 8 AM to around 7-8 PM",
  },
  {
    question: "Does participating cost money?",
    answer: "No! Competing in the event and enjoying the food are both completely free!",
  },
  {
    question: "Do I need coding experience to attend?",
    answer:
      "No, not at all! There are several beginner-tailored workshops that will be hosted throughout the event. In fact, there may even be a special prize for the best beginner project...",
  },
  {
    question: "Do I need a laptop?",
    answer:
      "No, a laptop is not necessary. You can use the provided school computers during the event to build your project. Of course, if you have a laptop, please feel free to bring it!",
  },
  {
    question: "I don't have a team.",
    answer:
      "That's okay! We have a team finding event at the beginning to help match you with other like-minded participants. If you prefer, you can also work solo.",
  },
  {
    question: "How many people can I work with?",
    answer:
      "You may work with up to three other people for a max team size of 4 people. You can also work solo if you'd like.",
  },
  {
    question: "Can I start making my project right now?",
    answer:
      "No, you may not create a project for the hackathon ahead of time. All code must be written during the event.",
  },
  {
    question: "Am I allowed to use third-party libraries/frameworks?",
    answer:
      "Yes, of course! In fact we encourage you to use them to speed up your development process. However, code that is not part of an external library should be your own work.",
  },
  {
    question: "Am I allowed to use any third party platform such as Scratch/Roblox/Unity, etc?",
    answer:
      "Yes, you may utilize any platform in any language that suits your needs, such as Scratch. Remember, the code you implement must be your own.",
  },
  {
    question: "What do I win?",
    answer:
      "Our top prize is an Oculus Quest! We have several other prizes available for second place and third place, as well as a prize for the best beginner group. However, there will be several freebies throughout the event, including a free T-Shirt and stickers! Check the email that was sent to all Bronx Science students for more details",
  },
];

export default function FAQ() {
  return (
    <div id="faq" className="container mx-auto my-8 flex flex-col items-center justify-center gap-4">
      <h2 className="mr-auto px-4 py-6 text-5xl underline decoration-green-500 decoration-4 underline-offset-8">FAQ</h2>
      <Accordion type="single" collapsible className="w-3/5 text-lg">
        {qas.map((qa, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{qa.question}</AccordionTrigger>
            <AccordionContent>{qa.answer}</AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="item-100">
          <AccordionTrigger>How do I get in touch?</AccordionTrigger>
          <AccordionContent>
            Please feel free to email{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-green-500 underline decoration-2 underline-offset-4"
              href="mailto:atomhacks@bxscience.edu"
            >
              atomhacks@bxscience.edu
            </a>{" "}
            with any questions or concerns, and we will get back to you.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
