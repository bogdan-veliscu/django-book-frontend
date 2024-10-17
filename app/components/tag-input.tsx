"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type TagInputProps = {
    tags: string[];
    onChange: (tags: string[]) => void;
};

export const TagInput = ({ tags, onChange }: TagInputProps) => {
    const [inputValue, setInputValue] = useState("");

    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag)) {
            onChange([...tags, tag]);
        }
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        onChange(newTags);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="flex items-center bg-gray-200 px-2 py-1 rounded-full"
                    >
                        {tag}
                        <button
                            type="button"
                            className="ml-1 focus:outline-none"
                            onClick={() => removeTag(index)}
                        >
                            <X size={16} />
                        </button>
                    </span>
                ))}
            </div>
            <Input
                placeholder="Add a tag and press Enter"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};