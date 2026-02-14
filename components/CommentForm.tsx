'use client';

import { useActionState } from 'react';
import { addComment } from '@/app/lib/actions';

const initialState = {
    message: '',
    success: false,
}

export default function CommentForm({ postId }: { postId: string }) {
    const [state, dispatch, isPending] = useActionState(addComment, initialState);

    return (
        <div className="bg-neutral-100 border-[4px] border-black p-6 mt-8">
            <h3 className="font-black italic uppercase text-lg mb-4">Add_Comment</h3>
            <form action={dispatch} className="flex flex-col gap-4">
                <input type="hidden" name="postId" value={postId} />
                <textarea
                    name="content"
                    required
                    placeholder="Join the discussion..."
                    rows={3}
                    className="w-full bg-white border-2 border-neutral-300 p-3 font-mono text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                />

                {state?.message && !state.success && (
                    <p className="text-red-500 font-bold text-xs uppercase">{state.message}</p>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-black text-white font-black italic uppercase px-6 py-2 hover:bg-cyan-400 hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000] border-2 border-transparent hover:border-black transition-all disabled:opacity-50"
                    >
                        {isPending ? 'Posting...' : 'Post_Reply'}
                    </button>
                </div>
            </form>
        </div>
    );
}
