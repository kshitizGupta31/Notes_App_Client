import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import "./Form.css";

export default function CreateResources() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [website, setWebsite] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const filepathRef = useRef("");

  async function uploadImage() {
    if (!files || files.length === 0) {
      console.log("No file selected");
      return;
    }
    
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "knit");
    data.append("cloud_name", "dcqqcovdd");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcqqcovdd/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }
      
      const imageData = await response.json();
      console.log("Uploaded image URL:", imageData.url);
      filepathRef.current = imageData.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  }

  async function createNewResource(ev) {
    ev.preventDefault();
    
    if (!title || !summary || !content) {
      alert("Please fill in all required fields");
      return;
    }

    setIsUploading(true);

    try {
      // Upload image first
      await uploadImage();

      // Create the resource
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("website", website);
      data.set("cloudpath", filepathRef.current);

      console.log("Creating resource with data:", {
        title,
        summary,
        content,
        website,
        cloudpath: filepathRef.current
      });

      const response = await fetch("http://localhost:4000/resources", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        console.log("Resource created successfully");
        setRedirect(true);
      } else {
        const errorData = await response.json();
        console.error("Failed to create resource:", errorData);
        alert("Failed to create resource. Please try again.");
      }
    } catch (error) {
      console.error("Error creating resource:", error);
      alert("An error occurred while creating the resource.");
    } finally {
      setIsUploading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/resources"} />;
  }

  return (
    <div className="form-container">
      <form id="contact" onSubmit={createNewResource} className="form-card">
        <h2>Create a New Resource</h2>
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Summary *"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Website Link"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input 
          type="file" 
          onChange={(ev) => setFiles(ev.target.files)}
          accept="image/*"
        />
        <ReactQuill 
          value={content} 
          onChange={(newVal) => setContent(newVal)}
          placeholder="Enter resource content..."
        />
        <button 
          type="submit" 
          className="mt-1 createpostbutton"
          disabled={isUploading}
        >
          {isUploading ? "Creating..." : "Create Resource"}
        </button>
      </form>
    </div>
  );
}
