import React, { useState } from 'react';
import { BookOpen, FileText, Library } from 'lucide-react';
import ResizablePanel from './ResizablePanel';
import StudyItem from '../UI/StudyItem';
import './Panels.css';

const StudyPanel = () => {
  const [studyItems] = useState([
    { id: 1, title: "How To Get the Most Out of This Notebook", subtitle: "2m 5mins", icon: BookOpen },
    { id: 2, title: "The Story of Globalization", subtitle: "3m 10mins", icon: FileText },
    { id: 3, title: "From Hyper-Globalization to Homeland Economic...", subtitle: "2m 15mins", icon: Library },
    { id: 4, title: "The EBs and Flow of Integration: A Historical Review of...", subtitle: "4m 30mins", icon: FileText },
  ]);

  return (
    <ResizablePanel className="full-height">
      <div className="panel-header">
        <h2 className="panel-title">Estudo</h2>
      </div>
      <div className="panel-body scrollable">
        <div className="study-alert">
          <p className="study-alert-text">
            Estas resultados de Studio oferecem uma visão geral e um resumo em áudio do seu notebook
          </p>
        </div>
        <div className="study-items">
          {studyItems.map(item => (
            <StudyItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </ResizablePanel>
  );
};

export default StudyPanel;
