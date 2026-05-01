import React from "react";
import descktopDivider from "./assets/pattern-divider-desktop.svg";
import mobileDivider from "./assets/pattern-divider-mobile.svg";
import diceIcon from "./assets/icon-dice.svg";

const App = () => {
  const [advice, setAdvice] = React.useState({
    id: 177,
    advice:
      "Everyone has their down days. Don't take it out on innocent bystanders.",
  });

  const [loading, setLoading] = React.useState(false);
  const fetchAdvice = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.adviceslip.com/advice?t=${Date.now()}`,
      );
      const data = await response.json();
      if (data.slip) {
        setAdvice({ id: data.slip.id, advice: data.slip.advice });
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative bg-neutral-blue-900 w-sm md:w-md rounded-xl flex flex-col items-center text-center justify-center py-8">
        <h1 className="text-xs tracking-[0.2em] font-semibold text-primary-green-300">
          ADVICE <span>#{advice.id}</span>
        </h1>
        <p className="p-4 text-2xl font-semibold">"{advice.advice}"</p>
        <img
          className="mb-6 md:hidden"
          src={mobileDivider}
          alt="Mobile Divider"
        />
        <img
          className="hidden mb-6 md:block px-12"
          src={descktopDivider}
          alt="Desktop Divider"
        />
        <button
          onClick={fetchAdvice}
          disabled={loading}
          className="btn absolute bottom-0 transform translate-y-1/2 bg-primary-green-300 w-15 h-15 rounded-full flex items-center justify-center "
        >
          <img src={diceIcon} alt="Dice" />
        </button>
      </div>
    </div>
  );
};

export default App;
