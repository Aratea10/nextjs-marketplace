"use client";

import { useOptimistic, useTransition } from "react";
import HeartIcon from "./HeartIcon";
import { likeAdAction } from "@/app/ads/[id]/actions";

type LikeButtonProps = {
    adId: number;
    likes: number;
};

export default function LikeButton({ adId, likes }: LikeButtonProps) {
    const [optimisticLikes, addOptimisticLike] = useOptimistic(
        likes,
        (currentLikes) => currentLikes + 1
    );

    const [, startTransition] = useTransition();

    const handleLike = () => {
        startTransition(async () => {
            addOptimisticLike(null);
            await likeAdAction(adId);
        });
    };

    return (
        <button
            onClick={handleLike}
            className="inline-flex items-center gap-1 hover:scale-110 transition-transform"
        >
            <HeartIcon className="w-5 h-5 text-red-500" /> {optimisticLikes}
        </button>
    );
}
