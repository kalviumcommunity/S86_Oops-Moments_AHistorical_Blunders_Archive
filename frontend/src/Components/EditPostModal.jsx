import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import axios from 'axios';

const API_URL = "http://localhost:5000"; 

const EditPostModal = ({ isOpen, onClose, entry, refreshFeed }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeperiod: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form data with entry values when component mounts or entry changes
  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title || '',
        description: entry.description || '',
        timeperiod: entry.timeperiod || ''
      });
    }
  }, [entry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditPost = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.put(`${API_URL}/post/edit/${entry._id}`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Post updated:', response.data);
      refreshFeed();
      onClose(); 
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      console.error('Error updating post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <Input 
            name="title"
            placeholder="Post Title" 
            value={formData.title} 
            onChange={handleChange} 
            className="border-slate-900 focus:ring-slate-800"
          />
          <Textarea 
            name="description"
            placeholder="Write your post..." 
            value={formData.description} 
            onChange={handleChange} 
            rows={4} 
            className="border-slate-900 focus:ring-slate-800 max-h-100 max-w-115"
          />
          <Input
            type="number"
            name="timeperiod"
            placeholder="Time Period (in days)"
            value={formData.timeperiod}
            onChange={handleChange}
            min="1"
            className="border-slate-900 focus:ring-slate-800"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleEditPost} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;