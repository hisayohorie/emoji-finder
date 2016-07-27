// DOM utility functions
const addClass = (el, newClass) => {
  el.classList.add(newClass);
};

const removeClass = (el, oldClass) => {
  const currentClasses = el.className.split(" ");

  el.className = currentClasses.filter(names =>
    names.trim() !== "" && names !== oldClass
  ).join(" ");
};

// Search Script
(() => {
  const inputField = document.getElementsByTagName('input')[0];
  let typeTimeout;
  const TYPE_INTERVAL = 10000;
  // Set variable for filtering purposes
  const siteContainer = document.getElementsByTagName('body')[0];

  inputField.addEventListener("input", (event) => {
    const value = event.target.value;
    // Set variable of any emojis set to "visible" (this returns elements if a previous search has already been done)
    const prevFilter = document.getElementsByClassName('visible');
    if (typeTimeout) window.clearTimeout(typeTimeout);
  
    // Reset the previous search results
    resetOldEmojis(prevFilter);

    if (value) {
      typeTimeout = delay(matchKeyword(value), TYPE_INTERVAL);
    } else {
      // Because the input has no value (and therefore we're not filtering), let's remove the filtering class from our site container
      removeClass(siteContainer, 'filtering');
    }
  }, false);

  const matchKeyword = (value) => {
    let matchedEmojiTitles = [];
    const matchedObjects = EMOJIS.filter(filterByKeyword.bind(this, value));

    if (matchedObjects.length == 0) return;

    // Looping through the array of emojis that match the search term
    for (const matched of matchedObjects) {
      // Sending each emoji (from array) to function that set's them to visible
      setMatchedEmojiVisible(matched);
    }

    // Add a filtering class to the site container which will hide all emojis that do NOT have a visible class
    addClass(siteContainer, 'filtering');
  }

  const filterByKeyword = (value, obj) => {
    return obj.keywords.some((keyword) => {
      return value === keyword;
    });
  }

  // Resetting previous search results
  const resetOldEmojis = (value) => {
    // Loop through the array of emojis that was passed to the function
    for (const prev of value) {
      // For each one, remove the visible class
      removeClass(prev, 'visible');
    };
  }

  // Looping through array of matched emojis
  const setMatchedEmojiVisible = ({emoji, keywords}) => {
    // Getting the link in index.html that corresponds to each array item
    const emojiItem = document.querySelector(`[title="${keywords[0]}"]`);

    // If we successfully grabbed the link from index.html
    if (emojiItem) {
      // Add a visible class to this emoji
      addClass(emojiItem.parentElement, 'visible');
    }
  }

  const delay = (func, delay) => {
    window.setTimeout(func, delay);
  }
})();
