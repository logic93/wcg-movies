import { LogoButton } from "@/components/Buttons/LogoButton";
import { BookmarkIcon } from "@/components/Icons/BookmarkIcon";
import { CloseIcon } from "@/components/Icons/CloseIcon";
import { MovieContentProps } from "@/types";
import Image from "next/image";

import PosterPlaceholder from "@/app/assets/images/poster-placeholder.png";

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

        <div className="mt-4 flex flex-row max-[640px]:flex-col">
          <div className="mr-4 h-full w-full flex-1 max-[640px]:m-0 max-[640px]:w-full">
            <Image
              src={props.selectedMovie?.Poster || PosterPlaceholder}
              width={278}
              height={417}
              priority
              alt={`${props.selectedMovie?.Title} Poster`}
              className="h-full w-full max-[640px]:w-full"
            />
          </div>

          <div className="flex max-w-xl flex-col gap-4 max-[640px]:mt-4 min-[640px]:w-[50%]">
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
