function formChange() {
  document.getElementById("previewContainer").style.opacity = "1";
  var contactContainer = document.getElementById("contactContainer");
  var phoneInput = document.getElementById("phone").value;
  var emailInput = document.getElementById("email").value;
  var locationInput = document.getElementById("location").value;

  if (phoneInput !== "" || emailInput !== "" || locationInput !== "") {
    contactContainer.style.display = "block";
  } else {
    contactContainer.style.display = "none";
  }

  var previewPhone = document.getElementById("previewPhone");
  var previewEmail = document.getElementById("previewEmail");
  var previewLocation = document.getElementById("previewLocation");

  previewPhone.style.display = phoneInput !== "" ? "list-item" : "none";
  previewEmail.style.display = emailInput !== "" ? "list-item" : "none";
  previewLocation.style.display = locationInput !== "" ? "list-item" : "none";

  document.getElementById("previewName").innerText =
    document.getElementById("firstName").value +
    " " +
    document.getElementById("lastName").value;
  document.getElementById("previewPhone").innerText =
    document.getElementById("phone").value;
  document.getElementById("previewLocation").innerText =
    document.getElementById("location").value;
  document.getElementById("previewEmail").innerText =
    document.getElementById("email").value;
  document.getElementById("previewAboutme").innerHTML = document
    .getElementById("aboutmeDes")
    .value.replace(/\n/g, "<br>");
  document.getElementById("previewSkills").innerHTML =
    document.getElementById("skillItemContainer").innerHTML;
  document.getElementById("previewLang").innerHTML =
    document.getElementById("langItemContainer").innerHTML;
  document.getElementById("previewHobby").innerHTML =
    document.getElementById("hobbyItemContainer").innerHTML;
  document.getElementById("previewExperience").innerHTML =
    document.getElementById("experienceList").innerHTML;
  document.getElementById("previewEducation").innerHTML =
    document.getElementById("educationList").innerHTML;
  var previewSkillsContainer = document.getElementById(
    "previewSkillsContainer"
  );
  var previewLangContainer = document.getElementById("previewLangContainer");
  var previewHobbyContainer = document.getElementById("previewHobbyContainer");

  previewSkillsContainer.style.display =
    document.getElementById("previewSkills").innerHTML !== ""
      ? "block"
      : "none";
  previewLangContainer.style.display =
    document.getElementById("previewLang").innerHTML !== "" ? "block" : "none";
  previewHobbyContainer.style.display =
    document.getElementById("previewHobby").innerHTML !== "" ? "block" : "none";
}

// <!-- ------------------------------------------------- -->

document.getElementById("resumeForm").addEventListener("input", formChange);

// <!-- ------------------------------------------------- -->
var skillData = [];
function addSkill() {
  event.preventDefault();
  var skillInput = document.getElementById("skills");
  var skill = skillInput.value.trim();
  if (skill !== "") {
    var skillItemContainer = document.getElementById("skillItemContainer");
    var skillItem = document.createElement("li");
    skillItem.innerHTML =
      skill + '<i class="bi bi-x skillX" onclick="removeSkill(this)"></i>';
    skillItemContainer.appendChild(skillItem);
    skillInput.value = "";
    skillData.push(skill);
  }
  formChange();
}

// <!-- ------------------------------------------------- -->

function removeSkill(element) {
  element.parentElement.remove();
  formChange();
}

// <!-- ------------------------------------------------- -->
var langData = [];
function addLang() {
  event.preventDefault();
  var langInput = document.getElementById("lang");
  var lang = langInput.value.trim();
  if (lang !== "") {
    var langItemContainer = document.getElementById("langItemContainer");
    var langItem = document.createElement("li");
    langItem.innerHTML =
      lang + '<i class="bi bi-x langX" onclick="removelang(this)"></i>';
    langItemContainer.appendChild(langItem);
    langInput.value = "";
    langData.push(lang);
  }
  formChange();
}

// <!-- ------------------------------------------------- -->

function removelang(element) {
  element.parentElement.remove();
  formChange();
}

// <!-- ------------------------------------------------- -->
var hobbyData = [];
function addHobby() {
  event.preventDefault();
  var hobbyInput = document.getElementById("hobby");
  var hobby = hobbyInput.value.trim();
  if (hobby !== "") {
    var hobbyItemContainer = document.getElementById("hobbyItemContainer");
    var hobbyItem = document.createElement("li");
    hobbyItem.innerHTML =
      hobby + '<i class="bi bi-x hobbyX" onclick="removehobby(this)"></i>';
    hobbyItemContainer.appendChild(hobbyItem);
    hobbyInput.value = "";
    hobbyData.push(hobby);
  }
  formChange();
}

// <!-- ------------------------------------------------- -->

function removehobby(element) {
  element.parentElement.remove();
  formChange();
}
// <!-- ------------------------------------------------- -->

function clearForm() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("location").value = "";
  document.getElementById("aboutmeDes").value = "";
  document.getElementById("skills").value = "";
  document.getElementById("lang").value = "";
  document.getElementById("hobby").value = "";
  document.getElementById("previewName").innerText = "";
  document.getElementById("previewPhone").innerText = "";
  document.getElementById("previewLocation").innerText = "";
  document.getElementById("previewEmail").innerText = "";
  document.getElementById("previewAboutme").innerText = "";
  document.getElementById("previewExperience").innerText = "";
  document.getElementById("previewEducation").innerText = "";
  document.getElementById("previewSkills").innerText = "";
  document.getElementById("skillItemContainer").innerHTML = "";
  document.getElementById("previewLang").innerText = "";
  document.getElementById("langItemContainer").innerHTML = "";
  document.getElementById("previewHobby").innerText = "";
  document.getElementById("hobbyItemContainer").innerHTML = "";
  document.getElementById("jobTitle").value = "";
  document.getElementById("company").value = "";
  document.getElementById("jobDes").value = "";
  document.getElementById("jobStart").value = "";
  document.getElementById("jobEnd").value = "";
  document.getElementById("jobEnd").disabled = false;
  document.getElementById("coursePresent").checked = false;
  document.getElementById("courseName").value = "";
  document.getElementById("courseUniversity").value = "";
  document.getElementById("courseDes").value = "";
  document.getElementById("courseStart").value = "";
  document.getElementById("courseEnd").value = "";
  document.getElementById("courseEnd").disabled = false;
  document.getElementById("coursePresent").checked = false;
  resetExperience();
  resetEducation();
  var experienceList = document.getElementById("experienceList");
  experienceList.innerHTML = "";
  document.querySelector(".previewExperienceHeader").style.display = "none";
  var educationList = document.getElementById("educationList");
  educationList.innerHTML = "";
  document.querySelector(".previewEducationHeader").style.display = "none";
  formChange();
}

// <!-- ------------------------------------------------- -->

function handleKeyPress(event, addFunction) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addFunction();
  }
}

// <!-- ------------------------------------------------- -->
var experienceData = [];

function addExperience() {
  event.preventDefault();

  var jobTitle = document.getElementById("jobTitle").value;
  const company = document.getElementById("company").value;
  const jobDes = document.getElementById("jobDes").value;
  const jobStart = document.getElementById("jobStart").value || "1970-01-01";
  const jobEnd = document.getElementById("jobEnd").value || "1970-01-01";
  const jobPresent = document.getElementById("jobPresent").checked;

  if (jobTitle === "" || company === "") {
    alert("Please enter all experience details");
  } else {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startDate = new Date(jobStart);
    const endDate = jobPresent ? new Date() : new Date(jobEnd);

    const startMonth = monthNames[startDate.getMonth()];
    const startYear = startDate.getFullYear();
    const endMonth = jobPresent ? "Present" : monthNames[endDate.getMonth()];
    const endYear = jobPresent ? "" : endDate.getFullYear();
    const date = jobPresent
      ? "Present"
      : `${startMonth} ${startYear} to ${endMonth} ${endYear}`;

    var experienceList = document.getElementById("experienceList");
    var experienceItem = document.createElement("li");
    experienceItem.innerHTML = `
    <div class="experienceDisplay" id="experienceDisplay">
    <i class="bi bi-x experienceX" onclick="removeExperience(this)"></i>
      <div class="jobTitleContainer">
        <h3 class="jobTitleDisplay">${jobTitle},</h3>
        <p class="companyDisplay">${company}</p>
      </div>
      <p class="jobDateDisplay" style="font-style: italic">${startMonth} ${startYear} to ${endMonth} ${endYear}</p>
      <p class="jobDesDisplay">${jobDes}</p>
      </div>
    `;
    var previewExperienceHeader = document.querySelector(
      ".previewExperienceHeader"
    );
    if (previewExperienceHeader.style.display == "none") {
      previewExperienceHeader.style.display = "block";
    }

    experienceList.appendChild(experienceItem);

    const experienceObject = {
      jobTitle: jobTitle,
      company: company,
      jobDes: jobDes,
      date: date,
    };

    experienceData.push(experienceObject);

    resetExperience();
    toggleEndDate;
    formChange();
  }
}

// <!-- ------------------------------------------------- -->

function toggleEndDate() {
  const jobPresentCheckbox = document.getElementById("jobPresent");
  const jobEndInput = document.getElementById("jobEnd");

  jobEndInput.disabled = jobPresentCheckbox.checked;
  jobEndInput.value = jobPresentCheckbox.checked ? "" : jobEndInput.value;
}

// <!-- ------------------------------------------------- -->

function removeExperience(element) {
  element.closest("li").remove();

  var experienceList = document.getElementById("experienceList");
  var isEmpty = experienceList.childElementCount === 0;

  if (isEmpty) {
    document.querySelector(".previewExperienceHeader").style.display = "none";
  } else {
    document.querySelector(".previewExperienceHeader").style.display = "block";
  }

  formChange();
}

// <!-- ------------------------------------------------- -->

function resetExperience() {
  document.getElementById("jobTitle").value = "";
  document.getElementById("company").value = "";
  document.getElementById("jobDes").value = "";
  document.getElementById("jobStart").value = "";
  document.getElementById("jobEnd").value = "";
  document.getElementById("jobPresent").checked = false;
  toggleEndDate();
}

// <!-- ------------------------------------------------- -->
var educationData = [];

function addEducation() {
  event.preventDefault();

  var courseName = document.getElementById("courseName").value;
  const courseUniversity = document.getElementById("courseUniversity").value;
  const courseDes = document.getElementById("courseDes").value;
  const courseStart =
    document.getElementById("courseStart").value || "1970-01-01";
  const courseEnd = document.getElementById("courseEnd").value || "1970-01-01";
  const coursePresent = document.getElementById("coursePresent").checked;

  if (courseName === "" || courseUniversity === "") {
    alert("Please enter all education details");
  } else {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startDate = new Date(courseStart);
    const endDate = coursePresent ? new Date() : new Date(courseEnd);

    const startMonth = monthNames[startDate.getMonth()];
    const startYear = startDate.getFullYear();
    const endMonth = coursePresent ? "Present" : monthNames[endDate.getMonth()];
    const endYear = coursePresent ? "" : endDate.getFullYear();
    const date = coursePresent
      ? "Present"
      : `${startMonth} ${startYear} to ${endMonth} ${endYear}`;

    var educationList = document.getElementById("educationList");
    var educationItem = document.createElement("li");
    educationItem.innerHTML = `
    <div class="educationDisplay" id="educationDisplay">
    <i class="bi bi-x educationX" onclick="removeEducation(this)"></i>
    <h3 class="courseNameDisplay">${courseName}</h3>
      <div class="courseUniContainer">
      <p class="courseUniversityDisplay">${courseUniversity}</p>
      <p class="courseDateDisplay" style="font-style: italic">${startMonth} ${startYear} to ${endMonth} ${endYear}</p>
      </div>
      <p class="courseDesDisplay">${courseDes}</p>
      </div>
    `;
    var previewEducationHeader = document.querySelector(
      ".previewEducationHeader"
    );
    if (previewEducationHeader.style.display == "none") {
      previewEducationHeader.style.display = "block";
    }

    educationList.appendChild(educationItem);

    const educationObject = {
      courseName: courseName,
      courseUniversity: courseUniversity,
      courseDes: courseDes,
      date: date,
    };

    educationData.push(educationObject);

    resetEducation();
    toggleEndDateEdu();
    formChange();
  }
}

// <!-- ------------------------------------------------- -->

function removeEducation(element) {
  element.closest("li").remove();

  var educationList = document.getElementById("educationList");
  var isEmpty = educationList.childElementCount === 0;

  if (isEmpty) {
    document.querySelector(".previewEducationHeader").style.display = "none";
  } else {
    document.querySelector(".previewEducationHeader").style.display = "block";
  }

  formChange();
}

// <!-- ------------------------------------------------- -->

function toggleEndDateEdu() {
  const coursePresentCheckbox = document.getElementById("coursePresent");
  const courseEndInput = document.getElementById("courseEnd");

  courseEndInput.disabled = coursePresentCheckbox.checked;
  courseEndInput.value = coursePresentCheckbox.checked
    ? ""
    : courseEndInput.value;
}

// <!-- ------------------------------------------------- -->

function resetEducation() {
  document.getElementById("courseName").value = "";
  document.getElementById("courseUniversity").value = "";
  document.getElementById("courseDes").value = "";
  document.getElementById("courseStart").value = "";
  document.getElementById("courseEnd").value = "";
  document.getElementById("coursePresent").checked = false;

  toggleEndDateEdu();
}

// <!-- ------------------------------------------------- -->

function confirmClear() {
  var result = confirm("Are you sure you want to proceed?");
  if (result) {
    clearForm();
    document.getElementById("previewContainer").style.opacity = "0";
  } else {
    return;
  }
}

// <!-- ------------------------------------------------- -->

function downloadPDF() {
  var printContents =
    "<style>@page { margin: 5px; size: auto; }</style>" +
    document.getElementById("previewResume").innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();

  document.body.innerHTML = originalContents;
}

// function downloadPDF() {
//   const previewResume = document.getElementById("previewResume");

//   html2pdf().from(previewResume).save("resume.pdf");
// }

// <!-- ------------------------------------------------- -->

document.querySelector(".submitBtn").addEventListener("click", function (e) {
  e.preventDefault();
  const data = {
    name:
      document.getElementById("firstName").value +
      " " +
      document.getElementById("lastName").value,
    phone: document.getElementById("phone").value,
    pemail: document.getElementById("email").value,
    location: document.getElementById("location").value,
    aboutmeDes: document.getElementById("aboutmeDes").value,
  };
  data.experienceData = experienceData;
  data.educationData = educationData;
  data.skillData = skillData;
  data.langData = langData;
  data.hobbyData = hobbyData;

  fetch("/formSubmit", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      if (data.message === "Form submitted successfully!") {
        return;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
