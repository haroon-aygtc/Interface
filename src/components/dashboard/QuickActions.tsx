import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Plus, 
  MessageSquare, 
  FileText, 
  Settings, 
  Users, 
  Database,
  Sparkles
} from 'lucide-react';

const QuickActions = () => {
  const { theme } = useTheme();
  
  const actions = [
    {
      title: 'New Chat Widget',
      icon: <MessageSquare className="h-4 w-4" />,
      description: 'Create a new chat widget for your website',
    },
    {
      title: 'Add Knowledge Base',
      icon: <Database className="h-4 w-4" />,
      description: 'Upload documents to your knowledge base',
    },
    {
      title: 'Create Template',
      icon: <FileText className="h-4 w-4" />,
      description: 'Create a new prompt template',
    },
    {
      title: 'Add User',
      icon: <Users className="h-4 w-4" />,
      description: 'Add a new user to your organization',
    },
    {
      title: 'AI Integration',
      icon: <Sparkles className="h-4 w-4" />,
      description: 'Set up a new AI integration',
    }
  ];

  return (
    <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border border-[#D8A23B]/20 ${theme === 'dark' ? 'bg-[#09090B]/30 hover:bg-[#09090B]/50' : 'bg-white hover:bg-[#D8A23B]/5'} transition-colors cursor-pointer group`}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-[#D8A23B]/10 flex items-center justify-center text-[#D8A23B] group-hover:bg-[#D8A23B]/20 transition-colors">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{action.title}</h3>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 w-7 p-0 rounded-full hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full border-[#D8A23B]/30 hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]"
          >
            <Settings className="mr-2 h-4 w-4" />
            Configure Actions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
