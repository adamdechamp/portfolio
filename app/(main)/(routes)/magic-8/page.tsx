"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { EyeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { 
    FormField, 
    Form, 
    FormItem,
    FormControl, 
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatCompletionUserMessageParam } from "openai/resources";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils"
import { BotAvatar } from "@/components/bot-avatar";
import Sphere from "@/components/8-ball"

const Magic8Page = () => {

    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const userMessage: ChatCompletionUserMessageParam = { role: "user", content: values.prompt };
            const newMessages = [...messages, userMessage];
            
            const response = await axios.post("/api/8-ball", { messages: newMessages });
            setMessages(() => [response.data]);

            form.reset();
        }
        catch (error) {
            //TODO: Open Pro Modal
            console.log(error);
        } finally {
           router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="The All Knowing Magic 8 Ball"
                description="Your future is only one click away"
                icon={EyeIcon}
                iconColor="text-violet-500"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 
                            px-3 md:px-6 focus-within:shadow-sm grid 
                            grid-cols-12 gap-2"
                        >
                            <FormField 
                                name="prompt"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                                className="border-0 outline-none
                                                focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Will I travel in the near future?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Ask
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full 
                        flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <div className="text-muted-foreground text-center text-lg text-bold text-semibold text-opacity-50 text-light">
                            The future awaits
                        </div>    
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div 
                                key={String(message.content)}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg border-black/10 bg-muted"
                                    )}
                            >
                                <BotAvatar />
                                <p className="text-sm">
                                {String(message.content)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <Sphere />
            </div>
        </div>
    )
}


export default Magic8Page;