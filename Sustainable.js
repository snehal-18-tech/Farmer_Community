document.getElementById("new-discussion-btn").addEventListener("click", function() {
    // Redirect to a new discussion page or open a modal
    alert("Redirecting to the new discussion page...");
    // window.location.href = "new-discussion.html"; // Uncomment this line if you have a new discussion page
});

document.getElementById("filter").addEventListener("change", function() {
    const selectedFilter = this.value;
    // Implement the logic to filter discussions based on the selected option
    alert(`Filtering discussions by: ${selectedFilter}`);
});
