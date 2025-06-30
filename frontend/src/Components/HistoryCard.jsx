import { motion } from "framer-motion";
import { MoreHorizontal, ArrowRight, Clock, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import EditPostModal from "./EditPostModal";
import axios from "axios";

const API_URL = "http://localhost:5000";

const HistoryCard = ({ entry, refreshFeed }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
    setShowTooltip(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
  
      try {
        await axios.delete(`${API_URL}/post/delete/${entry._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        refreshFeed();
      } catch (err) {
        console.error("Error deleting post:", err);
        alert(err.response?.data?.message || "Failed to delete post");
      } finally {
        setIsDeleting(false);
        setShowTooltip(false);
      }
    }
  };
  
  const handleClickOutside = (e) => {
    if (showTooltip) {
      setShowTooltip(false);
    }
  };

  return (
    <motion.div
      className="relative bg-white rounded-lg p-6 shadow-sm mb-6 overflow-hidden border border-gray-100"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }}
      onClick={handleClickOutside}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-black text-white text-xs font-medium px-2.5 py-1 rounded flex items-center">
            <Clock size={12} className="mr-1" />
            <span>{entry.timeperiod}</span>
          </div>
        </div>
        <div className="relative">
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click from triggering parent's onClick
              setShowTooltip(!showTooltip);
            }}
          >
            <MoreHorizontal size={18} />
          </button>

          {showTooltip && (
            <motion.div
              className="absolute right-0 top-8 bg-white shadow-md rounded-md py-2 z-10 w-32 border border-gray-100"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside tooltip from closing it
            >
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 text-gray-700"
                onClick={handleEdit}
              >
                <Edit size={14} className="mr-2" />
                Edit
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 text-red-600"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 size={14} className="mr-2" />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {entry.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{entry.description}</p>

      <div className="flex justify-end mt-2">
        <motion.button
          className="flex items-center text-sm font-medium text-black"
          whileHover={{ x: 3 }}
        >
          Read More
          <ArrowRight size={16} className="ml-1" />
        </motion.button>
      </div>

      <EditPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshFeed={refreshFeed}
        entry={entry}
      />
    </motion.div>
  );
};

export default HistoryCard;
