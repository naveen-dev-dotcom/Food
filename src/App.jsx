import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const initialFoods = [
    { name: "Bucket Biryani", count: 12 },
    { name: "Grill Chicken", count: 15 },
    { name: "Parotta", count: 15 },
    { name: "Popcorn Family Pack", count: 20 },
    { name: "Dairy Milk", count: 12 },
    { name: "Jhangri (Gilebi)", count: 15 },
    { name: "Mysorepak", count: 10 },
    { name: "Jamun", count: 10 },
    { name: "Ice Cream", count: 10 },
    { name: "Cool Drinks", count: 13 },
  ];

  const [foods, setFoods] = useState(() => {
    const saved = localStorage.getItem("foods");
    return saved ? JSON.parse(saved) : initialFoods;
  });

  const [selected, setSelected] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  const shuffleFood = () => {
    if (isShuffling) return; // prevent double click
    const availableFoods = foods.filter((food) => food.count > 0);
    if (availableFoods.length === 0) {
      setSelected("No items left!");
      return;
    }

    setIsShuffling(true);
    let i = 0;
    const interval = setInterval(() => {
      setHighlightedIndex(i % foods.length);
      i++;
    }, 150); // speed of highlight

    // stop after a while and choose random
    setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * availableFoods.length);
      const chosenFood = availableFoods[randomIndex];
      setSelected(chosenFood.name);

      // highlight the chosen one
      const finalIndex = foods.findIndex((f) => f.name === chosenFood.name);
      setHighlightedIndex(finalIndex);

      // decrease its count
      setFoods((prev) =>
        prev.map((food) =>
          food.name === chosenFood.name && food.count > 0
            ? { ...food, count: food.count - 1 }
            : food
        )
      );

      setIsShuffling(false);
    }, 3000); // 3 sec shuffle
  };

  const resetFoods = () => {
    setFoods(initialFoods);
    setSelected(null);
    setHighlightedIndex(null);
  };

  const total = foods.reduce((sum, food) => sum + food.count, 0);

  return (
    <div className="app">
          <header className="header">
      <h1>🍴 <span>Food Shuffle App</span> 🍹</h1>
      <p className="tagline">Tap, Shuffle & Enjoy Your Random Meal!</p>
    </header>

      <div>
        <button onClick={shuffleFood} className="shuffle-btn">
          Shuffle Food
        </button>
        <button onClick={resetFoods} className="reset-btn">
          Reset
        </button>
      </div>

     <h2 className="total-counter">
  <span className="icon">📦</span> 
  <span className="text">Total Items Left:</span> 
  <span className="count">{total}</span>
</h2>


      {selected && <p className="selected">🎉 Selected: {selected}</p>}

      <div className="grid">
        {foods.map((food, idx) => (
          <div
            key={idx}
            className={`card ${highlightedIndex === idx ? "highlight" : ""}`}
          >
            <p>{food.name}</p>
            <p className={food.count === 0 ? "zero" : ""}>Count: {food.count}</p>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>
          Developed by <span>NAVEEN.G.R</span> CSE-B 3RD YEAR
        </p>
      </div>
    </div>
  );
}
