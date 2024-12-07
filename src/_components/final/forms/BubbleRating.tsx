import React from "react";

type BubbleRatingProps = {
  label: string;
  value: number | null;
  onChange: (value: number) => void;
  className?: string;
  includeHeader?: boolean;
  headerValues?: string[];
};

const BubbleRating: React.FC<BubbleRatingProps> = ({
  label,
  value,
  onChange,
  className = "",
  includeHeader = false,
  headerValues,
}) => {
  const bubbles = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="mr-4 text-sm text-gray-700">{label}</span>
      <div className="relative flex min-w-[250px] justify-around lg:min-w-[500px]">
        {includeHeader && (
          <div className="absolute left-0 top-[-30px] flex min-w-[250px] justify-between lg:min-w-[500px]">
            {headerValues?.map((header) => (
              <div
                key={header}
                className="flex flex-1 items-center justify-center text-sm text-gray-700"
              >
                {header}
              </div>
            ))}
          </div>
        )}

        {bubbles.map((rating) => (
          <button
            key={rating}
            onClick={(e) => {
              e.preventDefault();
              onChange(rating);
            }}
            className={`h-6 w-6 rounded-full border-2 transition-all hover:border-turbine-500 ${
              value === rating
                ? "border-gray-500 bg-turbine-500"
                : "border-gray-300"
            } ${
              value && value === rating ? "border-gray-500 bg-turbine-500" : ""
            } `}
            aria-label={`Rate ${rating} out of 5`}
          />
        ))}
      </div>
    </div>
  );
};

export default BubbleRating;
