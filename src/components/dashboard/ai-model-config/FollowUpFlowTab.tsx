import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  Search,
  Tag,
  ArrowRight,
  HelpCircle,
  Check,
  X,
  Workflow,
} from "lucide-react";
import { FollowUpFlowTabProps, FollowUpQuestion } from "./types";

const FollowUpFlowTab: React.FC<FollowUpFlowTabProps> = ({
  followUpQuestions,
  setFollowUpQuestions,
  currentConfig,
  onConfigChange,
  onToggleFollowUpQuestion,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewQuestionDialog, setShowNewQuestionDialog] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<FollowUpQuestion | null>(null);
  const [newQuestion, setNewQuestion] = useState<{
    question: string;
    context: string;
  }>({
    question: "",
    context: "",
  });

  // Filter questions based on search query
  const filteredQuestions = followUpQuestions.filter((question) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.context.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle creating a new question
  const handleCreateQuestion = () => {
    const newQuestionObj: FollowUpQuestion = {
      id: `fq${followUpQuestions.length + 1}`,
      question: newQuestion.question,
      context: newQuestion.context,
      isDefault: false,
    };

    setFollowUpQuestions([...followUpQuestions, newQuestionObj]);
    setShowNewQuestionDialog(false);
    setNewQuestion({
      question: "",
      context: "",
    });
  };

  // Handle updating an existing question
  const handleUpdateQuestion = () => {
    if (!editingQuestion) return;

    const updatedQuestions = followUpQuestions.map((question) =>
      question.id === editingQuestion.id ? editingQuestion : question
    );

    setFollowUpQuestions(updatedQuestions);
    setEditingQuestion(null);
  };

  // Handle deleting a question
  const handleDeleteQuestion = (id: string) => {
    // Remove from selected questions if it's currently selected
    if (currentConfig.selectedFollowUpQuestionIds.includes(id)) {
      onToggleFollowUpQuestion(id);
    }

    const updatedQuestions = followUpQuestions.filter((question) => question.id !== id);
    setFollowUpQuestions(updatedQuestions);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Follow-Up Questions Toggle - 12 cols */}
        <Card className="md:col-span-12 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-lg">
                  <span className="mr-2 h-5 w-5 text-[#D8A23B]">🔄</span>
                  Follow-Up Questions
                </CardTitle>
                <CardDescription>
                  Enable or disable automated follow-up questions
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="follow-up-toggle" className="cursor-pointer">
                  {currentConfig.enableFollowUpQuestions ? "Enabled" : "Disabled"}
                </Label>
                <Switch
                  id="follow-up-toggle"
                  checked={currentConfig.enableFollowUpQuestions}
                  onCheckedChange={(checked) =>
                    onConfigChange("enableFollowUpQuestions", checked)
                  }
                  className="data-[state=checked]:bg-[#D8A23B]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-md border">
              <div className="h-10 w-10 rounded-full bg-[#D8A23B]/20 flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-[#D8A23B]" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium">What are follow-up questions?</h3>
                <p className="text-sm text-muted-foreground">
                  Follow-up questions are automatically suggested to users after the AI responds.
                  They help guide the conversation and encourage users to explore related topics.
                  You can select which questions to include based on the context of the conversation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Management - 7 cols */}
        <Card className="md:col-span-7 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-lg">
                  <span className="mr-2 h-5 w-5 text-[#D8A23B]">❓</span>
                  Question Library
                </CardTitle>
                <CardDescription>
                  Create and manage follow-up questions
                </CardDescription>
              </div>
              <Button 
                onClick={() => setShowNewQuestionDialog(true)}
                className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
              >
                <Plus className="h-4 w-4 mr-2" /> New Question
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No follow-up questions found matching your search.
                </div>
              ) : (
                filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      currentConfig.selectedFollowUpQuestionIds.includes(question.id)
                        ? "bg-[#D8A23B]/10 border-[#D8A23B]/30"
                        : "bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{question.question}</h3>
                          {question.isDefault && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Tag className="h-3.5 w-3.5" />
                          <span>Context: {question.context}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingQuestion(question)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="h-8 w-8"
                          disabled={question.isDefault}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onToggleFollowUpQuestion(question.id)}
                          className={`h-8 w-8 ${
                            currentConfig.selectedFollowUpQuestionIds.includes(question.id)
                              ? "text-[#D8A23B]"
                              : ""
                          }`}
                        >
                          {currentConfig.selectedFollowUpQuestionIds.includes(question.id) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Selected Questions - 5 cols */}
        <Card className="md:col-span-5 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-2">
            <CardTitle className="flex items-center text-lg">
              <span className="mr-2 h-5 w-5 text-[#D8A23B]">📋</span>
              Selected Questions
            </CardTitle>
            <CardDescription>
              Questions that will be suggested to users
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {!currentConfig.enableFollowUpQuestions ? (
              <div className="p-4 bg-muted/30 rounded-md border text-center">
                <HelpCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-base font-medium">Follow-Up Questions Disabled</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Enable follow-up questions to select which ones to include.
                </p>
                <Button 
                  className="mt-4 bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
                  onClick={() => onConfigChange("enableFollowUpQuestions", true)}
                >
                  Enable Follow-Up Questions
                </Button>
              </div>
            ) : currentConfig.selectedFollowUpQuestionIds.length === 0 ? (
              <div className="p-4 bg-muted/30 rounded-md border text-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-base font-medium">No Questions Selected</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select questions from the library to include them in responses.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {currentConfig.selectedFollowUpQuestionIds.map((id, index) => {
                  const question = followUpQuestions.find((q) => q.id === id);
                  if (!question) return null;

                  return (
                    <div
                      key={question.id}
                      className="p-3 rounded-md bg-[#D8A23B]/10 border border-[#D8A23B]/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-[#D8A23B]/20 flex items-center justify-center text-xs font-medium text-[#D8A23B]">
                            {index + 1}
                          </div>
                          <span className="font-medium">{question.question}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onToggleFollowUpQuestion(question.id)}
                          className="h-7 w-7 hover:bg-[#D8A23B]/20 hover:text-[#D8A23B]"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-1 ml-7 text-xs text-muted-foreground">
                        Context: {question.context}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {currentConfig.enableFollowUpQuestions && (
              <div className="mt-6 p-4 bg-muted/10 rounded-md border">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/30 rounded-md border">
                    <p className="text-sm">
                      Based on your question about our product features, here's what you need to know...
                      [AI response content would appear here]
                    </p>
                  </div>
                  
                  {currentConfig.selectedFollowUpQuestionIds.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Follow-up questions:</p>
                      <ul className="space-y-2">
                        {currentConfig.selectedFollowUpQuestionIds.map((id) => {
                          const question = followUpQuestions.find((q) => q.id === id);
                          if (!question) return null;
                          
                          return (
                            <li key={question.id} className="flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-[#D8A23B]" />
                              <span className="text-sm">{question.question}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No follow-up questions will be shown.
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* New Question Dialog */}
      <Dialog open={showNewQuestionDialog} onOpenChange={setShowNewQuestionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Follow-Up Question</DialogTitle>
            <DialogDescription>
              Create a new follow-up question for your AI assistant.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="question-text" className="text-right">
                Question
              </Label>
              <Input
                id="question-text"
                value={newQuestion.question}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, question: e.target.value })
                }
                placeholder="e.g., Would you like to learn more about our pricing plans?"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="question-context" className="text-right pt-2">
                Context
              </Label>
              <Textarea
                id="question-context"
                value={newQuestion.context}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, context: e.target.value })
                }
                placeholder="e.g., pricing, plans, subscription, cost"
                className="col-span-3 min-h-[100px]"
              />
              <div className="col-start-2 col-span-3 text-xs text-muted-foreground">
                Enter keywords that indicate when this question should be suggested,
                separated by commas.
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowNewQuestionDialog(false);
                setNewQuestion({
                  question: "",
                  context: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleCreateQuestion}
              disabled={!newQuestion.question || !newQuestion.context}
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
            >
              Create Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Question Dialog */}
      <Dialog
        open={!!editingQuestion}
        onOpenChange={(open) => {
          if (!open) setEditingQuestion(null);
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Follow-Up Question</DialogTitle>
            <DialogDescription>
              Update the follow-up question details.
            </DialogDescription>
          </DialogHeader>
          {editingQuestion && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-question-text" className="text-right">
                  Question
                </Label>
                <Input
                  id="edit-question-text"
                  value={editingQuestion.question}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-question-context" className="text-right pt-2">
                  Context
                </Label>
                <Textarea
                  id="edit-question-context"
                  value={editingQuestion.context}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      context: e.target.value,
                    })
                  }
                  className="col-span-3 min-h-[100px]"
                />
                <div className="col-start-2 col-span-3 text-xs text-muted-foreground">
                  Enter keywords that indicate when this question should be suggested,
                  separated by commas.
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingQuestion(null)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleUpdateQuestion}
              disabled={!editingQuestion?.question || !editingQuestion?.context}
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
            >
              Update Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowUpFlowTab;
