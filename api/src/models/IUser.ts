export interface User {
    id: number;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    picture_profil?: string;
    registration_date: string; 
    // registration_date: Date;
    role: 'user' | 'admin';
}