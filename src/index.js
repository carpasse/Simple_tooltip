import "./styles.css";

const TOOLTIP_TIP_HEIGHT = 15;

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

    if (text) {
      tooltipBox.innerHTML = text;
      // TODO: POSITION TOOLTIP ON TOP RIGHT IF THERE IS SPACE ELSE POSITION ON TOP BOTTOM
      const targetRect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      if (targetRect.top > tooltipRect.height + TOOLTIP_TIP_HEIGHT) {
        const tooltipTop =
          targetRect.top - tooltipRect.height - TOOLTIP_TIP_HEIGHT;

        tooltip.style.top = `${tooltipTop}px`;
      } else {
        const tooltipTop =
          targetRect.top + tooltipRect.height + TOOLTIP_TIP_HEIGHT;

        tooltip.style.top = `${tooltipTop}px`;
      }
      tooltip.style.left = `0px`;

      tooltip.classList.add("active");
      console.log("#### tooltip active 4");
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
    element.addEventListener("mouseleave", tooltipMouseLeaveHandler);
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
