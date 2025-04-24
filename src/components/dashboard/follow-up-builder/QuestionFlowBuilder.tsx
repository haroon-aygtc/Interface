import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Save,
  Trash2,
  ArrowRight,
  MessageSquare,
  Workflow,
  MoveHorizontal,
  ArrowDown
} from "lucide-react";
import { FollowUpQuestion } from "./QuestionCard";

interface QuestionFlow {
  id: string;
  name: string;
  description: string;
  questions: string[];
  isActive: boolean;
  position: "start" | "inline" | "end";
}

interface QuestionFlowBuilderProps {
  questions: FollowUpQuestion[];
  flows: QuestionFlow[];
  onSaveFlow: (flow: QuestionFlow) => void;
  onDeleteFlow: (id: string) => void;
  onActivateFlow: (id: string, active: boolean) => void;
}

const QuestionFlowBuilder: React.FC<QuestionFlowBuilderProps> = ({
  questions,
  flows,
  onSaveFlow,
  onDeleteFlow,
  onActivateFlow,
}) => {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedFlow, setSelectedFlow] = useState<QuestionFlow | null>(null);
  const [newFlow, setNewFlow] = useState<QuestionFlow>({
    id: `flow-${Date.now()}`,
    name: "",
    description: "",
    questions: [],
    isActive: false,
    position: "end",
  });

  const handleAddQuestion = (questionId: string) => {
    if (activeTab === "create") {
      setNewFlow(prev => ({
        ...prev,
        questions: [...prev.questions, questionId]
      }));
    } else if (selectedFlow) {
      setSelectedFlow(prev => ({
        ...prev!,
        questions: [...prev!.questions, questionId]
      }));
    }
  };

  const handleRemoveQuestion = (index: number) => {
    if (activeTab === "create") {
      setNewFlow(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
    } else if (selectedFlow) {
      setSelectedFlow(prev => ({
        ...prev!,
        questions: prev!.questions.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSaveFlow = () => {
    if (activeTab === "create") {
      onSaveFlow({
        ...newFlow,
        id: `flow-${Date.now()}`
      });
      setNewFlow({
        id: `flow-${Date.now()}`,
        name: "",
        description: "",
        questions: [],
        isActive: false,
        position: "end",
      });
    } else if (selectedFlow) {
      onSaveFlow(selectedFlow);
      setSelectedFlow(null);
    }
  };

  const handleSelectFlow = (flow: QuestionFlow) => {
    setSelectedFlow(flow);
    setActiveTab("edit");
  };

  const getPositionLabel = (position: string) => {
    switch (position) {
      case "start": return "At Start";
      case "inline": return "Inline";
      case "end": return "At End";
      default: return position;
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case "start": return <ArrowRight className="h-3 w-3" />;
      case "inline": return <MoveHorizontal className="h-3 w-3" />;
      case "end": return <ArrowDown className="h-3 w-3" />;
      default: return null;
    }
  };

  const isFlowValid = (flow: QuestionFlow) => {
    return flow.name.trim() !== "" && flow.questions.length > 0;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Flow
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Manage Flows
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Create New Question Flow</h2>
              <p className="text-muted-foreground">
                Define a sequence of follow-up questions to present to users
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="flow-name">Flow Name</Label>
                  <Input
                    id="flow-name"
                    value={newFlow.name}
                    onChange={(e) => setNewFlow({ ...newFlow, name: e.target.value })}
                    placeholder="e.g., Product Inquiry Flow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flow-position">Position</Label>
                  <Select
                    value={newFlow.position}
                    onValueChange={(value: "start" | "inline" | "end") =>
                      setNewFlow({ ...newFlow, position: value })
                    }
                  >
                    <SelectTrigger id="flow-position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">At Start of Conversation</SelectItem>
                      <SelectItem value="inline">Inline (During Conversation)</SelectItem>
                      <SelectItem value="end">At End of Conversation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="flow-description">Description</Label>
                <Input
                  id="flow-description"
                  value={newFlow.description}
                  onChange={(e) => setNewFlow({ ...newFlow, description: e.target.value })}
                  placeholder="e.g., Questions about product features and pricing"
                />
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <Label>Selected Questions</Label>
                  <span className="text-xs text-muted-foreground">
                    {newFlow.questions.length} questions selected
                  </span>
                </div>

                {newFlow.questions.length === 0 ? (
                  <div className="border rounded-md p-4 text-center text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No questions selected yet</p>
                    <p className="text-xs mt-1">Select questions from the list below</p>
                  </div>
                ) : (
                  <div className="border rounded-md p-4 space-y-2">
                    {newFlow.questions.map((questionId, index) => {
                      const question = questions.find(q => q.id === questionId);
                      return question ? (
                        <div key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-[#D8A23B]/10 text-[#D8A23B] border-[#D8A23B]/30">
                              {index + 1}
                            </Badge>
                            <span>{question.question}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveQuestion(index)}
                            className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-4">
                <Label>Available Questions</Label>
                <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto space-y-2">
                  {questions.filter(q => !newFlow.questions.includes(q.id)).map((question) => (
                    <div key={question.id} className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{question.question}</p>
                        <p className="text-xs text-muted-foreground">Context: {question.context}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAddQuestion(question.id)}
                        className="h-8 px-2"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))}
                  {questions.filter(q => !newFlow.questions.includes(q.id)).length === 0 && (
                    <div className="text-center text-muted-foreground py-4">
                      <p>All questions have been added to the flow</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSaveFlow}
                  disabled={!isFlowValid(newFlow)}
                  className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Flow
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Manage Question Flows</h2>
              <p className="text-muted-foreground">
                View, edit, and activate your question flows
              </p>
            </div>
            {flows.length === 0 ? (
              <div className="border rounded-md p-8 text-center text-muted-foreground">
                <Workflow className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No flows created yet</p>
                <p className="text-sm mt-1 mb-4">Create your first question flow to get started</p>
                <Button
                  onClick={() => setActiveTab("create")}
                  className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Flow
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedFlow ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Edit Flow</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFlow(null)}
                      >
                        Back to List
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-flow-name">Flow Name</Label>
                        <Input
                          id="edit-flow-name"
                          value={selectedFlow.name}
                          onChange={(e) => setSelectedFlow({ ...selectedFlow, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-flow-position">Position</Label>
                        <Select
                          value={selectedFlow.position}
                          onValueChange={(value: "start" | "inline" | "end") =>
                            setSelectedFlow({ ...selectedFlow, position: value })
                          }
                        >
                          <SelectTrigger id="edit-flow-position">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="start">At Start of Conversation</SelectItem>
                            <SelectItem value="inline">Inline (During Conversation)</SelectItem>
                            <SelectItem value="end">At End of Conversation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-flow-description">Description</Label>
                      <Input
                        id="edit-flow-description"
                        value={selectedFlow.description}
                        onChange={(e) => setSelectedFlow({ ...selectedFlow, description: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <Label>Selected Questions</Label>
                        <span className="text-xs text-muted-foreground">
                          {selectedFlow.questions.length} questions selected
                        </span>
                      </div>

                      {selectedFlow.questions.length === 0 ? (
                        <div className="border rounded-md p-4 text-center text-muted-foreground">
                          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No questions selected yet</p>
                          <p className="text-xs mt-1">Select questions from the list below</p>
                        </div>
                      ) : (
                        <div className="border rounded-md p-4 space-y-2">
                          {selectedFlow.questions.map((questionId, index) => {
                            const question = questions.find(q => q.id === questionId);
                            return question ? (
                              <div key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-[#D8A23B]/10 text-[#D8A23B] border-[#D8A23B]/30">
                                    {index + 1}
                                  </Badge>
                                  <span>{question.question}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveQuestion(index)}
                                  className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>Available Questions</Label>
                      <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto space-y-2">
                        {questions.filter(q => !selectedFlow.questions.includes(q.id)).map((question) => (
                          <div key={question.id} className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                            <div className="flex-1">
                              <p className="text-sm font-medium">{question.question}</p>
                              <p className="text-xs text-muted-foreground">Context: {question.context}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAddQuestion(question.id)}
                              className="h-8 px-2"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        ))}
                        {questions.filter(q => !selectedFlow.questions.includes(q.id)).length === 0 && (
                          <div className="text-center text-muted-foreground py-4">
                            <p>All questions have been added to the flow</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => onDeleteFlow(selectedFlow.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Flow
                      </Button>
                      <Button
                        onClick={handleSaveFlow}
                        disabled={!isFlowValid(selectedFlow)}
                        className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {flows.map((flow) => (
                      <div key={flow.id} className="border rounded-md p-4 hover:border-[#D8A23B]/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{flow.name}</h3>
                              <Badge variant="outline" className="flex items-center gap-1 bg-muted/50">
                                {getPositionIcon(flow.position)}
                                {getPositionLabel(flow.position)}
                              </Badge>
                              {flow.isActive && (
                                <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{flow.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onActivateFlow(flow.id, !flow.isActive)}
                              className={flow.isActive ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" : ""}
                            >
                              {flow.isActive ? "Deactivate" : "Activate"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSelectFlow(flow)}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-medium text-muted-foreground mb-2">Questions ({flow.questions.length}):</p>
                          <div className="space-y-1">
                            {flow.questions.slice(0, 3).map((questionId, index) => {
                              const question = questions.find(q => q.id === questionId);
                              return question ? (
                                <div key={index} className="text-sm flex items-center gap-2">
                                  <Badge variant="outline" className="h-5 w-5 flex items-center justify-center p-0 rounded-full">
                                    {index + 1}
                                  </Badge>
                                  <span>{question.question}</span>
                                </div>
                              ) : null;
                            })}
                            {flow.questions.length > 3 && (
                              <div className="text-sm text-muted-foreground ml-7">
                                +{flow.questions.length - 3} more questions
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestionFlowBuilder;
