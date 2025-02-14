import
{
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import
{
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FAQ, FAQCategory } from '@/lib/type';

interface FAQCategoryCardProps
{
    category: FAQCategory;
    onFAQSelect: (faq: FAQ) => void;
}

const FAQCategoryCard = ({ category, onFAQSelect }: FAQCategoryCardProps) => (
    <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
            <div className="flex items-center space-x-3">
                {category.icon}
                <CardTitle>{category.name}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible>
                {category.questions.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                <p>{faq.answer}</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) =>
                                    {
                                        e.stopPropagation();
                                        onFAQSelect(faq);
                                    }}
                                >
                                    View Details
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
    </Card>
);

export default FAQCategoryCard