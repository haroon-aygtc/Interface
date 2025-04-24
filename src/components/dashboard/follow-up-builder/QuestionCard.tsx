import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, MessageSquare, Tag, Copy } from "lucide-react";

export type AnswerType = 'text' | 'link' | 'button' | 'card';

export interface FollowUpAnswer {
  id: string;
  type: AnswerType;
  content: string;
  metadata?: {
    url?: string;
    buttonStyle?: 'primary' | 'secondary' | 'outline';
    imageUrl?: string;
    title?: string;
    description?: string;
  };
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  context: string;
  answers?: FollowUpAnswer[];
  isDefault?: boolean;
  category?: string;
}

interface QuestionCardProps {
  question: FollowUpQuestion;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (question: FollowUpQuestion) => void;
  onDelete: (id: string) => void;
  onDuplicate: (question: FollowUpQuestion) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  return (
    <Card className={`transition-colors ${isSelected
      ? "bg-[#D8A23B]/10 border-[#D8A23B]/30"
      : "bg-card hover:bg-muted/50"
      }`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id={`select-${question.id}`}
              checked={isSelected}
              onCheckedChange={() => onSelect(question.id)}
              className="data-[state=checked]:bg-[#D8A23B] data-[state=checked]:border-[#D8A23B]"
            />
            <div>
              <CardTitle className="text-base">{question.question}</CardTitle>
              <CardDescription className="text-xs mt-1">
                Context: {question.context}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {question.isDefault && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                Default
              </Badge>
            )}
            {question.category && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">
                {question.category}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {question.answers && question.answers.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-medium text-muted-foreground mb-1">Suggested Answers:</p>
            <ul className="space-y-2">
              {question.answers.map((answer, index) => (
                <li key={index} className="text-sm">
                  {answer.type === 'text' && (
                    <div className="pl-3 border-l-2 border-[#D8A23B]/30">
                      {answer.content}
                    </div>
                  )}

                  {answer.type === 'link' && (
                    <div className="pl-3 border-l-2 border-blue-300 flex items-center">
                      <span className="text-blue-500 underline">{answer.content}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        → {answer.metadata?.url || '#'}
                      </span>
                    </div>
                  )}

                  {answer.type === 'button' && (
                    <div className="pl-3 border-l-2 border-green-300">
                      <Badge
                        className={`${answer.metadata?.buttonStyle === 'primary'
                          ? 'bg-[#D8A23B] text-[#09090B]'
                          : answer.metadata?.buttonStyle === 'secondary'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-muted text-muted-foreground'}`}
                      >
                        {answer.content}
                      </Badge>
                    </div>
                  )}

                  {answer.type === 'card' && (
                    <div className="pl-3 border-l-2 border-purple-300">
                      <div className="bg-muted/30 rounded-md p-2 text-xs">
                        <div className="font-medium">{answer.metadata?.title || 'Card'}</div>
                        <div className="text-muted-foreground">{answer.content}</div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDuplicate(question)}
          className="h-8 px-2 text-xs"
        >
          <Copy className="h-3.5 w-3.5 mr-1" />
          Duplicate
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(question)}
          className="h-8 px-2 text-xs"
        >
          <Edit className="h-3.5 w-3.5 mr-1" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(question.id)}
          className="h-8 px-2 text-xs text-destructive hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
