'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import '@/app/globals.css'
import Sphere from "@/components/8-ball"
import { Button } from '@/components/ui/button';
import { z } from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { 
    FormField, 
    Form, 
    FormItem,
    FormControl, 
} from "@/components/ui/form";
import { useState } from "react";
import { ChatCompletionUserMessageParam } from "openai/resources";
import { cn } from "@/lib/utils"
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

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
            
            const response = await axios.post("/api/conversation", { messages: newMessages });
            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        }
        catch (error) {
            //TODO: Open Pro Modal
            console.log(error);
        } finally {
           router.refresh();
        }
    }

    return(
        <div>
            <div className="mt-30 space-y-4 w-full content-center">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Ask the Magic 8 Ball
                </h2>
                <div>
                    <div className='m-10'>
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
                                                placeholder="How do I calculate the radius of a cirlce?"
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
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div 
                                key={String(message.content)}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                                    )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">
                                {String(message.content)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                    <div className="prevent-select flex flex-col items-center justify-top">
                        <Sphere />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Magic8Page;