export default class SkillTracker {
    constructor() {
        this.skills = [];
        this.loadFromLocalStorage();
    }

    // Добавление нового навыка
    addSkill(skillName) {
        if (!skillName || typeof skillName !== 'string' || !skillName.trim()) {
            console.error("Некорректное название навыка.");
            return;
        }
        
        const newSkill = {
            name: skillName.trim(),
            levels: [],
            progress: 0
        };

        this.skills.push(newSkill);
        console.log(`Навык '${skillName}' успешно добавлен.`);
        this.saveToLocalStorage();
    }

    // Добавление уровня к существующему навыку
    addLevel(skillName, levelName) {
        if (!skillName || !levelName) {
            console.error("Название навыка или уровня не может быть пустым.");
            return;
        }
        
        const skill = this.findSkill(skillName);
        if (!skill) {
            console.error(`Навык "${skillName}" не найден.`);
            return;
        }

        skill.levels.push({
            name: levelName.trim(),
            tasks: [],
            completedTasks: 0
        });

        console.log(`Уровень '${levelName}' добавлен к навыку '${skillName}'.`);
        this.saveToLocalStorage();
    }

    // Добавление задачи к уровню в навыке
    addTask(skillName, levelName, taskName) {
        if (!skillName || !levelName || !taskName) {
            console.error("Название навыка, уровня или задачи не может быть пустым.");
            return;
        }

        const skill = this.findSkill(skillName);
        const level = skill ? this.findLevel(skill, levelName) : null;

        if (!skill || !level) {
            console.error(`Уровень "${levelName}" или навык "${skillName}" не найден.`);
            return;
        }

        level.tasks.push({ name: taskName.trim(), completed: false });
        console.log(`Задача '${taskName}' добавлена в уровень '${levelName}' для навыка '${skillName}'.`);
        this.saveToLocalStorage();
    }

    // Отметка задачи как выполненной
    completeTask(skillName, levelName, taskName) {
        const skill = this.findSkill(skillName);
        const level = skill ? this.findLevel(skill, levelName) : null;
        const task = level ? this.findTask(level, taskName) : null;

        if (!task) {
            console.error(`Задача "${taskName}" не найдена в уровне "${levelName}" для навыка "${skillName}".`);
            return;
        }

        task.completed = !task.completed; // Переключаем статус задачи
        console.log(`Задача '${taskName}' изменена на '${task.completed ? 'выполнено' : 'не выполнено'}'.`);
        
        this.updateSkillProgress(skill); // Обновляем прогресс навыка
        this.saveToLocalStorage();
    }

    // Обновление прогресса навыка
    updateSkillProgress(skill) {
        if (!skill) return;

        const totalTasks = skill.levels.reduce((sum, level) => sum + level.tasks.length, 0);
        const completedTasks = skill.levels.reduce((sum, level) => sum + level.tasks.filter(task => task.completed).length, 0);

        skill.progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
    }

    // Сохранение данных в localStorage
    saveToLocalStorage() {
        localStorage.setItem('skills', JSON.stringify(this.skills));
        console.log("Данные успешно сохранены в localStorage.");
    }

    // Загрузка данных из localStorage
    loadFromLocalStorage() {
        const savedSkills = JSON.parse(localStorage.getItem('skills'));
        if (Array.isArray(savedSkills)) {
            this.skills = savedSkills;
            console.log('Данные успешно загружены из localStorage.');
        } else {
            console.warn("Данные в localStorage отсутствуют или повреждены.");
        }
    }

    // Вспомогательные методы для поиска навыков, уровней и задач
    findSkill(skillName) {
        return this.skills.find(skill => skill.name === skillName.trim());
    }

    findLevel(skill, levelName) {
        return skill.levels.find(level => level.name === levelName.trim());
    }

    findTask(level, taskName) {
        return level.tasks.find(task => task.name === taskName.trim());
    }
}
