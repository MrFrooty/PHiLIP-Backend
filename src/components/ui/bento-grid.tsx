import { ReactNode, useState } from "react";
import { ArrowRightIcon, ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("grid w-full grid-cols-3 gap-4 auto-rows-max", className)}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  content,
  isSelected,
  onSelect,
}: {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  content: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      key={name}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl transition-all duration-300",
        isExpanded ? "row-span-auto" : "h-64",
        isSelected ? "ring-2 ring-primary" : "",
        "bg-white dark:bg-black shadow-md dark:shadow-lg",
        className
      )}
    >
      <div className="absolute inset-0">{background}</div>
      <div className="relative z-10 flex flex-col gap-2 p-6">
        <Icon className="h-12 w-12 text-neutral-700 dark:text-neutral-300" />
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
        <p className="text-neutral-400 dark:text-neutral-400">{description}</p>
        {isExpanded && (
          <div className="overflow-y-auto max-h-64 mt-2">
            {content}
          </div>
        )}
      </div>

      <div className="mt-auto p-4 flex justify-between items-center relative z-10">
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              <ChevronUpIcon className="mr-2 h-4 w-4" />
              Collapse
            </>
          ) : (
            <>
              <ChevronDownIcon className="mr-2 h-4 w-4" />
              Expand
            </>
          )}
        </Button>
        <Button variant="ghost" size="sm" onClick={onSelect}>
          {isSelected ? "Selected" : cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export { BentoCard, BentoGrid };
