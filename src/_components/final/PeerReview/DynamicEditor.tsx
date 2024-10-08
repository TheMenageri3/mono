"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic } from "lucide-react";
import { Button } from "~/_components/final/ui/button";
import { AvatarWithName, AvatarWithNameImage } from "../Avatar";
import { PLACEHOLDER } from "~/lib/utils/constants";

export default function DynamicEditor({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => void;
}) {
  const [title, setTitle] = useState(""); // State for the title
  const [rating, setRating] = useState(0); // State for the rating

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: PLACEHOLDER,
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none max-w-none is-editor-empty",
      },
    },
    immediatelyRender: false,
  });

  const handleCancel = () => {
    if (editor) {
      editor.commands.clearContent();
    }
    setTitle("");
    onClose();
  };

  const handleSend = () => {
    if (editor) {
      const htmlContent = editor.getHTML();
      onSubmit({ title, content: htmlContent });
      console.log({ title, content: htmlContent });
      editor.commands.clearContent();
    }
    setTitle("");
    onClose();
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="mb-4 flex items-center space-x-3">
        <AvatarWithNameImage
          name="Alice Anonymous"
          image="/alice.png"
          textClasses="text-zinc-300"
        />

        {/* <div className="flex space-x-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`text-xl font-bold px-2 py-0 h-auto ${
              editor.isActive("bold")
                ? "bg-zinc-800 text-zinc-200"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 hover:text-zinc-800"
            } `}
          >
            <Bold className="h-5 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`text-xl italic px-3 py-0 h-auto ${
              editor.isActive("italic")
                ? "bg-zinc-800 text-zinc-200"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 hover:text-zinc-900"
            } `}
          >
            <Italic className="h-6 w-3" />
          </button>
        </div> */}
      </div>
      <style jsx global>{`
        .ProseMirror p {
          padding-bottom: 1rem;
          line-height: 1.4;
          padding-inline: 0.5rem;
        }
        .ProseMirror p:last-child {
          margin-bottom: 0;
        }
        .tiptap p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
          font-size: 1rem;
        }
      `}</style>

      <div className="mb-4 flex flex-col">
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Review Title"
          className="mb-1 w-full border-b border-zinc-300 bg-zinc-50 p-2 pl-4 text-lg font-semibold text-zinc-600"
        />
        <input
          id="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min={0}
          max={5}
          step={0.1}
          placeholder="Rating"
          className="mb-1 w-full border-b border-zinc-300 bg-zinc-50 p-2 pl-4 text-lg font-semibold text-zinc-600"
        />
      </div>
      <EditorContent
        editor={editor}
        className="h-[200px] min-h-[100px] w-full overflow-auto bg-zinc-50 p-2 text-base text-zinc-600 focus:outline-none md:h-[520px]"
      />
      <div className="mt-4 flex items-center justify-end space-x-4">
        <Button
          size="lg"
          className="bg-zinc-300 text-zinc-700 hover:bg-zinc-300/80"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </>
  );
}
