import SkillTracker from './SkillTracker.js';
import UI from './UI.js';

const skillTracker = new SkillTracker();
const ui = new UI(skillTracker);
ui.renderSkills(); 

let currentSkillIndex = null;


document.getElementById('add-skill-button').addEventListener('click', () => {
    const skillNameInput = document.getElementById('skill-name');
    const skillName = skillNameInput.value;
    console.log("Нажата кнопка 'Добавить навык'");
    if (skillName) {
        console.log(`Добавление навыка: ${skillName}`);
        skillTracker.addSkill(skillName);
        skillNameInput.value = ''; 
        ui.renderSkills();
    } else {
        console.log("Поле 'Название навыка' пустое");
    }
});

window.handleTaskToggle = (skillName, levelName, taskName) => {
    skillTracker.completeTask(skillName, levelName, taskName);
    ui.renderSkills();
};

window.openModal = (type, skillIndex) => {
    currentSkillIndex = skillIndex;
    document.getElementById('element-type').value = type;
    document.getElementById('element-name').value = '';
    new bootstrap.Modal(document.getElementById('addLevelTaskModal')).show();
};

document.getElementById('save-element-button').addEventListener('click', () => {
    const elementType = document.getElementById('element-type').value;
    const elementName = document.getElementById('element-name').value;
    
    if (elementName && currentSkillIndex !== null) {
        const skillName = skillTracker.skills[currentSkillIndex].name;
        
        if (elementType === 'level') {
            skillTracker.addLevel(skillName, elementName);
        } else if (elementType === 'task') {
            const levelName = prompt("Введите название уровня, к которому нужно добавить задачу:");
            if (levelName) {
                skillTracker.addTask(skillName, levelName, elementName);
            }
        }

        ui.renderSkills();
        new bootstrap.Modal(document.getElementById('addLevelTaskModal')).hide();
    }
});
