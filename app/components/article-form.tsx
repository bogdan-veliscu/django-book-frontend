"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    Button,
    Input,
    Label,
    Spinner,
} from "@/components/ui";
import { TagInput } from "@/components/tag-input";
import dynamic from "next/dynamic";

// Dynamically import React Quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { createArticle } from "@/services/articleService";
import axios from "axios";
import { getSession } from "next-auth/react";

const articleSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
    body: z.string().min(20, { message: "Body must be at least 20 characters long." }),
    tagList: z.array(z.string()).optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const ArticleForm = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, control, setError, formState: { errors } } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            tagList: [],
        },
    });

    const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
        setSubmitting(true);
        const session = await getSession();

        try {
            if (session?.user?.email) {
                const articleData = data as ArticleFormData;
                const article = await createArticle(articleData);
                toast.success("Article created successfully!");
                if (article?.title) {
                    router.push("/");
                }
            } else {
                console.error("User is not authenticated");
                setSubmitting(false);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                const serverErrors = error.response.data.errors;
                // Map serverErrors to form fields
                Object.entries(serverErrors).forEach(([field, messages]) => {
                    setError(field as keyof ArticleFormData, {
                        type: "server",
                        message: (messages as string[]).join(" "),
                    });
                });
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    placeholder="Enter article title"
                    {...register("title")}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
            </div>

            {/* Description Field */}
            <div>
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    placeholder="Enter article description"
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
            </div>

            {/* Body Field */}
            <div>
                <Label htmlFor="body">Body</Label>
                <Controller
                    name="body"
                    control={control}
                    render={({ field }) => (
                        <ReactQuill
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Write your article here..."
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ["bold", "italic", "underline"],
                                    ["link", "blockquote", "code", "image"],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                ],
                            }}
                        />
                    )}
                />
                {errors.body && (
                    <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
                )}
            </div>

            {/* Tags Field */}
            <div>
                <Label htmlFor="tags">Tags</Label>
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <TagInput tags={field.value || []} onChange={field.onChange} />
                    )}
                />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={submitting}>
                {submitting ? (
                    <>
                        <Spinner className="mr-2" /> Submitting...
                    </>
                ) : (
                    "Submit Article"
                )}
            </Button>
        </form>
    );
};

export default ArticleForm;