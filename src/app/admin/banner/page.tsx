"use client";
// pages/banner.tsx
// Import the necessary modules
import { useState } from "react";

// Declare the component and its types
export default function BannerPage() {
  // State for the selected file and uploading status
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handle file input change
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile: File = e.target.files[0];
      setFile(selectedFile);
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make a POST request to the server endpoint
      const response = await fetch("/api/create", {
        method: "POST",
        body: formData,
      });

      // Parse the response JSON
      const data = await response.json();
      console.log(data.status);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }

  // Render the component
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleUploadImage} />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </>
  );
}
