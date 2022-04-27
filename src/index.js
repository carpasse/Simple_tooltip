import "./styles.css";

const tooltipPosition = {
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top"
};

const initTooltips = () => {
  const tooltipElements = Array.from(
    document.querySelectorAll("[data-tooltip]")
  );
  const tooltip = document.createElement("div");
  const tooltipBox = document.createElement("div");

  const tooltipMouseEnterHandler = (event) => {
    const target = event.target;
    const text = target.dataset.tooltip;
    const position = target.dataset.tooltipPosition || "top";

    if (text) {
      tooltipBox.innerHTML = text;
      tooltip.classList.add(position);
      tooltip.classList.add("active");

      const targetRect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      switch (position) {
        case tooltipPosition.TOP:
          tooltip.style.top = `${targetRect.top - tooltipRect.height}px`;
          tooltip.style.left = `${
            targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
          }px`;
          break;
        case tooltipPosition.BOTTOM:
          tooltip.style.top = `${targetRect.top + targetRect.height}px`;
          tooltip.style.left = `${
            targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
          }px`;
          break;
        case tooltipPosition.LEFT:
          tooltip.style.top = `${
            targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
          }px`;
          tooltip.style.left = `${targetRect.left - tooltipRect.width}px`;
          break;
        //tooltipPosition.RIGHT
        default:
          tooltip.style.top = `${
            targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
          }px`;
          tooltip.style.left = `${targetRect.left + targetRect.width}px`;
          break;
      }
    }
  };

  const tooltipMouseLeaveHandler = () => {
    tooltipBox.innerHTML = "";
    tooltip.classList.remove("active", ...Object.values(tooltipPosition));
  };

  tooltip.classList.add("tooltip");
  tooltipBox.classList.add("box");
  tooltip.appendChild(tooltipBox);
  document.body.appendChild(tooltip);

  for (const element of tooltipElements) {
    element.addEventListener("mouseenter", tooltipMouseEnterHandler);
    element.addEventListener("mouseleave", tooltipMouseLeaveHandler);
  }

  // Return a cleanup function
  return () => {
    for (const element of tooltipElements) {
      element.removeEventListener("mouseenter", tooltipMouseEnterHandler);
      element.removeEventListener("mouseleave", tooltipMouseLeaveHandler);
    }
  };
};

initTooltips();
