document.addEventListener("DOMContentLoaded", () => {

  // Tax switch ko select karo
  const taxSwitch = document.querySelector("#taxSwitch");

  // Saari price wali lines select karo
  const priceTexts = document.querySelectorAll(".price-text");

  // Safety check
  if (!taxSwitch || priceTexts.length === 0) return;

  taxSwitch.addEventListener("change", () => {

    priceTexts.forEach(priceEl => {
      const basePrice = Number(priceEl.dataset.basePrice);
      const priceAmount = priceEl.querySelector(".price-amount");
      const taxInfo = priceEl.querySelector(".tax-info");

      if (taxSwitch.checked) {
        const totalPrice = Math.round(basePrice * 1.18); // 18% GST
        priceAmount.innerText = totalPrice.toLocaleString("en-IN");
        taxInfo.classList.remove("d-none");
      } else {
        priceAmount.innerText = basePrice.toLocaleString("en-IN");
        taxInfo.classList.add("d-none");
      }
    });

  });

});
