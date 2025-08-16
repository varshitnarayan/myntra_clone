document.addEventListener("DOMContentLoaded", function () {

    // ========================
    // NAVIGATION LINKS
    // ========================
    const navLinks = {
        "Men": "men.html",
        "Women": "women.html",
        "Kids": "kids.html",
        "Home & Living": "home-living.html",
        "Beauty": "beauty.html"
    };

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const page = navLinks[this.textContent.trim()];
            if (page) {
                window.location.href = page;
            } else {
                alert("Page not available yet!");
            }
        });
    });

    // ========================
    // ICON LINKS
    // ========================
    const iconLinks = {
        "Profile": "profile.html",
        "Wishlist": "wishlist.html",
        "Bag": "cart.html"
    };

    document.querySelectorAll(".icons span").forEach(icon => {
        icon.style.cursor = "pointer";
        icon.addEventListener("click", function () {
            const page = iconLinks[this.textContent.trim()];
            if (page) {
                window.location.href = page;
            }
        });
    });

    // ========================
    // SEARCH BAR
    // ========================
    const searchInput = document.querySelector(".search-bar input");
    if (searchInput) {
        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                const query = this.value.trim();
                if (query) {
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                } else {
                    alert("Please type something to search.");
                }
            }
        });
    }

    // ========================
    // PRODUCT CLICK
    // ========================
    document.querySelectorAll(".product").forEach(product => {
        product.style.cursor = "pointer";
        product.addEventListener("click", function () {
            const productName = this.querySelector("p").textContent;
            window.location.href = `product.html?name=${encodeURIComponent(productName)}`;
        });
    });

    // ========================
    // PROFILE PAGE LOGIC
    // ========================
    if (document.body.classList.contains("profile-page")) {
        const profileContainer = document.getElementById("profileContainer");
        let userData = JSON.parse(localStorage.getItem("userData"));

        if (userData) {
            // Show profile details
            profileContainer.innerHTML = `
                <h2>Welcome, ${userData.name}</h2>
                <p><strong>Phone:</strong> ${userData.number}</p>
                <p><strong>Address:</strong> ${userData.address}</p>
                <button id="orderHistoryBtn">Order History</button>
                <button id="editBtn">Edit Profile</button>
                <button id="logoutBtn">Logout</button>
            `;

            document.getElementById("orderHistoryBtn").addEventListener("click", function () {
                alert("Order history:\n" + (userData.orders?.join("\n") || "No orders yet."));
            });

            document.getElementById("editBtn").addEventListener("click", function () {
                showRegistrationForm(userData);
            });

            document.getElementById("logoutBtn").addEventListener("click", function () {
                localStorage.removeItem("userData");
                location.reload();
            });

        } else {
            // Show registration form
            showRegistrationForm();
        }

        function showRegistrationForm(existingData = {}) {
            profileContainer.innerHTML = `
                <h2>${existingData.name ? "Edit Profile" : "Register"}</h2>
                <form id="profileForm">
                    <input type="text" name="name" placeholder="Full Name" value="${existingData.name || ""}" required>
                    <input type="tel" name="number" placeholder="Phone Number" value="${existingData.number || ""}" required>
                    <textarea name="address" placeholder="Address" required>${existingData.address || ""}</textarea>
                    <button type="submit">Save</button>
                </form>
            `;
            document.getElementById("profileForm").addEventListener("submit", function (e) {
                e.preventDefault();
                const formData = new FormData(this);
                const newUserData = {
                    name: formData.get("name"),
                    number: formData.get("number"),
                    address: formData.get("address"),
                    orders: existingData.orders || []
                };
                localStorage.setItem("userData", JSON.stringify(newUserData));
                location.reload();
            });
        }
    }

});
