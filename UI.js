export default class UI {
    constructor(skillTracker) {
        this.skillTracker = skillTracker;
        this.skillsList = document.getElementById('skills-list');
    }

    renderSkills() {
        console.log("Рендеринг навыков:", this.skillTracker.skills);
        this.skillsList.innerHTML = '';

        this.skillTracker.skills.forEach((skill, skillIndex) => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill list-group-item';

            skillElement.innerHTML = `
                <h3>${skill.name}
                    <span class="badge bg-success">${skill.progress}%</span>
                </h3>
                <div class="progress mb-2">
                    <div class="progress-bar" role="progressbar" style="width: ${skill.progress}%"></div>
                </div>
                <button class="btn btn-outline-primary btn-sm me-2" onclick="openModal('level', ${skillIndex})">Добавить уровень</button>
                <button class="btn btn-outline-secondary btn-sm" onclick="openModal('task', ${skillIndex})">Добавить задачу</button>
            `;

            skill.levels.forEach(level => {
                const levelElement = document.createElement('div');
                levelElement.className = 'level p-2 mb-2';

                levelElement.innerHTML = `<h4>${level.name}</h4>`;

                level.tasks.forEach(task => {
                    const taskElement = document.createElement('div');
                    taskElement.className = 'task form-check';
                    taskElement.innerHTML = `
                        <input type="checkbox" class="form-check-input" ${task.completed ? 'checked' : ''} 
                            onclick="window.handleTaskToggle('${skill.name}', '${level.name}', '${task.name}')">
                        <span class="form-check-label">${task.name}</span>
                    `;
                    levelElement.appendChild(taskElement);
                });

                skillElement.appendChild(levelElement);
            });

            this.skillsList.appendChild(skillElement);
        });
    }
}
