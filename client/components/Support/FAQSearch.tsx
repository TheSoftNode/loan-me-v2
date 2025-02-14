import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FAQSearchProps
{
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const FAQSearch = ({ searchQuery, setSearchQuery }: FAQSearchProps) => (
    <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
            placeholder="Search for answers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
);

export default FAQSearch;