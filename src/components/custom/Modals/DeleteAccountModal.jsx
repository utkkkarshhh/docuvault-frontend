import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const DeleteAccountModal = ({ isOpen, onClose, onConfirmDelete }) => {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const handleDelete = () => {
    const finalReason = reason === "Other" ? otherReason.trim() : reason;

    if (!finalReason) {
      toast.error("Please select or enter a reason for deletion.");
      return;
    }
    onConfirmDelete(finalReason);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            We're sorry to see you go. Please tell us why you're deleting your
            account:
          </DialogDescription>
        </DialogHeader>
        <RadioGroup
          value={reason}
          onValueChange={setReason}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No longer needed" id="no-longer-needed" />
            <Label htmlFor="no-longer-needed">No longer needed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Too expensive" id="too-expensive" />
            <Label htmlFor="too-expensive">Too expensive</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Not satisfied with service"
              id="not-satisfied"
            />
            <Label htmlFor="not-satisfied">Not satisfied with service</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Found a better alternative"
              id="better-alternative"
            />
            <Label htmlFor="better-alternative">
              Found a better alternative
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Privacy concerns" id="privacy-concerns" />
            <Label htmlFor="privacy-concerns">Privacy concerns</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
        {reason === "Other" && (
          <Textarea
            placeholder="Please specify your reason"
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            className="mt-3"
          />
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
