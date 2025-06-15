
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GoalTrackerProps {
  goals: string[];
  expanded?: boolean;
}

const GoalTracker = ({ goals, expanded = false }: GoalTrackerProps) => {
  if (!goals || goals.length === 0) {
    return (
      <div className="text-center text-gray-300">
        <p>No goals set yet. Start by adding some goals to track your progress!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {goals.slice(0, expanded ? goals.length : 3).map((goal, index) => (
        <Card key={index} className="bg-white bg-opacity-20 border-white border-opacity-30">
          <CardContent className="p-3">
            <p className="text-white">{goal}</p>
          </CardContent>
        </Card>
      ))}
      {!expanded && goals.length > 3 && (
        <p className="text-sm text-gray-300 text-center">
          +{goals.length - 3} more goals
        </p>
      )}
    </div>
  );
};

export default GoalTracker;
