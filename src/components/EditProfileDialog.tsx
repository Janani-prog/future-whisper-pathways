
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserProfile } from '../types/user';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Edit } from 'lucide-react';

interface EditProfileDialogProps {
  userProfile: UserProfile;
  onProfileUpdate: (updatedProfile: UserProfile) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ userProfile, onProfileUpdate }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    age: userProfile.age,
    currentCareer: userProfile.currentCareer,
    location: userProfile.location,
    relationshipStatus: userProfile.relationshipStatus,
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          age: formData.age,
          current_career: formData.currentCareer,
          location: formData.location,
          relationship_status: formData.relationshipStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const updatedProfile: UserProfile = {
        ...userProfile,
        name: formData.name,
        age: formData.age,
        currentCareer: formData.currentCareer,
        location: formData.location,
        relationshipStatus: formData.relationshipStatus,
      };

      onProfileUpdate(updatedProfile);
      setOpen(false);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-left">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border border-slate-200 shadow-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-900">Edit Profile</DialogTitle>
          <DialogDescription className="text-slate-600">
            Update your profile information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 font-medium">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age" className="text-slate-700 font-medium">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="career" className="text-slate-700 font-medium">Current Career</Label>
            <Input
              id="career"
              value={formData.currentCareer}
              onChange={(e) => handleInputChange('currentCareer', e.target.value)}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="relationship" className="text-slate-700 font-medium">Relationship Status</Label>
            <select
              id="relationship"
              value={formData.relationshipStatus}
              onChange={(e) => handleInputChange('relationshipStatus', e.target.value)}
              className="w-full p-3 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 text-slate-700"
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="dating">Dating</option>
              <option value="committed">In a committed relationship</option>
              <option value="married">Married</option>
              <option value="complicated">It's complicated</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
