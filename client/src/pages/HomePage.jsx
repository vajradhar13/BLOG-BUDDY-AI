import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Lottie from "react-lottie";
import blogAnimation from "../assets/lottie/blogAnimation.json";
import logo from "../assets/logo.png"

function HomePage() {
  const [data, setData] = useState({
    title: "",
    keywords: "",
    wordlimit: 250,
  });

  const [blog, setBlog] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [showInputs, setShowInputs] = useState(true);

  function onChange(e) {
    const { name, value, type } = e.target;
    const newValue =
      type === "number" || type === "range" ? parseInt(value, 10) || 0 : value;
    setData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!data.title.trim() || !data.keywords.trim()) {
      setError("Please fill in both title and keywords");
      return;
    }

    setIsLoading(true);
    setError("");
    setBlog("");
    setCopySuccess("");

    try {
      const response = await axios.post("https://blog-buddy-ai.onrender.com", data);
      setBlog(response.data.candidates[0].content.parts[0].text);
      setShowInputs(false);
    } catch (error) {
      setError("Failed to generate blog post. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function downloadBlog() {
    if (!blog) return;

    const blob = new Blob([blog], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.title || "blog"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function copyToClipboard() {
    if (!blog) return;

    navigator.clipboard.writeText(blog).then(
      () => {
        setCopySuccess("Content copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 3000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  }

  function regenerateBlog() {
    setShowInputs(true);
    setBlog("");
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: blogAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

 return (
    <div className="min-h-screen p-8">
      <div className="mx-auto">
        <div className="mb-8 p-6">
          <div className="flex justify-center gap-3">

         
          <img src={logo} alt="" className="h-10 w-10"/>
          <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-purple-600 mb-4">
            Blog Buddy AI
          </h1>
          </div>
          <p className="text-lg text-gray-300 text-center">
            Transform your ideas into engaging blog posts with our AI-powered platform.
            Simply input your topic, and watch as advanced AI creates compelling content tailored to your needs.
          </p>
        </div>

        {showInputs ? (
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 flex justify-center">
                <div className={`transition-opacity duration-300 ${isLoading ? 'animate-pulse' : ''}`}>
                  <Lottie options={defaultOptions} height={400} width={400} />
                </div>
              </div>

              <div className="md:w-1/2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-900/50 border-l-4 border-red-500 rounded-md">
                      <p className="text-red-300">{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300">Blog Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={data.title}
                      onChange={onChange}
                      placeholder="Enter your blog title"
                      disabled={isLoading}
                      className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-300">Keywords</label>
                    <input
                      type="text"
                      id="keywords"
                      name="keywords"
                      value={data.keywords}
                      onChange={onChange}
                      placeholder="Enter keywords separated by commas"
                      disabled={isLoading}
                      className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="wordlimit" className="block text-sm font-medium text-gray-300">Word Count</label>
                      <span className="text-sm text-violet-400 font-medium">{data.wordlimit} words</span>
                    </div>
                    <input
                      type="range"
                      id="wordlimit"
                      name="wordlimit"
                      min={250}
                      max={1000}
                      step={50}
                      value={data.wordlimit}
                      onChange={onChange}
                      disabled={isLoading}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>250</span>
                      <span>1000</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      'Generate Blog Post'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
          <ReactMarkdown className="prose prose-invert max-w-none mb-6">{blog}</ReactMarkdown>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={downloadBlog}
              className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-emerald-500"
            >
              Download Blog
            </button>
            <button
              onClick={copyToClipboard}
              className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-violet-500"
            >
              Copy Content
            </button>
            <button
              onClick={regenerateBlog}
              className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
            >
              Regenerate Blog
            </button>
          </div>
          {copySuccess && (
            <p className="text-sm text-emerald-400 mt-3 text-center font-medium">
              {copySuccess}
            </p>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

