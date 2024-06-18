const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'diplom',
  password: 'admin',
  port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    const user_id = newUser.rows[0].user_id;
    await pool.query(
      'INSERT INTO user_profiles (user_id, full_name, phone_number, contact_email) VALUES ($1, $2, $3, $4)',
      [user_id, null, null, null]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length > 0) {
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (validPassword) {
        res.status(200).json({ message: 'Вход выполнен успешно' });
      } else {
        res.status(400).json({ error: 'Неверный пароль' });
      }
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/update_fio', async (req, res) => {
  const { user_id, full_name } = req.body;

  try {
    const updatedUser = await pool.query(
      'UPDATE user_profiles SET full_name = $1 WHERE user_id = $2 RETURNING *',
      [full_name, user_id]
    );
    
    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.status(200).json(updatedUser.rows[0]);
  } catch (error) {
    console.error('Ошибка обновления номера телефона:', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.post('/update_email', async (req, res) => {
  const { user_id, update_email } = req.body;

  try {
    const updatedUser = await pool.query(
      'UPDATE user_profiles SET update_email = $1 WHERE user_id = $2 RETURNING *',
      [update_email, user_id]
    );
    
    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.status(200).json(updatedUser.rows[0]);
  } catch (error) {
    console.error('Ошибка обновления номера телефона:', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.post('/update_phone_number', async (req, res) => {
  const { user_id, phone_number } = req.body;

  try {
    const updatedUser = await pool.query(
      'UPDATE user_profiles SET phone_number = $1 WHERE user_id = $2 RETURNING *',
      [phone_number, user_id]
    );
    
    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.status(200).json(updatedUser.rows[0]);
  } catch (error) {
    console.error('Ошибка обновления номера телефона:', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.get('/get_fio', async (req, res) => {
  const { user_id } = req.params;

  try {
    const userResult = await pool.query(
      'SELECT full_name FROM user_profiles WHERE user_id = $1',
      [user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.status(200).json({ full_name: userResult.rows[0].full_name });
  } catch (error) {
    console.error('Ошибка при получении полного имени пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});

app.get('/get_contact_email', async (req, res) => {
  const { user_id } = req.params;

  try {
    const userResult = await pool.query(
      'SELECT contact_email FROM user_profiles WHERE user_id = $1',
      [user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.status(200).json({ contact_email: userResult.rows[0].contact_email });
  } catch (error) {
    console.error('Ошибка при получении контактного email пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});


app.get('/get_phone_number', async (req, res) => {
  const { user_id } = req.params;

  try {
    const userResult = await pool.query(
      'SELECT phone_number FROM user_profiles WHERE user_id = $1',
      [user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.status(200).json({ phone_number: userResult.rows[0].phone_number });
  } catch (error) {
    console.error('Ошибка при получении номера телефона пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/addvacancy', async (req, res) => {
  const user_id = req.session.userId; 
  const { company_name, vacancy_name, salary, work_schedule, required_experience, required_skills, about } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO vacancies (user_id, company_name, vacancy_name, salary, work_schedule, required_experience, required_skills, about) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [user_id, company_name, vacancy_name, salary, work_schedule, required_experience, required_skills, about]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при сохранении вакансии:', error);
    res.status(500).json({ error: 'Ошибка при сохранении вакансии' });
  }
});

app.get('/getvacancy/:vacancy_id', async (req, res) => {
  const { vacancy_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM vacancies WHERE vacancy_id = $1',
      [vacancy_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Вакансия не найдена' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при получении информации о вакансии:', error);
    res.status(500).json({ error: 'Ошибка при получении информации о вакансии' });
  }
});

app.post('/updatevacancy', async (req, res) => {
  const user_id = req.session.userId; 
  const { vacancy_id, company_name, vacancy_name, salary, work_schedule, required_experience, required_skills, about } = req.body;

  try {
    const result = await pool.query(
      'UPDATE vacancies SET company_name = $1, vacancy_name = $2, salary = $3, work_schedule = $4, required_experience = $5, required_skills = $6, about = $7 WHERE vacancy_id = $8 AND user_id = $9 RETURNING *',
      [company_name, vacancy_name, salary, work_schedule, required_experience, required_skills, about, vacancy_id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Вакансия не найдена или вы не являетесь ее владельцем' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при обновлении вакансии:', error);
    res.status(500).json({ error: 'Ошибка при обновлении вакансии' });
  }
});

app.delete('/deletevacancy', async (req, res) => {
  const user_id = req.session.userId; 
  const { vacancy_id } = req.body;

  try {
    const result = await pool.query(
      'DELETE FROM vacancies WHERE vacancy_id = $1 AND user_id = $2 RETURNING *',
      [vacancy_id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Вакансия не найдена или вы не являетесь ее владельцем' });
    }

    res.status(200).json({ message: 'Вакансия успешно удалена', vacancy: result.rows[0] });
  } catch (error) {
    console.error('Ошибка при удалении вакансии:', error);
    res.status(500).json({ error: 'Ошибка при удалении вакансии' });
  }
});

app.get('/getvacancies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vacancies');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении списка вакансий:', error);
    res.status(500).json({ error: 'Ошибка при получении списка вакансий' });
  }
});

app.post('/addresume', async (req, res) => {
  const user_id = req.session.userId;
  const { full_name, profession, work_experience, required_experience, salary_expectation, about_info, birth_date, skills } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      'INSERT INTO resumes (user_id, full_name, profession, work_experience, required_experience, salary_expectation, about_info, birth_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING resume_id',
      [user_id, full_name, profession, work_experience, required_experience, salary_expectation, about_info, birth_date]
    );

    const resume_id = result.rows[0].resume_id;
    const skillsInserts = skills.map(skill => {
      return client.query(
        'INSERT INTO skills (resume_id, skill_type, skill_name) VALUES ($1, $2, $3)',
        [resume_id, skill.type, skill.name]
      );
    });

    await Promise.all(skillsInserts);

    await client.query('COMMIT');
    res.status(201).json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Ошибка при сохранении резюме и навыков:', error);
    res.status(500).json({ error: 'Ошибка при сохранении резюме и навыков' });
  } finally {
    client.release();
  }
});

app.post('/updateresume', async (req, res) => {
  const user_id = req.session.userId;
  const { resume_id, full_name, profession, work_experience, required_experience, salary_expectation, about_info, birth_date, skills } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const updateResumeResult = await client.query(
      'UPDATE resumes SET full_name = $1, profession = $2, work_experience = $3, required_experience = $4, salary_expectation = $5, about_info = $6, birth_date = $7 WHERE resume_id = $8 AND user_id = $9 RETURNING *',
      [full_name, profession, work_experience, required_experience, salary_expectation, about_info, birth_date, resume_id, user_id]
    );

    if (updateResumeResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Резюме не найдено или вы не являетесь его владельцем' });
    }

    await client.query(
      'DELETE FROM skills WHERE resume_id = $1',
      [resume_id]
    );

    const skillsInserts = skills.map(skill => {
      return client.query(
        'INSERT INTO skills (resume_id, skill_type, skill_name) VALUES ($1, $2, $3)',
        [resume_id, skill.type, skill.name]
      );
    });

    await Promise.all(skillsInserts);

    await client.query('COMMIT');
    res.status(200).json(updateResumeResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Ошибка при обновлении резюме и навыков:', error);
    res.status(500).json({ error: 'Ошибка при обновлении резюме и навыков' });
  } finally {
    client.release();
  }
});

app.get('/getresume', async (req, res) => {
  const { resume_id } = req.params;
  const user_id = req.session.userId;

  try {
    const resumeResult = await pool.query(
      'SELECT * FROM resumes WHERE resume_id = $1 AND user_id = $2',
      [resume_id, user_id]
    );

    if (resumeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Резюме не найдено или вы не являетесь его владельцем' });
    }

    const skillsResult = await pool.query(
      'SELECT * FROM skills WHERE resume_id = $1',
      [resume_id]
    );

    const resume = resumeResult.rows[0];
    resume.skills = skillsResult.rows;

    res.status(200).json(resume);
  } catch (error) {
    console.error('Ошибка при получении данных резюме:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.get('/getapplicants', async (req, res) => {
  try {
    const resumesResult = await pool.query(
      'SELECT resume_id, full_name FROM resumes'
    );

    const applicants = resumesResult.rows;
    res.status(200).json(applicants);
  } catch (error) {
    console.error('Ошибка при получении списка откликнувшихся:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/apply', async (req, res) => {
  const { vacancy_id, resume_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO applications (vacancy_id, resume_id) VALUES ($1, $2) RETURNING *',
      [vacancy_id, resume_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при создании отклика:', error);
    res.status(500).json({ error: 'Ошибка при создании отклика' });
  }
});

app.delete('/deleteapplication', async (req, res) => {
  const { application_id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM applications WHERE application_id = $1 RETURNING *',
      [application_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Отклик не найден' });
    }

    res.status(200).json({ message: 'Отклик успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении отклика:', error);
    res.status(500).json({ error: 'Ошибка при удалении отклика' });
  }
});
app.get('/getapplicantcontacts/:resume_id', async (req, res) => {
  const { resume_id } = req.params;

  try {
    const resumeResult = await pool.query(
      'SELECT user_id FROM resumes WHERE resume_id = $1',
      [resume_id]
    );

    if (resumeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Резюме не найдено' });
    }

    const user_id = resumeResult.rows[0].user_id;
    const userProfileResult = await pool.query(
      'SELECT phone_number, contact_email FROM user_profiles WHERE user_id = $1',
      [user_id]
    );

    if (userProfileResult.rows.length === 0) {
      return res.status(404).json({ error: 'Контактные данные не найдены' });
    }

    const { phone_number, contact_email } = userProfileResult.rows[0];

    res.status(200).json({ phone_number, contact_email });
  } catch (error) {
    console.error('Ошибка при получении контактных данных:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
