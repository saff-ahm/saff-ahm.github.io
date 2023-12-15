const tabElements = document.querySelectorAll('button[role="tab"]');
const panelElements = document.querySelectorAll('[role="tabpanel"]');
let activeIndex = 0;

// Listen to clicks on tabs
tabElements.forEach(function (tab, index) {
  tab.addEventListener("click", function (event) {
    setActiveTab(index);
  });
});

function setActiveTab(index) {
  // Make currently active tab inactive
  tabElements[activeIndex].setAttribute("aria-selected", "false");
  tabElements[activeIndex].tabIndex = -1;

  // Set the new tab as active
  tabElements[index].setAttribute("aria-selected", "true");
  tabElements[index].tabIndex = 0;
  tabElements[index].focus();

  setActivePanel(index);
  activeIndex = index;
}

function setActivePanel(index) {
  // Hide currently active panel
  panelElements[activeIndex].setAttribute("hidden", "");
  panelElements[activeIndex].tabIndex = -1;

  // Show the new active panel
  panelElements[index].removeAttribute("hidden");
   panelElements[index].tabIndex = 0;
}

//using keyboard fucntions within the tabs
tabElements.forEach(function (tab, index) {
 

  tab.addEventListener("keydown", function (event) {
    const lastIndex = tabElements.length - 1;

    if (event.code === "ArrowLeft" || event.code === "ArrowUp") {
      event.preventDefault();

      if (activeIndex === 0) {
        // First element, jump to end
        setActiveTab(lastIndex);
      } else {
        // Move left
        setActiveTab(activeIndex - 1);
      }
    } else if (event.code === "ArrowRight" || event.code === "ArrowDown") {
      event.preventDefault();

      if (activeIndex === lastIndex) {
        // Last element, jump to beginning
        setActiveTab(0);
      } else {
        // Move right
        setActiveTab(activeIndex + 1);
      }
    } else if (event.code === "Home") {
      event.preventDefault();

      // Move to beginning
      setActiveTab(0);
    } else if (event.code === "End") {
      event.preventDefault();

      // Move to end
      setActiveTab(lastIndex);
    }
  });
});
