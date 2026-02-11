import React from 'react';

export interface StaffProfile {
  id: string;
  role: string;
  age: number;
  image: string;
  comment: string;
  tags: string[];
}

export interface QAItem {
  question: string;
  answer: string;
}

export interface RequirementItem {
  label: string;
  value: string | React.ReactNode;
}