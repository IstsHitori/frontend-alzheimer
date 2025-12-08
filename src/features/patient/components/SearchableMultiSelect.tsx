import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Search } from "lucide-react";

interface SearchableMultiSelectProps<T> {
  label: string;
  placeholder: string;
  selectedItems: T[];
  onItemsChange: (items: T[]) => void;
  availableItems: T[];
  onSearch: (term: string) => void;
  getItemId: (item: T) => string | number;
  getItemLabel: (item: T) => string;
  getItemSecondary?: (item: T) => string;
  disabled?: boolean;
}

export function SearchableMultiSelect<T>({
  label,
  placeholder,
  selectedItems,
  onItemsChange,
  availableItems,
  onSearch,
  getItemId,
  getItemLabel,
  getItemSecondary,
  disabled = false,
}: SearchableMultiSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        onSearch(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleAddItem = (item: T) => {
    const itemId = getItemId(item);
    const isAlreadySelected = selectedItems.some(
      (selected) => getItemId(selected) === itemId
    );

    if (!isAlreadySelected) {
      onItemsChange([...selectedItems, item]);
    }
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleRemoveItem = (itemId: string | number) => {
    onItemsChange(
      selectedItems.filter((item) => getItemId(item) !== itemId)
    );
  };

  const filteredItems = availableItems.filter(
    (item) =>
      !selectedItems.some((selected) => getItemId(selected) === getItemId(item))
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            disabled={disabled}
            className="pl-8"
          />
          
          {isOpen && filteredItems.length > 0 && searchTerm && (
            <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-[200px] overflow-y-auto">
              {filteredItems.map((item) => (
                <button
                  key={getItemId(item)}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground flex flex-col"
                  onClick={() => handleAddItem(item)}
                >
                  <span className="font-medium">{getItemLabel(item)}</span>
                  {getItemSecondary && (
                    <span className="text-xs text-muted-foreground">
                      {getItemSecondary(item)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected items */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item) => (
            <Badge
              key={getItemId(item)}
              variant="secondary"
              className="flex items-center gap-1 pr-1"
            >
              <span className="max-w-[200px] truncate">{getItemLabel(item)}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(getItemId(item))}
                disabled={disabled}
                className="ml-1 rounded-full hover:bg-accent p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
