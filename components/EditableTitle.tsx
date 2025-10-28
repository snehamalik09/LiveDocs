"use client";
import { useState } from "react";
import { useUpdateDocumentMutation } from "@/store/documentApi";


const EditableTitle = ({ id, initialTitle }: {id: string; initialTitle: string;}) => {

  const [title, setTitle] = useState(initialTitle || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const [updateDocument] = useUpdateDocumentMutation();

  const handleBlur = async () => {
    setIsEditing(false);

    if (title.trim() !== initialTitle) {
      try {
        console.log("title saved");
        await updateDocument({ id, data:{title} }).unwrap();
      } 
      catch (err) {
        console.error("Failed to update title:", err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="bg-transparent border-b border-gray-400 text-lg font-semibold text-center focus:outline-none"
        />
      ) : (
        <p
          className="document-title cursor-pointer hover:underline text-lg font-semibold"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </p>
      )}
    </div>
  );
};

export default EditableTitle;
