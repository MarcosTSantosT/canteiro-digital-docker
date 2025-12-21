import React from 'react';
import { BookOpen, Library } from 'lucide-react';
import ResizablePanel from './ResizablePanel';
import StudyItem from '../UI/StudyItem';
import './Panels.css';

const ResourcePanel = () => {
  return (
    <ResizablePanel className="full-height">
      <div className="panel-header">
        <h2 className="panel-title">Recursos</h2>
      </div>
      <div className="panel-body scrollable">
        <StudyItem 
          title="Globalization Quiz" 
          subtitle="10 questões" 
          icon={BookOpen}
        />
        <StudyItem 
          title="Globalization Flashcards" 
          subtitle="24 cards • 212 mins" 
          icon={Library}
        />
      </div>
    </ResizablePanel>
  );
};

export default ResourcePanel;