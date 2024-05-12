       
var purchaseButton = document.getElementById("purchaseButton1");


var modal = document.getElementById("myModal");


purchaseButton.addEventListener("click", function() {
    
    modal.style.display = "block";
});
    

function closeModal() {
    modal.style.display = "none";
}
