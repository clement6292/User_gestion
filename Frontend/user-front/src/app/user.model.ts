export interface User {
    id?: string;        // L'ID peut être facultatif lors de la création
    name: string;
    email: string;
    role: string; 
    password: string;
  }