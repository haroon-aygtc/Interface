import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

interface ColorSwatchProps {
  color: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  onClick,
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={cn(
        "rounded-md border border-border cursor-pointer",
        sizeClasses[size],
        onClick && "hover:ring-2 hover:ring-ring",
        className
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
      role="button"
      tabIndex={onClick ? 0 : undefined}
      aria-label={`Color: ${color}`}
    />
  );
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  className,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Update the input value when the external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Validate and format the hex color
  const validateHexColor = (color: string): string => {
    // Add # if missing
    if (color.charAt(0) !== "#") {
      color = "#" + color;
    }

    // Validate hex format
    const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
    if (!hexRegex.test(color)) {
      return value; // Return the previous valid value
    }

    return color;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Only update the parent if it's a valid hex color
    if (newValue.length >= 4) { // At least #RGB
      const validatedColor = validateHexColor(newValue);
      if (validatedColor !== value) {
        onChange(validatedColor);
      }
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setInputValue(newColor);
    onChange(newColor);
  };

  const handleBlur = () => {
    // Validate and format on blur
    if (inputValue.length > 0) {
      const validatedColor = validateHexColor(inputValue);
      setInputValue(validatedColor);
      onChange(validatedColor);
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={handleColorPickerChange}
          className="w-9 h-9 p-1 rounded-md cursor-pointer border border-input"
          disabled={disabled}
          aria-label="Select color"
        />
      </div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="#000000"
        className="flex-1"
        disabled={disabled}
        maxLength={7}
      />
    </div>
  );
};

export { ColorPicker, ColorSwatch };
