import "./styles.css";

const initTooltips = () => {
  const tooltipElements = Array.from(
    document.querySelectorAll("[data-tooltip]")
  );
  const tooltip = document.createElement("div");
  const tooltipBox = document.createElement("div");
  const tooltipMouseOverHandler = (event) => {
    // TODO: POSITION TOOLTIP TIP to follow the caret
  };

  const tooltipMouseEnterHandler = (event) => {
    const target = event.target;
    const text = target.dataset.tooltip;
    const position = target.dataset.tooltipPosition || "top";

    if (text) {
      tooltipBox.innerHTML = text;
      tooltip.classList.add(position);
      tooltip.classList.add("active");
    }
  };

  const tooltipMouseLeaveHandler = () => {
    tooltipBox.innerHTML = "";
    tooltip.classList.remove("active");
  };

  tooltip.classList.add("tooltip");
  tooltipBox.classList.add("box");
  tooltip.appendChild(tooltipBox);
  document.body.appendChild(tooltip);

  for (const element of tooltipElements) {
    element.addEventListener("mouseenter", tooltipMouseEnterHandler);
    // element.addEventListener("mouseleave", tooltipMouseLeaveHandler);
    // element.addEventListener("mouseover", tooltipMouseOverHandler);
  }

  // Return a cleanup function
  return () => {
    for (const element of tooltipElements) {
      element.removeEventListener("mouseenter", tooltipMouseEnterHandler);
      element.removeEventListener("mouseleave", tooltipMouseLeaveHandler);
      element.removeEventListener("mouseover", tooltipMouseOverHandler);
    }
  };
};

initTooltips();
