import React from "react";
import { useDispatch } from "react-redux";
import { selectPokemon } from "./redux/store";
import "../App.css";
import { Tilt } from "react-tilt";

const typeColor = {
  bug: "#00b894",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#26de81",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

export default function PokemonCard({
  name,
  type,
  imageUrl,
  height,
  weight,
  moves,
  refreshFavorites,
}) {
  const dispatch = useDispatch();

  //Hover effect
  // const[isHover, setIsHover] = useState(false)

  //Hover Effect
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  // Split the type string by space to handle cases with multiple types
  const types = type.split(" ");

  // Find the color for the first type
  let gradientColor = "#ffffff"; // Default to white if no matching type color found
  for (let i = 0; i < types.length; i++) {
    const typeKey = types[i].toLowerCase();
    if (typeColor[typeKey]) {
      gradientColor = typeColor[typeKey];
      break; // Stop searching once we find a valid type color
    }
  }

  //Starting Captial letter
  function capitalFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Tilt options={defaultOptions}>
      <div className="flex flex-col items-center m-4">
        <div
          className="pokemon-card flex flex-col items-center p-4 relative"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${gradientColor} 38%, #FCE762 36%)`,
          }}
        >
          {/* Pokemon image */}
          <div className="image-container flex justify-center items-center rounded-full">
            <img
              className="object-cover p-1  max-h-[120px]"
              src={imageUrl}
              alt={name}
            />
          </div>

          {/* Pokemon details */}
          <div className="details-container text-center mt-4">
            <h1 className="text-xl font-gilroyBlack">
              {capitalFirstLetter(name)}
            </h1>
            <h4 className="text-md font-gilroyMedium">
              <span className="font-gilroyBold">Type:</span> {type}
            </h4>
            <button
              className="p-1 mt-5 rounded-md border-2 border-black hover:bg-customGreenPale font-gilroyBold"
              onClick={() =>
                dispatch(
                  selectPokemon({
                    name,
                    type,
                    imageUrl,
                    height,
                    weight,
                    moves,
                    refreshFavorites,
                  })
                )
              }
            >
              More Info
            </button>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
