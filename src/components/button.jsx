import { useState, useLayoutEffect } from 'react';

const PrimaryButton = (props) => {
  const [ripples, setRipples] = useState([]);

  const addRipple = (event) => {
    const button = event.currentTarget.getBoundingClientRect();
    const diameter = Math.min(button.width, button.height);
    const radius = diameter / 2;

    const newRipple = {
      x: event.clientX - button.left - radius,
      y: event.clientY - button.top - radius,
      size: diameter,
      id: Date.now()
    };

    setRipples([...ripples, newRipple]);
    props?.onClick?.(event);
  };

  // Clean up ripples after animation
  useLayoutEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => setRipples([]), 350);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <button {...props} onClick={addRipple} className={`${props.className} cursor-pointer relative overflow-hidden`}>
      {props.children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size
          }}
        />
      ))}
    </button>
  );
};

export default PrimaryButton;
