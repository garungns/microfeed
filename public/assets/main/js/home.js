document.addEventListener("DOMContentLoaded", function () {
  const loadingContainer = document.getElementById("loadingContainer");
  const lookupButton = document.getElementById("searchButton");
  const messageElement = document.querySelector(".message");

  // Xử lý sự kiện click cho các phần tử .vehicle-type
  document.querySelectorAll(".vehicle-type").forEach((element) => {
      element.addEventListener("click", function () {
          document.querySelectorAll(".vehicle-type").forEach((el) => el.classList.remove("selected"));
          this.classList.add("selected");
          document.getElementById("vehicleType").value = this.dataset.type;
      });
  });

  // Xử lý submit form
  const lookupForm = document.getElementById("lookupForm");

  lookupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      messageElement.textContent = "";

      const plateNumber = document.getElementById("plateNumber").value.trim();

      if (!plateNumber) {
          messageElement.textContent = "Vui lòng nhập biển số xe!";
          messageElement.style.color = "red";
          return;
      }

      loadingContainer.style.display = "flex";
      lookupButton.disabled = true;
      document.querySelector(".container-mid").innerHTML = "";
      document.querySelector(".container-mid").style.display = "none";

      try {
          const response = await fetch("/home", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  plateNumber: plateNumber.replace(/\s+/g, '').trim(),
                  vehicleType: document.getElementById("vehicleType").value
              })
          });

          if (!response.ok) {
              throw new Error("HTTP error " + response.status);
          }

          const result = await response.json();

          // Assuming the response contains `html` to update the content
          document.querySelector(".container-mid").innerHTML = result.html;
          document.querySelector(".container-mid").style.display = "block";
      } catch (error) {
          messageElement.textContent = "Đã xảy ra lỗi trong quá trình gửi yêu cầu.";
          messageElement.style.color = "red";
      } finally {
          loadingContainer.style.display = "none";
          lookupButton.disabled = false;
      }
  });
});

function onTurnstileSuccess(token) {
  document.getElementById('searchButton').disabled = false;
}

function onTurnstileFailed(token) {
  document.getElementById('searchButton').disabled = true;
}