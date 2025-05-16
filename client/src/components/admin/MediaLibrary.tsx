import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  description?: string;
  alt?: string;
  uploadedBy: number;
  createdAt: string;
  updatedAt: string;
}

const MediaLibrary = () => {
  const { toast } = useToast();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileDetails, setFileDetails] = useState({
    description: "",
    alt: ""
  });
  const [filter, setFilter] = useState("");

  const fetchMediaItems = async () => {
    try {
      setLoading(true);
      const response = await apiRequest("GET", "/api/admin/media");
      if (response && response.data) {
        setMediaItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching media items:", error);
      toast({
        title: "Error",
        description: "Failed to load media items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size exceeds 5MB limit",
          variant: "destructive"
        });
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Error",
          description: "Only JPEG, PNG, GIF and WebP images are allowed",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFileDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('description', fileDetails.description);
    formData.append('alt', fileDetails.alt);
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const timer = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(timer);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      const response = await apiRequest("POST", "/api/admin/media/upload", formData);
      
      clearInterval(timer);
      setUploadProgress(100);
      
      toast({
        title: "Success",
        description: "File uploaded successfully"
      });
      
      // Reset form and refresh media items
      setSelectedFile(null);
      setFileDetails({ description: "", alt: "" });
      fetchMediaItems();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this media item?")) {
      return;
    }
    
    try {
      await apiRequest("DELETE", `/api/admin/media/${id}`);
      toast({
        title: "Success",
        description: "Media item deleted successfully"
      });
      fetchMediaItems();
    } catch (error) {
      console.error("Error deleting media item:", error);
      toast({
        title: "Error",
        description: "Failed to delete media item",
        variant: "destructive"
      });
    }
  };

  const filteredMedia = mediaItems.filter(item => 
    item.fileName.toLowerCase().includes(filter.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h3 className="text-2xl font-display font-semibold mb-2">Media Library</h3>
            <p className="text-gray-300">
              Upload and manage your images for the website
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search media..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-display font-semibold mb-4">Upload New Image</h3>
          
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label htmlFor="file" className="block text-gray-300 mb-2">Select Image</label>
              <input 
                type="file"
                id="file"
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">Max size: 5MB. Formats: JPEG, PNG, GIF, WebP</p>
            </div>
            
            {selectedFile && (
              <div className="mt-4">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Selected file:</span> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                </p>
                
                {selectedFile.type.startsWith('image/') && (
                  <div className="mt-2 bg-white/5 rounded-lg p-2">
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                      className="max-h-48 rounded-lg mx-auto"
                    />
                  </div>
                )}
              </div>
            )}
            
            <div>
              <label htmlFor="description" className="block text-gray-300 mb-2">Description</label>
              <input 
                type="text"
                id="description"
                name="description"
                value={fileDetails.description}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all"
                placeholder="Brief description of the image"
              />
            </div>
            
            <div>
              <label htmlFor="alt" className="block text-gray-300 mb-2">Alt Text</label>
              <input 
                type="text"
                id="alt"
                name="alt"
                value={fileDetails.alt}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all"
                placeholder="Alternative text for accessibility"
              />
            </div>
            
            {isUploading && (
              <div className="mt-4">
                <div className="w-full bg-white/10 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-center mt-1">{uploadProgress}% Uploaded</p>
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <button 
                type="submit"
                disabled={isUploading || !selectedFile}
                className={`btn-glow bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] px-5 py-2 rounded-lg font-medium hover:shadow-lg transition-all ${(isUploading || !selectedFile) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-display font-semibold mb-4">Media Gallery</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <svg className="animate-spin h-8 w-8 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-gray-400">Loading media...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">
                {filter ? 'No media items match your search' : 'No media items found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredMedia.map(item => (
                <motion.div 
                  key={item.id}
                  className="glass-darker rounded-lg overflow-hidden group relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative pt-[100%]">
                    <img 
                      src={item.filePath} 
                      alt={item.alt || item.fileName} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div>
                      <p className="text-sm font-medium truncate">{item.fileName}</p>
                      {item.description && (
                        <p className="text-xs text-gray-300 mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs">{new Date(item.createdAt).toLocaleDateString()}</span>
                      
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                        aria-label="Delete media item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;