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
  imdbRating?: string;
  Director?: string;
  Actors?: string;
  Language?: string;
  Country?: string;
  imdbID?: string;
}

export interface CustomMovie {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
}

export interface NavbarProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onAddMovie?: () => void;
  onDeleteAll?: () => void;
  onFocus?: () => void;
  isMainPage?: boolean;
  showDelete?: boolean;
  disabled?: boolean;
  navContentClassName?: string;
}

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentClassName?: string;
}

export interface LogoButtonProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface OMDBbDropdownProps {
  isVisible?: boolean;
  isLoading?: boolean;
  data: MovieSearchProps[];
  onClick: (item: MovieSearchProps) => void;
  onClose: () => void;
}

export interface MovieContentProps {
  selectedMovie: MovieProps | null;
  isBookmarked: boolean;
  onBookmark: (item: MovieProps) => void;
  onClose: () => void;
}
