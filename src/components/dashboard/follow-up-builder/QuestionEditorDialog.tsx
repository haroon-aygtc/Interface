import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { FollowUpQuestion, FollowUpAnswer, AnswerType } from "./QuestionCard";

interface QuestionEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: FollowUpQuestion | null;
  onSave: (question: FollowUpQuestion) => void;
  isNew?: boolean;
}

const categories = [
  "General",
  "Product",
  "Pricing",
  "Support",
  "Technical",
  "Sales",
  "Other"
];

const QuestionEditorDialog: React.FC<QuestionEditorDialogProps> = ({
  open,
  onOpenChange,
  question,
  onSave,
  isNew = false,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<FollowUpQuestion>({
    id: "",
    question: "",
    context: "",
    answers: [{
      id: `ans-${Date.now()}`,
      type: 'text',
      content: ""
    }],
    isDefault: false,
    category: "General"
  });

  useEffect(() => {
    if (question) {
      setEditedQuestion({
        ...question,
        answers: question.answers || [{
          id: `ans-${Date.now()}`,
          type: 'text',
          content: ""
        }]
      });
    } else {
      setEditedQuestion({
        id: `fq-${Date.now()}`,
        question: "",
        context: "",
        answers: [{
          id: `ans-${Date.now()}`,
          type: 'text',
          content: ""
        }],
        isDefault: false,
        category: "General"
      });
    }
  }, [question, open]);

  const handleAddAnswer = () => {
    setEditedQuestion(prev => ({
      ...prev,
      answers: [...(prev.answers || []), {
        id: `ans-${Date.now()}-${prev.answers?.length || 0}`,
        type: 'text',
        content: ""
      }]
    }));
  };

  const handleRemoveAnswer = (index: number) => {
    setEditedQuestion(prev => ({
      ...prev,
      answers: prev.answers?.filter((_, i) => i !== index)
    }));
  };

  const handleAnswerChange = (index: number, field: string, value: any) => {
    setEditedQuestion(prev => ({
      ...prev,
      answers: prev.answers?.map((answer, i) => {
        if (i === index) {
          if (field === 'type') {
            // Reset metadata when changing type
            return {
              ...answer,
              type: value as AnswerType,
              metadata: {}
            };
          } else if (field.startsWith('metadata.')) {
            const metadataField = field.split('.')[1];
            return {
              ...answer,
              metadata: {
                ...answer.metadata,
                [metadataField]: value
              }
            };
          } else {
            return {
              ...answer,
              [field]: value
            };
          }
        }
        return answer;
      })
    }));
  };

  const handleSave = () => {
    // Filter out empty answers
    const filteredAnswers = editedQuestion.answers?.filter(answer => answer.content.trim() !== "") || [];

    onSave({
      ...editedQuestion,
      answers: filteredAnswers.length > 0 ? filteredAnswers : undefined
    });
    onOpenChange(false);
  };

  const isValid = editedQuestion.question.trim() !== "" && editedQuestion.context.trim() !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isNew ? "Create New Question" : "Edit Question"}</DialogTitle>
          <DialogDescription>
            {isNew
              ? "Create a new follow-up question to suggest to users."
              : "Edit this follow-up question and its suggested answers."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              Question
            </Label>
            <Input
              id="question"
              value={editedQuestion.question}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
              placeholder="e.g., Would you like to learn more about our pricing plans?"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="context" className="text-right">
              Context
            </Label>
            <Textarea
              id="context"
              value={editedQuestion.context}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, context: e.target.value })}
              placeholder="e.g., pricing, plans, subscription, cost"
              className="col-span-3 min-h-[80px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              value={editedQuestion.category}
              onValueChange={(value) => setEditedQuestion({ ...editedQuestion, category: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isDefault" className="text-right">
              Default Question
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="isDefault"
                checked={editedQuestion.isDefault}
                onCheckedChange={(checked) => setEditedQuestion({ ...editedQuestion, isDefault: checked })}
                className="data-[state=checked]:bg-[#D8A23B]"
              />
              <Label htmlFor="isDefault">Make this a default question</Label>
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4 mt-2">
            <div className="text-right">
              <Label>Suggested Answers</Label>
              <p className="text-xs text-muted-foreground mt-1">Optional</p>
            </div>
            <div className="col-span-3 space-y-4">
              {editedQuestion.answers?.map((answer, index) => (
                <div key={index} className="border rounded-md p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label>Answer Type</Label>
                      <Select
                        value={answer.type}
                        onValueChange={(value) => handleAnswerChange(index, 'type', value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="link">Link</SelectItem>
                          <SelectItem value="button">Button</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAnswer(index)}
                      className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`answer-content-${index}`}>Content</Label>
                      <Input
                        id={`answer-content-${index}`}
                        value={answer.content}
                        onChange={(e) => handleAnswerChange(index, 'content', e.target.value)}
                        placeholder={`Answer content`}
                        className="mt-1"
                      />
                    </div>

                    {/* Additional fields based on answer type */}
                    {answer.type === 'link' && (
                      <div>
                        <Label htmlFor={`answer-url-${index}`}>URL</Label>
                        <Input
                          id={`answer-url-${index}`}
                          value={answer.metadata?.url || ''}
                          onChange={(e) => handleAnswerChange(index, 'metadata.url', e.target.value)}
                          placeholder="https://example.com"
                          className="mt-1"
                        />
                      </div>
                    )}

                    {answer.type === 'button' && (
                      <div>
                        <Label htmlFor={`button-style-${index}`}>Button Style</Label>
                        <Select
                          value={answer.metadata?.buttonStyle || 'primary'}
                          onValueChange={(value) => handleAnswerChange(index, 'metadata.buttonStyle', value)}
                        >
                          <SelectTrigger id={`button-style-${index}`} className="mt-1">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="primary">Primary</SelectItem>
                            <SelectItem value="secondary">Secondary</SelectItem>
                            <SelectItem value="outline">Outline</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {answer.type === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`card-title-${index}`}>Card Title</Label>
                          <Input
                            id={`card-title-${index}`}
                            value={answer.metadata?.title || ''}
                            onChange={(e) => handleAnswerChange(index, 'metadata.title', e.target.value)}
                            placeholder="Card Title"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`card-image-${index}`}>Image URL (Optional)</Label>
                          <Input
                            id={`card-image-${index}`}
                            value={answer.metadata?.imageUrl || ''}
                            onChange={(e) => handleAnswerChange(index, 'metadata.imageUrl', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddAnswer}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Answer
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Suggested answers will be shown to the AI to help guide its responses.
                Different answer types provide more interactive options for users.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!isValid}
            className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
          >
            {isNew ? "Create Question" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionEditorDialog;
