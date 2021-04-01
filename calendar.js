// рік
// місяць
// дні тижня
// кількість днів у місяці
// контейнер div calendar

class Calendar {
    constructor (parentElement, date=new Date()) {
        this.visible = {
            month: date.getMonth(),
            year: date.getFullYear(),
        }
        this.date = date
        this.data = this.calc()
        this.element = this.render()
        this.listen()
        parentElement.append(this.element)
    }
    render() {
        const calendar = this.element || document.createElement('div')
        const months = [
            'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
            'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
        ]
        calendar.classList.add('calendar')
        calendar.innerHTML = /*html*/`
        <div class="month">
            <h3>${this.data.month + 1}</h3>
            <div class="date">
                <div class="year">
                    <button class="left">&lt;</button>
                    <h4>${this.data.year}</h4>
                    <button class="right">&gt;</button>
                </div>
                <div class="title">
                    <button class="left">&lt;</button>
                    <h4>${months[this.data.month]}</h4>
                    <button class="right">&gt;</button>
                </div>
            </div>
        </div>
        <div class="dayNames">
            <ul>
                <li class="li">пн</li>
                <li class="li">вт</li>
                <li class="li">ср</li>
                <li class="li">чт</li>
                <li class="li">пт</li>
                <li class="li">сб</li>
                <li class="li">нд</li>
            </ul>
        </div>
        <div class="listNumOfDays">
            <ul>
                ${'<li></li>'.repeat((this.data.days[0].weekDay + 6) % 7)}
                ${this.data.days.reduce((html, day) => html + `
                    <li ${day.active ? "class='active'" : ''}>
                        ${day.date}
                    </li>
                `,'')}
            </ul>
        </div>
        `
        return calendar
    }
    calc() {
        // получаю структуру данных для передачи у отрисовку
        /**
         * получаю год из обьекта дейт
         * получаю месяц
         * создаю вспомогательный обьект даты и устанавливаю его на первое число
         * запускаю цикл на каждой итерации которого создаю обьект дня и добавляю его  в масив дейс
         * каждый обьект дня получает номер дня недели число месяца и если нужно метку эктив
         * цикл останавливается перед началом первого числа следующего месяца 
         */
        const data = {}
        data.year = this.visible.year
        data.month = this.visible.month
        data.days = []
        const nextDate = new Date(data.year, data.month, 1)
        for (let i = 1; i <= 31; i++) {
            nextDate.setDate(i)
            const dayObj = {
                weekDay: nextDate.getDay(),
                date: nextDate.getDate(),
                //active: this.date.getDate() === nextDate.getDate() //?? false
            }
            if (i > 1 && dayObj.date === 1) break  // предусматриваем меньшее количство дней в месяце ( меньше31)
            data.days.push(dayObj)
        }
        if (this.date.getFullYear() == data.year && this.date.getMonth() == data.month) {
            data.days.find(day => day.date === this.date.getDate()).active = true
        }
        return data
    }
    step(monthNum) {
        const stepM = this.visible.month + monthNum
        const stepY = Math.floor(stepM/12)
        this.visible.year = this.visible.year + stepY
        this.visible.month = stepM - stepY*12
        this.data = this.calc()
        this.render()
        this.listen()
    }
    listen() {
        this.element.querySelector('.year>.left').addEventListener('click', () => {
            this.step(-12)
        })
        this.element.querySelector('.year>.right').addEventListener('click', () => {
            this.step(12)
        })
        this.element.querySelector('.title>.left').addEventListener('click', () => {
            this.step(-1)
        })
        this.element.querySelector('.title>.right').addEventListener('click', () => {
            this.step(1)
        })
    }
}
export { Calendar }