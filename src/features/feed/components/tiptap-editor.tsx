"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapEditorProps {
    content: string;
    onChange: (content: { html: string; text: string }) => void;
    editable?: boolean;
}

export function TiptapEditor({
    content,
    onChange,
    editable = true,
}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        editable,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange({
                html: editor.getHTML(),
                text: editor.getText(),
            });
        },
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 border rounded-md",
            },
        },
    });

    if (!editor) {
        return null;
    }

    if (!editable) {
        return <EditorContent editor={editor} />;
    }

    return (
        <div className="flex flex-col gap-2">
            <EditorContent editor={editor} />
        </div>
    );
}
