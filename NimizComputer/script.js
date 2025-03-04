document.addEventListener("DOMContentLoaded", function () {
    // Search Functionality
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", function () {
      const searchTerm = searchInput.value.toLowerCase();
      // Implement search logic here
      console.log("Search term:", searchTerm);
    });
    // Navigation Buttons
    const newArrivalsSection = document.getElementById("new-arrivals");
    const bestSellersSection = document.getElementById("best-sellers");
    function setupNavigation(section) {
      const prevButton = section.querySelector(".prev-button");
      const nextButton = section.querySelector(".next-button");
      const productGrid = section.querySelector(".product-grid");
      const productItems = Array.from(productGrid.children);
      let currentIndex = 0;
      const itemsPerPage = 2;
      function showItems(index) {
        productItems.forEach((item, i) => {
          if (i >= index && i < index + itemsPerPage) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });

        document.addEventListener("DOMContentLoaded", function () {
            const addToWishlistButton = document.getElementById("addToWishlist");
            if (addToWishlistButton) {
              addToWishlistButton.addEventListener("click", function () {
              });
            }
          });
          


      }
      showItems(currentIndex);
      nextButton.addEventListener("click", () => {
        currentIndex += itemsPerPage;
        if (currentIndex >= productItems.length) {
          currentIndex = 0;
        }
        showItems(currentIndex);
      });
      prevButton.addEventListener("click", () => {
        currentIndex -= itemsPerPage;
        if (currentIndex < 0) {
          currentIndex = productItems.length - itemsPerPage;
          if (currentIndex < 0) currentIndex = 0;
        }
        showItems(currentIndex);
      });
    }
    //   setupNavigation(newArrivalsSection);
    //   setupNavigation(bestSellersSection);
  });

  