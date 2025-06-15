
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Target } from 'lucide-react';

interface GoalTrackerProps {
  goals: string[];
  expanded?: boolean;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ goals, expanded = false }) => {
  const mockGoalsData = goals.length > 0 ? goals.map((goal, index) => ({
    id: index,
    title: goal,
    progress: Math.floor(Math.random() * 100),
    completed: Math.random() > 0.7,
  })) : [
    { id: 1, title: "Learn a new skill", progress: 65, completed: false },
    { id: 2, title: "Improve work-life balance", progress: 80, completed: false },
    { id: 3, title: "Build stronger relationships", progress: 45, completed: false },
  ];

  if (!expanded && goals.length === 0) {
    return (
      <div className="text-center py-8">
        <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600">No goals set yet. Start by setting your first goal!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mockGoalsData.slice(0, expanded ? undefined : 3).map((goal) => (
        <Card key={goal.id} className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {goal.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
                <h3 className="font-medium text-slate-800">{goal.title}</h3>
              </div>
              <Badge variant={goal.completed ? "default" : "secondary"}>
                {goal.progress}%
              </Badge>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  goal.completed ? 'bg-green-600' : 'bg-blue-600'
                }`}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      
      {expanded && mockGoalsData.length === 0 && (
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No goals set yet. Start by setting your first goal!</p>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;
