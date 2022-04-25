import "./styles.css";

const initTooltips = () => {
  const tooltipElements = Array.from(
    document.querySelectorAll("[data-tooltip]")
  );
  const tooltipContainer = document.createElement("div");
  const tooltipMouseOverHandler = (event) => {
    // TODO: POSITION TOOLTIP TIP to follow the caret
  };

  const tooltipMouseEneterHandler = (event) => {
    const element = event.target;
    const text = element.dataSet.tooltip;

    if (text) {
      // TODO: POSITION TOOLTIP ON TOP RIGHT IF THERE IS SPACE ELSE POSITION ON TOP BOTTOM
      const rect = element.getBoundingClientRect();
      tooltipContainer.innerHTML = text;
    }
  };

  const tooltipMouseLeaveHandler = () => {
    tooltipContainer.innerHTML = "";
  };

  tooltipContainer.classList.add("tooltip");
  document.body.appendChild(tooltipContainer);

  for (const element of tooltipElements) {
    element.addEventListener("mouseenter", tooltipMouseEneterHandler);
    element.addEventListener("mouseleave", tooltipMouseLeaveHandler);
    element.addEventListener("mouseover", tooltipMouseOverHandler);
  }

  // Return a cleanup function
  return () => {
    for (const element of tooltipElements) {
      element.removeEventListener("mouseenter", tooltipMouseEneterHandler);
      element.removeEventListener("mouseleave", tooltipMouseLeaveHandler);
      element.removeEventListener("mouseover", tooltipMouseOverHandler);
    }
  };
};

initTooltips();
