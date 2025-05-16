import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const ContentEditor = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    published: false,
    tags: []
  });

  const editorRef = useRef(null);
  const [tagInput, setTagInput] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await apiRequest("GET", "/api/admin/blog");
      setPosts(response.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!formData.title || !formData.content) {
        toast({
          title: "Validation Error",
          description: "Title and content are required",
          variant: "destructive"
        });
        return;
      }
      
      if (currentPost) {
        // Update existing post
        await apiRequest("PUT", `/api/admin/blog/${currentPost.id}`, formData);
        toast({
          title: "Success",
          description: "Blog post updated successfully"
        });
      } else {
        // Create new post
        await apiRequest("POST", "/api/admin/blog", formData);
        toast({
          title: "Success",
          description: "Blog post created successfully"
        });
      }
      
      // Reset form and refresh posts
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive"
      });
    }
  };

  const editPost = (post) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      featuredImage: post.featuredImage || "",
      published: post.published,
      tags: post.tags || []
    });
    setIsEditing(true);
  };

  const deletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    
    try {
      await apiRequest("DELETE", `/api/admin/blog/${postId}`);
      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setCurrentPost(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      featuredImage: "",
      published: false,
      tags: []
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h3 className="text-2xl font-display font-semibold mb-2">Content Editor</h3>
            <p className="text-gray-300">
              Manage your website's blog content here
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => setIsEditing(true)}
              className="btn-glow bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] px-5 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Create New Post
            </button>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-display font-semibold mb-4">
            {currentPost ? "Edit Post" : "Create New Post"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-300 mb-2">Title</label>
              <input 
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all"
                placeholder="Post title"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-gray-300 mb-2">Content</label>
              <textarea 
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all"
                placeholder="Write your post content here..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-gray-300 mb-2">Excerpt</label>
              <textarea 
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all"
                placeholder="Brief summary of your post (optional)"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="featuredImage" className="block text-gray-300 mb-2">Featured Image URL</label>
              <input 
                type="text"
                id="featuredImage"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="bg-[hsl(var(--accent-purple))]/20 px-3 py-1 rounded-full text-sm flex items-center">
                    {tag}
                    <button 
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input 
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all"
                placeholder="Add tags (press Enter after each tag)"
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-[hsl(var(--accent-purple))] focus:ring-[hsl(var(--accent-purple))]"
              />
              <label htmlFor="published" className="ml-2 block text-gray-300">Publish post</label>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                type="button"
                onClick={resetForm}
                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              
              <button 
                type="submit"
                className="btn-glow bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] px-5 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                {currentPost ? "Update Post" : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-display font-semibold mb-4">Blog Posts</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <svg className="animate-spin h-8 w-8 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-gray-400">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No blog posts found</p>
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-4 text-[hsl(var(--accent-purple))] hover:text-[hsl(var(--accent-blue))] transition-colors"
              >
                Create your first post
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <motion.div 
                  key={post.id}
                  className="glass-darker rounded-lg p-4 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">{post.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(post.createdAt).toLocaleDateString()} 
                        {post.published ? 
                          <span className="ml-2 text-green-400">• Published</span> : 
                          <span className="ml-2 text-yellow-400">• Draft</span>
                        }
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => editPost(post)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Edit post"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-gray-400 hover:text-red-400"
                        aria-label="Delete post"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {post.excerpt && (
                    <p className="text-gray-300 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-[hsl(var(--accent-purple))]/10 px-2 py-0.5 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;