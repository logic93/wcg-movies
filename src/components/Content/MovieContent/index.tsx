import { LogoButton } from "@/components/Buttons/LogoButton";
import { BookmarkIcon } from "@/components/Icons/BookmarkIcon";
import { CloseIcon } from "@/components/Icons/CloseIcon";
import { MovieContentProps } from "@/types";
import Image from "next/image";

export default function MovieContent(props: MovieContentProps) {
  if (props.selectedMovie) {
    return (
      <div className="relative flex flex-col">
        <LogoButton className="absolute right-0 top-0" onClick={props.onClose}>
          <CloseIcon />
        </LogoButton>

        <LogoButton
          className="absolute bottom-0 right-0"
          onClick={() =>
            props.selectedMovie && props.onBookmark(props.selectedMovie)
          }
        >
          <BookmarkIcon fill={props.isBookmarked ? "black" : "none"} />
        </LogoButton>

        <div>
          <h1 className="w-[90%] text-4xl font-bold">
            {props.selectedMovie?.Title}
          </h1>
          <p className="capitalize">
            {props.selectedMovie?.Type} ∙ {props.selectedMovie?.Year}
          </p>
        </div>

        <div className="mt-4 flex flex-row">
          {props.selectedMovie?.Poster && (
            <div className="mr-4">
              <Image
                src={props.selectedMovie?.Poster || ""}
                width={278}
                height={417}
                alt={`${props.selectedMovie?.Title} Poster`}
              />
            </div>
          )}

          <div className="flex min-w-80 max-w-xl flex-col gap-4">
            {props.selectedMovie?.Plot && (
              <p>
                <b>Plot</b>
                <br />
                {props.selectedMovie?.Plot}
              </p>
            )}

            {props.selectedMovie?.imdbRating && (
              <p>
                <b>IMDb Rating</b>
                <br />
                {props.selectedMovie?.imdbRating}
              </p>
            )}

            {props.selectedMovie?.Director && (
              <p>
                <b>Director</b>
                <br />
                {props.selectedMovie?.Director}
              </p>
            )}

            {props.selectedMovie?.Actors && (
              <p>
                <b>Actors</b>
                <br />
                {props.selectedMovie?.Actors}
              </p>
            )}

            {props.selectedMovie?.Language && (
              <p>
                <b>Language</b>
                <br />
                {props.selectedMovie?.Language}
              </p>
            )}

            {props.selectedMovie?.Country && (
              <p className="mr-4">
                <b>Country</b>
                <br />
                {props.selectedMovie?.Country}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
