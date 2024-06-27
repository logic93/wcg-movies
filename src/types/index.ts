export interface MovieSearchProps {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface MovieProps {
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  Plot: string;
  imdbRating: string;
  Director: string;
  Actors: string;
  Language: string;
  Country: string;
  imdbID: string;
}

export interface NavbarProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onAddMovie: () => void;
}

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface LogoButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}
