"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ChevronRight, Loader2, Mail, Trash2, } from "lucide-react";
import { Message } from "@/models/User.model";
import { useState } from "react";
import { Alata } from "next/font/google";
import axios from "axios";

const alata = Alata({
    subsets: ["latin"],
    weight: "400",
});

type MessageType = {
    _id: string;
    content: string;
    createdAt: string | Date;
    isRead: boolean;
};

type MessageCardProps = {
    messages: MessageType;
    onMessageDelete: (messageId: string) => void;
    onMessageRead: (messageId: string) => void;
};

const MessageCard = ({ messages, onMessageDelete, onMessageRead }: MessageCardProps) => {
    const [messageOpen, setMessageOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    

    // Open message
    const handleOpenMessage = async () => {
        try {
            if (!messages.isRead) {
                await axios.patch(`/api/read-messages`, { messageId: messages._id });
                onMessageRead(messages._id.toString());
            }

            setMessageOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    // Open delete confirmation
    const handleDeleteClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        setDeleteOpen(true);
    };

    // Delete message
    const handleDelete = async () => {
        setIsLoading(true);

        const start = Date.now();
        const elapsed = Date.now() - start;

        if (elapsed < 1000) {
            await new Promise((resolve) =>
                setTimeout(resolve, 1000 - elapsed)
            );
        }

        await onMessageDelete(
            messages._id.toString()
        );

        setIsLoading(false);
        setDeleteOpen(false);
        setMessageOpen(false);
    };

    // Format date
    const formattedDate = new Date(
        messages.createdAt
    ).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
    });

    return (
        <>
            {/* MESSAGE LIST ITEM */}

            <div onClick={handleOpenMessage}
                className="group relative w-full cursor-pointer flex items-center justify-between gap-4 px-2 py-3 bg-white border-b border-[#F3DCE7] transition-all duration-300 hover:bg-[#FFF8FB]"
            >
                {/* LEFT SIDE */}

                <div className=" flex min-w-0 items-center gap-4">
                    {/* Mail Icon */}

                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${messages.isRead
                            ? "bg-[#F5F5F5]"
                            : "bg-[#FFE4F1]"
                            }`}
                    >
                        <Mail
                            className={`h-5 w-5 ${messages.isRead
                                ? "text-[#737373]"
                                : "text-[#ED1C7D]"}`}
                        />
                    </div>

                    {/* Text */}

                    <div className="min-w-0">
                        <div className="flex items-center gap-1">
                            <p className={`truncate text-[15px] ${messages.isRead ? "font-medium text-[#525252]" : "font-semibold text-[#171717] "}`}>
                                {messages.isRead
                                    ? "You opened this tell"
                                    : "You received a new tell"}
                            </p>

                            {/* Unread Dot */}

                            {!messages.isRead && (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-[#ED1C7D]" />
                            )}
                        </div>

                        <p className="mt-1 text-sm text-[#A3A3A3]">
                            Anonymous message  <br /> {formattedDate}
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}

                <div className="flex shrink-0 items-center gap-2">
                    {/* Delete Button */}

                    <Button type="button" variant="ghost" size="icon" onClick={handleDeleteClick} className="h-9 w-9 rounded-full text-[#A3A3A3] hover:bg-red-50 hover:text-red-500 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                    </Button>

                    {/* Arrow */}

                    <ChevronRight className="h-5 w-5 text-[#A3A3A3] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ED1C7D]" />
                </div>
            </div>


            {/* DELETE CONFIRMATION */}

            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>

                <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-[2rem] border border-[#F5D9E5] bg-white p-0 overflow-hidden shadow-[0_25px_80px_rgba(237,28,125,0.15)]">

                    <div className="px-6 py-7 sm:px-8 sm:py-8">

                        {/* Icon */}
                        <div className="flex justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE4F1] ring-8 ring-[#FFF8FB]">
                                <Trash2 className="h-6 w-6 text-[#ED1C7D]" />
                            </div>
                        </div>

                        {/* Content */}
                        <AlertDialogHeader className="mt-6 text-center">
                            <AlertDialogTitle className="text-xl font-semibold tracking-tight text-[#171717]">
                                Delete this tell?
                            </AlertDialogTitle>

                            <AlertDialogDescription className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#737373]">
                                Are you sure you want to delete this anonymous message? Once deleted, you won't be able to recover it.
                            </AlertDialogDescription>

                        </AlertDialogHeader>

                        {/* Buttons */}
                        <AlertDialogFooter className="mt-4 flex justify-center items-center flex-col-reverse sm:flex-row sm:justify-center bg-white">
                            {/* Cancel */}
                            <AlertDialogCancel
                                disabled={isLoading}
                                className="m-0 h-11 w-fit rounded-full border border-[#EDEDED] bg-white px-6 text-sm font-medium text-[#525252] shadow-none transition-all duration-200 hover:border-[#F3DCE7] hover:bg-[#FFF8FB] cursor-pointer">
                                Keep it
                            </AlertDialogCancel>

                            {/* Delete */}
                            <AlertDialogAction onClick={(e) => { e.preventDefault(); handleDelete(); }} disabled={isLoading}
                                className="m-0 h-11 w-fit rounded-full border-0 bg-[#ED1C7D] px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(237,28,125,0.20)] transition-all duration-200 hover:bg-[#D91870] hover:shadow-[0_10px_25px_rgba(237,28,125,0.28 disabled:opacity-70 cursor-pointer">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-4 w-4" />
                                        Delete tell
                                    </>
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>

                    </div>
                </AlertDialogContent>
            </AlertDialog>



            {/* MESSAGE POPUP */}

            <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
                <DialogContent className={`w-[calc(100%-3rem)] max-w-lg rounded-[2rem] p-0 overflow-hidden shadow-[0_8px_32px_rgba(15,14,66,0.08)] ${alata.className}`}>

                    {/* HEADER */}

                    <div className="bg-[#e41274] px-3 py-6 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-[23px] text-center font-bold tracking-normal text-white">
                                Send me anonymous message
                            </DialogTitle>

                            <DialogDescription className="mt-1 text-sm text-center text-white/75">
                                Someone sent you an anonymous tell 💌
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* MESSAGE */}

                    <div className="px-6">
                        <div className="rounded-[1.5rem] border border-[#F1E5EA] bg-white p-5 shadow-[0_5px_25px_rgba(15,14,66,0.05)]">
                            <p className="whitespace-pre-wrap text-wrap break-all text-[17px] leading-6 font-semibold tracking-wide text-[#404040]">
                                {messages.content}
                            </p>
                        </div>

                        {/* DATE + ANONYMOUS */}

                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-xs text-[#A3A3A3]">
                                {formattedDate}
                            </p>


                        </div>

                        {/* ACTIONS */}

                        <div className="py-3 flex justify-end gap-3">

                            {/* Close */}

                            <Button variant="ghost" onClick={() => setMessageOpen(false)} className="rounded-full px-5 text-[#3b3b3b] border-0 bg-gray-100 cursor-pointer">
                                Close
                            </Button>

                            {/* Delete */}

                            <Button onClick={() => { setMessageOpen(false); setDeleteOpen(true); }} disabled={isLoading} className="rounded-full border-0 bg-[#FFE4F1] text-[#ED1C7D] hover:bg-[#FBD5E7] cursor-pointer">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MessageCard;

