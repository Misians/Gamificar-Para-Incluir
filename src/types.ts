import { ReactNode } from "react";

export type PageType = 'catalog' | 'game-details' | 'contact' | 'admin';

export interface Game {
  id: string;
  name: string;
  platform: string;
  category: string;
  tagBg: string;
  tagColor: string;
  description: string;
  image: string;
  alt: string;
  rating: number;
  reviewsCount: string;
  version: string;
  size: string;
  languages: string[];
  developer: string;
  longDescription: string;
}

export interface Review {
  id: string;
  text: string;
  author: string;
  role: string;
  avatarInitials: string;
}

export interface Mission {
  id: number;
  title: string;
  subtitle: string;
  icon: ReactNode; // <--- Alterado aqui  details: {
    whatHappened: string;
    objectives: string[];
    resources: string[];
    observations: string;
    replication: {
      time: string;
      materials: string[];
      steps: string[];
    };
    accessibility: string[];
    teacherTips: string;
    bnccSkills: string[];
    contentImages: string[]; // Array dinâmico para as imagens aleatórias
  };
}

export interface Founder {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  lattesLink?: string;
  Linkedin?: string;
}
