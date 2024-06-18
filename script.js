document.addEventListener("DOMContentLoaded", function() {
    var registrationBtn = document.getElementById("registrationBtn");
    var registrationForm = document.getElementById("registrationForm");
  
    registrationBtn.addEventListener("click", function(event) {

      event.preventDefault();
  

      if (registrationForm.style.display === "none") {
        registrationForm.style.display = "block";
      } else {
        registrationForm.style.display = "none";
      }
    });
  });
 
const skillsDictionary = {
  "soft": [
    "Коммуникация", "Командная работа", "Обучаемость", "Гибкость", "Творчество",
    "Эмпатия", "Адаптивность", "Ответственность", "Лидерство", "Критическое мышление",
    "Решение проблем", "Менеджмент времени", "Организованность", "Стрессоустойчивость",
    "Работа с клиентами", "Презентационные навыки", "Навыки слушания", "Конфликтология",
    "Самомотивация", "Проактивность"
  ],
  "hard": [
    "HTML", "CSS", "JavaScript", "PHP", "MySQL", "Python", "PostgreSQL", "SQL", 
    "C++", "C#", "Java", "Ruby", "Swift", "Kotlin", "TypeScript", "R", "MATLAB",
    "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Linux", "UNIX", 
    "Agile", "Scrum", "DevOps", "Machine Learning", "Data Science", "Big Data",
    "Hadoop", "Spark", "TensorFlow", "PyTorch", "Tableau", "Power BI", "SAS",
    "SPSS", "JIRA", "Trello", "CI/CD", "REST API", "GraphQL", "Blockchain",
    "IoT", "Cybersecurity", "Penetration Testing", "Network Administration",
    "Web Development", "Mobile Development", "Game Development", "Embedded Systems"
  ]
};

const errorWords = {
  "коммуникация": ["коммуникаця", "коммуникция", "коммуникации"],
  "командная работа": ["командная рабта", "командная рабт", "командн работа"],
  "обучаемость": ["обучаемост", "обучаемостьь", "обучаемсоть"],
  "гибкость": ["гибксть", "гибкостьь", "гибксоть"],
  "творчество": ["творчеств", "творчествво", "творчесво"],
  "эмпатия": ["эмптия", "эмпатияи", "эмптияя"],
  "адаптивность": ["адаптивност", "адаптивностьь", "адаптивнсть"],
  "ответственность": ["ответсвеность", "ответственость", "ответственностьь"],
  "лидерство": ["лидерств", "лидерстов", "лидерствоо"],
  "критическое мышление": ["критическое мышлени", "критическое мшление", "критическое мышленее"],
  "решение проблем": ["решение пробем", "решение проблм", "решние проблем"],
  "менеджмент времени": ["менеджмент времни", "менеджмент времение", "менджмент времени"],
  "организованность": ["организованностьь", "организованост", "органзованность"],
  "стрессоустойчивость": ["стрессоустойчивост", "стрессоустойчивостьь", "стрессоусточивость"],
  "работа с клиентами": ["работа с клиентам", "работа с клинтами", "работа с клентами"],
  "презентационные навыки": ["презентационные навыке", "презентационне навыки", "презентационные навыко"],
  "навыки слушания": ["навыки слушани", "навыки слушаня", "навыки слушнеия"],
  "конфликтология": ["конфликтологияя", "конфликтлогия", "конфликтологияи"],
  "самомотивация": ["самомотивция", "самомотиваци", "самомотвация"],
  "проактивность": ["проактивност", "проактивнсть", "проактивностьь"],
  "HTML": ["HTM", "HML", "HTL"],
  "CSS": ["CS", "CSSL", "C"],
  "JavaScript": ["Javascrit", "Javscript", "Jvascript"],
  "PHP": ["PHPP", "PH", "PPHP"],
  "MySQL": ["MyQL", "MySL", "MSQL"],
  "Python": ["Pythn", "Pyton", "Pythno"],
  "PostgreSQL": ["PostgeSQL", "PostgreSQLL", "PostgrSQL"],
  "SQL": ["SLQ", "SGL", "SQQ"],
  "C++": ["C+++", "C++C", "CC++"],
  "C#": ["C##", "C#C", "CC#"],
  "Java": ["Jva", "Jav", "Jvaa"],
  "Ruby": ["Rby", "Ruy", "Rbby"],
  "Swift": ["Swft", "Swif", "Swiift"],
  "Kotlin": ["Kotln", "Kotin", "KotlinK"],
  "TypeScript": ["TypScript", "Typescrit", "TyeScript"],
  "R": ["Rr", "RR", "R1"],
  "MATLAB": ["MATLAb", "MATLB", "MATALB"],
  "Git": ["Gt", "Gitt", "Gti"],
  "Docker": ["Dockr", "Doker", "Docer"],
  "Kubernetes": ["Kubernets", "Kubernts", "Kubernete"],
  "AWS": ["AWW", "AWWSS", "AAS"],
  "Azure": ["Azue", "Azuure", "Azre"],
  "GCP": ["GCPG", "GPP", "GGCP"],
  "Linux": ["Lnux", "Lix", "Linx"],
  "UNIX": ["UNIXX", "UNX", "UNNIX"],
  "Agile": ["Agil", "Aglie", "Agille"],
  "Scrum": ["Scum", "Scrumm", "Scru"],
  "DevOps": ["DevOpss", "DevOp", "DvOps"],
  "Machine Learning": ["Machine Learnng", "Machne Learning", "Machine Larning"],
  "Data Science": ["Data Sience", "Data Scince", "Dta Science"],
  "Big Data": ["Bg Data", "Big Dta", "Big Dtaa"],
  "Hadoop": ["Hadop", "Hadooop", "Hadoopp"],
  "Spark": ["Spak", "Sparrk", "Sprk"],
  "TensorFlow": ["TensorFlw", "TensorFlw", "TensrFlow"],
  "PyTorch": ["PyTorh", "Pytorch", "PyyTorch"],
  "Tableau": ["Tableu", "Tablau", "Tableua"],
  "Power BI": ["PowerB", "Powe BI", "Power BI"],
  "SAS": ["SASS", "SAAS", "SSAS"],
  "SPSS": ["SPPSS", "SPS", "SSPSS"],
  "JIRA": ["JRA", "JIAA", "JIRAA"],
  "Trello": ["Trello", "Trelloo", "Trelo"],
  "CI/CD": ["CI/CDD", "CI/C", "CICD"],
  "REST API": ["RES API", "RESTP", "REST AP"],
  "GraphQL": ["GrahQL", "Graph QL", "GraphQl"],
  "Blockchain": ["Blockchan", "Blokchain", "Blockchainn"],
  "IoT": ["IoTT", "IOT", "IOTT"],
  "Cybersecurity": ["Cybersecurty", "Cyberscurity", "Cybersec"],
  "Penetration Testing": ["Penetrtion Testing", "Penetrtion", "Penetation Testing"],
  "Network Administration": ["Netwrk Administration", "Network Adminstration", "Netwrk Admin"],
  "Web Development": ["Web Devlopment", "Web Develpment", "Web Developmentt"],
  "Mobile Development": ["Mobile Develoment", "Mobie Development", "Mobile Devlopment"],
  "Game Development": ["Game Devlopment", "Game Developmnt", "Game Develoment"],
  "Embedded Systems": ["Embeded Systems", "Embdded Systems", "Embedded Systms"]
};
  

  function extractSkills(text) {
    const words = text.split(/\s*,\s*|\s+/);
    const extractedSkills = { "soft": new Set(), "hard": new Set() };
    
   words.forEach(word => {
    const lowerWord = word.toLowerCase();
    const correctWord = Object.keys(errorWords).find(key => errorWords[key].includes(lowerWord));
    
    if (correctWord) {
      if (skillsDictionary["soft"].map(s => s.toLowerCase()).includes(correctWord)) {
        extractedSkills["soft"].add(correctWord);
      } else if (skillsDictionary["hard"].map(s => s.toLowerCase()).includes(correctWord)) {
        extractedSkills["hard"].add(correctWord);
      }
    } else {
      if (skillsDictionary["soft"].map(s => s.toLowerCase()).includes(lowerWord)) {
        extractedSkills["soft"].add(word);
      } else if (skillsDictionary["hard"].map(s => s.toLowerCase()).includes(lowerWord)) {
        extractedSkills["hard"].add(word);
      }
    }
  });
  
    return extractedSkills;
  }
  

  
  
  document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.deleteButton');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', async function() {
        const vacancyId = this.getAttribute('data-vacancy-id');
  
        try {
          const response = await fetch('/deletevacancy', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vacancy_id: vacancyId })
          });
  
          if (response.ok) {
            const result = await response.json();
            console.log('Вакансия успешно удалена:', result);
            const vacancyElement = document.getElementById(`vacancy-${vacancyId}`);
            if (vacancyElement) {
              vacancyElement.remove();
            }
          } else {
            const error = await response.json();
            console.error('Ошибка при удалении вакансии:', error);
            alert('Ошибка при удалении вакансии: ' + error.error);
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса на удаление вакансии:', error);
          alert('Ошибка при выполнении запроса на удаление вакансии');
        }
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const fullName = document.getElementById('fullName').value;
      const birthDate = document.getElementById('birthDate').value;
      const specialization = document.getElementById('specialization').value;
      const experience = document.getElementById('experience').value;
      const salaryExpectation = document.getElementById('salaryExpectation').value;
      const aboutMe = document.getElementById('aboutMe').value;
      const skillsInput = document.getElementById('skills').value;
  

      const extractedSkills = extractSkills(skillsInput);
  
      const skills = [];
      for (const [type, skillsSet] of Object.entries(extractedSkills)) {
        skillsSet.forEach(skill => {
          skills.push({ type, name: skill });
        });
      }
  
      const data = {
        full_name: fullName,
        birth_date: birthDate,
        profession: specialization,
        work_experience: experience,
        required_experience: experience, 
        salary_expectation: salaryExpectation,
        about_info: aboutMe,
        skills: skills
      };
  
      try {
        const response = await fetch('/addresume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          const result = await response.json();
          alert('Резюме успешно сохранено!');
        } else {
          const error = await response.json();
          console.error('Ошибка при сохранении резюме:', error);
          alert('Ошибка при сохранении резюме: ' + error.error);
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        alert('Ошибка при отправке запроса');
      }
    });
  });



async function loadResume() {
    try {
        const response = await fetch(`/getresume?resume_id=${resumeId}`);
        const resume = await response.json();
        
        if (response.ok) {
            document.getElementById('fullName').value = resume.full_name;
            document.getElementById('birthDate').value = resume.birth_date;
            document.getElementById('specialization').value = resume.profession;
            document.getElementById('experience').value = resume.work_experience;
            document.getElementById('salaryExpectation').value = resume.salary_expectation;
            document.getElementById('aboutMe').value = resume.about_info;
            document.getElementById('skills').value = resume.skills.map(skill => skill.skill_name).join(', ');
        } else {
            console.error('Ошибка при получении данных резюме:', resume.error);
        }
    } catch (error) {
        console.error('Ошибка при получении данных резюме:', error);
    }
}

async function updateResume() {
    const full_name = document.getElementById('fullName').value;
    const birth_date = document.getElementById('birthDate').value;
    const profession = document.getElementById('specialization').value;
    const work_experience = document.getElementById('experience').value;
    const salary_expectation = document.getElementById('salaryExpectation').value;
    const about_info = document.getElementById('aboutMe').value;
    const skillsText = document.getElementById('skills').value;

    const skills = extractSkills(skillsText);

    const payload = {
        resume_id: resumeId,
        full_name,
        profession,
        work_experience,
        required_experience: '', 
        salary_expectation,
        about_info,
        birth_date,
        skills: [
            ...Array.from(skills.soft).map(skill => ({ type: 'soft', name: skill })),
            ...Array.from(skills.hard).map(skill => ({ type: 'hard', name: skill }))
        ]
    };

    try {
        const response = await fetch('/updateresume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Резюме успешно обновлено:', result);
        } else {
            console.error('Ошибка при обновлении резюме:', result.error);
        }
    } catch (error) {
        console.error('Ошибка при обновлении резюме:', error);
    }
}
document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateResume();
});
window.addEventListener('load', loadResume);

async function loadVacancy() {
  try {
      const response = await fetch(`/getvacancy?vacancy_id=${vacancyId}`);
      const vacancy = await response.json();

      if (response.ok) {
          document.getElementById('jobTitle').value = vacancy.vacancy_name;
          document.getElementById('companyName').value = vacancy.company_name;
          document.getElementById('salary').value = vacancy.salary;
          document.getElementById('schedule').value = vacancy.work_schedule;
          document.getElementById('experience').value = vacancy.required_experience;
          document.getElementById('skills').value = vacancy.required_skills.join(', ');
          document.getElementById('about').value = vacancy.about;
      } else {
          console.error('Ошибка при получении данных вакансии:', vacancy.error);
      }
  } catch (error) {
      console.error('Ошибка при получении данных вакансии:', error);
  }
}

async function saveVacancy(event) {
  event.preventDefault();

  const vacancy_name = document.getElementById('jobTitle').value;
  const company_name = document.getElementById('companyName').value;
  const salary = document.getElementById('salary').value;
  const work_schedule = document.getElementById('schedule').value;
  const required_experience = document.getElementById('experience').value;
  const skillsText = document.getElementById('skills').value;
  const about = document.getElementById('about').value;

  const required_skills = extractSkills(skillsText);

  const payload = {
      vacancy_id: vacancyId,
      company_name,
      vacancy_name,
      salary,
      work_schedule,
      required_experience,
      required_skills,
      about
  };

  try {
      const method = vacancyId ? 'POST' : 'PUT';
      const url = vacancyId ? '/updatevacancy' : '/addvacancy';
      const response = await fetch(url, {
          method,
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
          console.log('Вакансия успешно сохранена:', result);
      } else {
          console.error('Ошибка при сохранении вакансии:', result.error);
      }
  } catch (error) {
      console.error('Ошибка при сохранении вакансии:', error);
  }
}

document.getElementById('vacancyForm').addEventListener('submit', saveVacancy);

window.addEventListener('load', loadVacancy);

document.addEventListener('DOMContentLoaded', function() {
  const deleteButtons = document.querySelectorAll('.btn-danger');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const vacancyId = this.getAttribute('data-vacancy-id');
      
      try {
        const response = await fetch('/deletevacancy', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ vacancy_id: vacancyId })
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Вакансия успешно удалена:', result.message);
          const listItem = this.closest('.list-group-item');
          listItem.remove();
        } else {
          console.error('Ошибка при удалении вакансии:', result.error);
        }
      } catch (error) {
        console.error('Ошибка при удалении вакансии:', error);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('/getvacancies');
    const vacancies = await response.json();

    if (response.ok) {
      const vacancyList = document.getElementById('vacancyList');

      vacancies.forEach(vacancy => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
          <div>
            <h5 class="mb-1">${vacancy.vacancy_name}</h5>
            <p class="mb-1">Требуемый опыт: ${vacancy.required_experience}</p>
            <p class="mb-1">Заработная плата: ${vacancy.salary} рублей</p>
          </div>
          <a href="vacancy.html?id=${vacancy.vacancy_id}" class="btn btn-primary">Подробнее</a>
        `;
        vacancyList.appendChild(listItem);
      });
    } else {
      console.error('Ошибка при получении списка вакансий:', vacancies.error);
    }
  } catch (error) {
    console.error('Ошибка при получении списка вакансий:', error);
  }
});
document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const vacancyId = urlParams.get('id');

  if (!vacancyId) {
    console.error('ID вакансии не указан');
    return;
  }

  try {
    const response = await fetch(`/getvacancy/${vacancyId}`);
    const vacancy = await response.json();

    if (response.ok) {
      const vacancyDetails = document.getElementById('vacancyDetails');
      vacancyDetails.innerHTML = `
        <h1>${vacancy.vacancy_name}</h1>
        <p><strong>Компания:</strong> ${vacancy.company}</p>
        <p><strong>Заработная плата:</strong> ${vacancy.salary} рублей</p>
        <p><strong>График работы:</strong> ${vacancy.work_schedule}</p>
        <p><strong>Требуемый опыт работы:</strong> ${vacancy.required_experience}</p>
        <p><strong>Требуемые навыки:</strong> ${vacancy.required_skills}</p>
        <p><strong>Описание вакансии:</strong> ${vacancy.description}</p>
        <button class="btn btn-primary" id="applyButton">Откликнуться</button>
      `;

      const applyButton = document.getElementById('applyButton');
      applyButton.addEventListener('click', async function() {
        try {
          const response = await fetch('/apply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              vacancy_id: vacancyId,
              resume_id: 1 
            })
          });

          const result = await response.json();

          if (response.ok) {
            showResponseModal('Отклик успешно создан!');
          } else {
            showResponseModal('Ошибка при создании отклика');
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
          showResponseModal('Произошла ошибка при отправке запроса');
        }
      });
    } else {
      console.error('Ошибка при получении информации о вакансии:', vacancy.error);
    }
  } catch (error) {
    console.error('Ошибка при получении информации о вакансии:', error);
  }
});

function showResponseModal(message) {
  const responseModalBody = document.getElementById('responseModalBody');
  responseModalBody.innerHTML = `<p>${message}</p>`;
  $('#responseModal').modal('show'); 
}

async function viewResume(resumeId) {
  try {
    const response = await fetch(`/getresume/${resumeId}`);
    const resume = await response.json();

    if (response.ok) {
      const queryParams = new URLSearchParams({
        id: resume.resume_id,
        name: resume.full_name,
        specialty: resume.specialty,
        experience: resume.experience,
        salary_expectation: resume.salary_expectation,
        about_me: resume.about_me,
        soft_skills: resume.soft_skills.join(', '), 
        hard_skills: resume.hard_skills.join(', ') 
      });

      window.location.href = `resume.html?${queryParams.toString()}`;
    } else {
      console.error('Ошибка при получении данных резюме');
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('/getapplicants');
    const applicants = await response.json();

    if (response.ok) {
      const resumeList = document.getElementById('resumeList');
      resumeList.innerHTML = applicants.map(applicant => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${applicant.full_name}
          <span class="badge badge-primary badge-pill">
            <button type="button" class="btn btn-sm btn-success" onclick="viewResume('${applicant.resume_id}')">Просмотреть резюме</button>
            <button type="button" class="btn btn-sm btn-success" onclick="viewContacts('${applicant.resume_id}')">Просмотреть контакты</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="rejectResume('${applicant.resume_id}')">Отказать</button>
            <button type="button" class="btn btn-sm btn-primary" onclick="deleteResume('${applicant.resume_id}')">Удалить</button>
          </span>
        </li>
      `).join('');
    } else {
      console.error('Ошибка при получении списка откликнувшихся:', applicants.error);
    }
  } catch (error) {
    console.error('Ошибка при получении списка откликнувшихся:', error);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('/getapplicants')
    .then(response => response.json())
    .then(applicants => {
      const applicantsList = document.getElementById('applicantsList');

      applicants.forEach(applicant => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
          ${applicant.full_name}
          <span class="badge badge-primary badge-pill">
            <button type="button" class="btn btn-sm btn-success" onclick="viewResume(${applicant.applicant_id})">Просмотреть резюме</button>
            <button type="button" class="btn btn-sm btn-success" onclick="viewContacts(${applicant.applicant_id})">Просмотреть контакты</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="rejectApplicant(${applicant.applicant_id})">Отказать</button>
          </span>
        `;
        applicantsList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Ошибка при загрузке списка откликнувшихся:', error);
    });
});

function viewContacts(applicantId) {
  fetch(`/getapplicantcontacts/${applicantId}`)
    .then(response => response.json())
    .then(data => {
      const { phone_number, contact_email } = data;
      const viewContactsModal = document.getElementById('viewContactsModal');
      const modalBody = viewContactsModal.querySelector('.modal-body');
      modalBody.innerHTML = `
        <p>Телефон: ${phone_number}</p>
        <p>Email: ${contact_email}</p>
      `;
      $(viewContactsModal).modal('show'); 
    })
    .catch(error => {
      console.error('Ошибка при загрузке контактных данных:', error);
    });
}
document.addEventListener('DOMContentLoaded', function() {
  const deleteButtons = document.querySelectorAll('.deleteButton');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const applicationId = this.getAttribute('data-application-id');

      if (confirm('Вы уверены, что хотите удалить этот отклик?')) {
        try {
          const response = await fetch('/deleteapplication', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ application_id: applicationId })
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Отклик успешно удален:', result);
            const listItem = document.getElementById(`application-${applicationId}`);
            if (listItem) {
              listItem.remove();
            }
            alert('Отклик успешно удален');
          } else {
            const error = await response.json();
            console.error('Ошибка при удалении отклика:', error);
            alert('Ошибка при удалении отклика: ' + error.error);
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса на удаление отклика:', error);
          alert('Ошибка при выполнении запроса на удаление отклика');
        }
      }
    });
  });
});