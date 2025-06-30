import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Webhook, Pencil, Home, Search, Settings, User } from 'lucide-react';
import { Button } from './ui/button';
import CreatePostModal from './CreatePostModal';

const BlogNavFAB = ({refreshFeed}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Pencil, label: 'Create Post' },
    { icon: Search, label: 'Search' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' }
  ];

  const handleNavClick = (label) => {
    if (label === 'Create Post') {
      setIsModalOpen(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div className="fixed right-10 bottom-20 z-50">
      <motion.div 
        initial={false}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="h-[3.5rem] w-[3.5rem] rounded-md shadow-lg bg-black text-white hover:bg-gray-800 hover:text-white  border-slate-300 border-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div 
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Webhook className="h-8 w-8" />
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="absolute right-0 bottom-full mb-4 flex flex-col space-y-2"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={() => handleNavClick(item.label)}
              >
                <motion.div 
                  className="bg-white border border-black shadow-lg rounded-md p-3 hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="h-6 w-6 text-black" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Post Modal Component */}
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false) } refreshFeed={refreshFeed}/>
    </div>
  );
};

export default BlogNavFAB;
