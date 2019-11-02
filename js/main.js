const clearError = () => {
  // Remove error message
  document.querySelector('.alert').remove();
  // Restore previous Frame1 height  
  document.querySelector('#frame1').style.height = '345px';
}

const showError = (error) => {
  const insertAfter = (el, referenceNode) => {
      referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  } 
  
  // Create a div
   const errorDiv = document.createElement('div');
   // Get elements
   const form = document.querySelector('#loan-form');
   // Add class
   errorDiv.className = 'alert alert-danger text-center errorMessage';
   // Create text node and append to div
   errorDiv.appendChild(document.createTextNode(error));
  // Extend Frame
  document.querySelector('#frame1').style.height = '415px';
  // Insert after form element
  insertAfter(errorDiv, form);
  // Clear error after 3 seconds
  setTimeout(clearError, 2500);
}

const calculateResults = () => {
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.innerHTML = monthly.toFixed(2);
    totalPayment.innerHTML = (monthly * calculatedPayments).toFixed(2);
    totalInterest.innerHTML = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results
    document.getElementById('frame2').style.display = 'block';
    // Hide loader
    document.querySelector('.lds-spinner').style.display = 'none';

  } else {
    // Show Error
    showError('Please check your numbers');
    document.querySelector('.lds-spinner').style.display = 'none';    
  }
}

document.getElementById('loan-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Show loader
  document.querySelector('.lds-spinner').style.display = 'block';
  // Hide Results
  document.getElementById('frame2').style.display = 'none';

  // Calculate 
  setTimeout(calculateResults, 1500);
});