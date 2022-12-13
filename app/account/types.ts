export interface EditProfileProps {
    displayName: string;
    city: string;
    state: string;

}

export interface ProfileProps {
    displayName: string;
    city: string;
    state: string;
    image: string;
    userId: string;
}

export interface ProfileUser {
    displayName: string;
    citystate: string;
    image: string; 
    userId?: string
}