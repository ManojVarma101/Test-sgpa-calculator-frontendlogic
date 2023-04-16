// Get form elements
const sgpaForm = document.querySelector('#sgpa-form');
const semesterInput = document.querySelector('#semester');
const presentCgpaInput = document.querySelector('#present-cgpa');
const targetCgpaInput = document.querySelector('#target-cgpa');
const creditsContainer = document.querySelector('#credits-container');
const addCreditsButton = document.querySelector('#add-credits');
const calculateButton = document.querySelector('#calculate');
const resultDiv = document.querySelector('#result');

// Add event listener to add credits button
addCreditsButton.addEventListener('click', (e) => {
  e.preventDefault();
  const semesterCredits = document.createElement('div');
  semesterCredits.classList.add('credit');
  semesterCredits.innerHTML = `
    <label for="credits-${creditsContainer.children.length}">Semester ${creditsContainer.children.length + 1}:</label>
    <input type="number" id="credits-${creditsContainer.children.length}" class="semester-credits" placeholder="Enter total credits for semester ${creditsContainer.children.length + 1}" required/>
  `;
  creditsContainer.appendChild(semesterCredits);
});

// Add event listener to SGPA form submission
sgpaForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const semester = parseInt(semesterInput.value);
  const presentCgpa = parseFloat(presentCgpaInput.value).toFixed(4);
  const targetCgpa = parseFloat(targetCgpaInput.value).toFixed(4);
  const semesterCreditsInputs = document.querySelectorAll('.semester-credits');
  const semesterCredits = Array.from(semesterCreditsInputs).map((input) => parseInt(input.value));

  // Calculate SGPA
  const currentCredits = semesterCredits[semester - 1];
  const k = semesterCredits.reduce((acc, credits) => acc + credits, 0) - currentCredits;
  const sgpa = (targetCgpa * (k + currentCredits) / currentCredits) - (presentCgpa * k / currentCredits);

  // Display SGPA result
  resultDiv.textContent = `Your required SGPA in semester ${semester} is ${sgpa.toFixed(4)}`;
});
