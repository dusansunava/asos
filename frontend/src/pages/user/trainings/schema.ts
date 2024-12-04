export type Exercise = {
    id: string; // Unikátne ID cvičenia
    exerciseId: string; 
    name: string; // Názov cvičenia
    sets: number; // Počet sérií
    reps: number; // Počet opakovaní v každej sérii
    rest: number; // Voliteľné: trvanie v minútach
    bodyPart: string;
    type: string;
    intensity: string;
    description: string;
    date: string;
  };
  
  export type TrainingPlan = {
    id: string; // Unikátne ID plánu
    date: string;
    name: string; // Názov tréningového plánu
    description: string; // Popis tréningového plánu
    duration: number; // Celkové trvanie tréningu v dňoch
    exercises: Exercise[]; // Zoznam cvičení v pláne
    startDate?: string; // Voliteľné: dátum začiatku tréningu (ISO formát)
    endDate?: string; // Voliteľné: dátum ukončenia tréningu (ISO formát)
    createdBy: string; // ID používateľa, ktorý vytvoril plán
    createdAt: string; // Dátum vytvorenia (ISO formát)
    updatedAt: string; // Dátum poslednej aktualizácie (ISO formát)
    type: string;
    
  };
  