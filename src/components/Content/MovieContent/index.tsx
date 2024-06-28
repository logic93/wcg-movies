import { LogoButton } from "@/components/Buttons/LogoButton";
import { BookmarkIcon } from "@/components/Icons/BookmarkIcon";
import { MovieContentProps } from "@/types";

export default function MovieContent(props: MovieContentProps) {
  return (
    <div className="relative flex flex-col">
      <h1 className="w-full text-4xl font-bold">
        {props.selectedMovie?.Title}
      </h1>
      <span className="capitalize">
        {props.selectedMovie?.Type} ∙ {props.selectedMovie?.Year}
      </span>

      <LogoButton
        className="absolute right-0 top-0"
        onClick={() =>
          props.selectedMovie && props.onBookmark(props.selectedMovie)
        }
      >
        <BookmarkIcon fill={props.isBookmarked ? "black" : "none"} />
      </LogoButton>

      <div className="flex flex-row pt-2">
        <div className="w-full">
          <img
            src={props.selectedMovie?.Poster}
            alt={`${props.selectedMovie?.Title} Poster`}
          />
        </div>

        <div className="pl-4">
          <h3 className="mb-2">
            <b>Plot</b>
            <br />
            {props.selectedMovie?.Plot}
          </h3>

          <h3 className="mb-10">
            <b>IMDb Rating</b>
            <br />
            {props.selectedMovie?.imdbRating}
          </h3>

          <h3 className="mb-2">
            <b>Director</b>
            <br />
            {props.selectedMovie?.Director}
          </h3>

          <h3 className="mb-10">
            <b>Actors</b>
            <br />
            {props.selectedMovie?.Actors}
          </h3>

          <h3 className="mb-2">
            <b>Language</b>
            <br />
            {props.selectedMovie?.Language}
          </h3>

          <h3 className="mb-2">
            <b>Country</b>
            <br />
            {props.selectedMovie?.Country}
          </h3>
        </div>
      </div>
    </div>
  );
}
