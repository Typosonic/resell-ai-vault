import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What exactly am I getting with AutomationVault.ai?",
    answer: "You get access to 100+ ready-to-deploy AI automations that you can download, rebrand, and resell as your own. Each automation comes with complete documentation, setup guides, and commercial resell rights. New automations are added weekly."
  },
  {
    question: "Can I really resell these automations as my own?",
    answer: "Absolutely! Every automation comes with full commercial licensing and resell rights. You can white-label them, add your branding, and sell them to clients as if you built them yourself. There are no restrictions on pricing or usage."
  },
  {
    question: "Do I need technical skills to use these automations?",
    answer: "No coding or technical skills required! All automations are plug-and-play and come with detailed setup instructions. If you can follow a recipe, you can deploy these automations. We also provide video tutorials for each one."
  },
  {
    question: "How often do you add new automations?",
    answer: "We add new automations every week. Our team is constantly researching the latest AI trends and building automations that are in high demand. As a member, you'll be the first to access these new releases."
  },
  {
    question: "What kind of support do you provide?",
    answer: "All plans include access to our support team and community. Pro and Agency+ members get priority support. Agency+ members also get 1-on-1 strategy calls and a dedicated account manager to help scale their business."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes! We offer a 30-day money-back guarantee on all plans. If you're not completely satisfied with the quality of our automations or the value they provide, we'll refund your money, no questions asked."
  },
  {
    question: "How much can I charge for these automations?",
    answer: "There are no pricing restrictions. Our members typically charge anywhere from $500 to $5,000+ per automation depending on complexity and their target market. We provide pricing guides and market research to help you optimize your rates."
  },
  {
    question: "What formats are the automations delivered in?",
    answer: "Automations are delivered in various formats depending on the type: n8n workflows, Zapier templates, Make.com scenarios, Python scripts, and complete web applications. Each comes with full documentation and setup guides."
  },
  {
    question: "Can I customize the automations for my clients?",
    answer: "Absolutely! The automations are designed to be customizable. You can modify workflows, change branding, adjust functionality, and tailor them to your clients' specific needs. We encourage customization to add more value."
  },
  {
    question: "How do I get started?",
    answer: "Simply choose your plan and sign up. You'll get immediate access to the automation library and can start downloading and deploying automations right away. We recommend starting with our most popular automations to see quick wins."
  }
];

export function FAQ() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about AutomationVault.ai and how it can 
            help you build a successful AI automation business.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-6">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you succeed. Get in touch and we'll answer 
              any questions about AutomationVault.ai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@automationvault.ai"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                Email Support
              </a>
              <a 
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors font-medium"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}