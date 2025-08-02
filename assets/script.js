document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        btn: document.getElementById('calculate-btn'),
        input: document.getElementById('birthday'),
        error: document.getElementById('error'),
        result: document.getElementById('result')
    };

    // Обработчики событий
    elements.btn.addEventListener('click', handleCalculate);
    elements.input.addEventListener('input', hideError);

    function handleCalculate() {
        if (!elements.input.value) {
            showError();
            return;
        }

        const days = getDaysUntilBirthday(elements.input.value);
        elements.result.textContent = formatResult(days);
    }

    function getDaysUntilBirthday(dateString) {
        const today = new Date();
        const birthday = new Date(dateString);
        
        birthday.setFullYear(today.getFullYear());
        if (birthday < today) {
            birthday.setFullYear(today.getFullYear() + 1);
        }
        
        const diffTime = birthday - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    function formatResult(days) {
        const wordForms = ['день', 'дня', 'дней'];
        const cases = [2, 0, 1, 1, 1, 2];
        const index = (days % 100 > 4 && days % 100 < 20) ? 2 : cases[Math.min(days % 10, 5)];
        
        return `До вашего дня рождения осталось ${days} ${wordForms[index]}!`;
    }

    function showError() {
        elements.error.style.display = 'block';
        elements.result.textContent = '';
    }

    function hideError() {
        elements.error.style.display = 'none';
    }
});