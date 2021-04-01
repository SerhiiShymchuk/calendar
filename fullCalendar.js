import { Calendar } from './calendar.js'
class FullCalendar {
    constructor(parentElement, date=new Date()) {
        this.date = date
        this.element = this.render()
        parentElement.append(this.element)
        this.listen()
    }
    
    render() {
        const calendars = []
        this.calendars = calendars
        const div = document.createElement('div')
        div.classList.add('fullCalendar')
        for (let i = 0; i < 12; i++) {
            calendars.push(new Calendar(div, this.date))
            calendars[i].step(i - this.date.getMonth())
        }
        const delElements = div.querySelectorAll('button, .year')
        delElements.forEach(el => el.remove())
        const divYear = document.createElement('div')
        divYear.innerHTML = `
            <button class="left">&lt;</button>
            <h2>${this.date.getFullYear()}</h2>
            <button class="right">&gt;</button>
        `
        div.prepend(divYear)
        return div
    }

    listen() {
        this.element.querySelector('.left').addEventListener('click', () => {
            this.calendars.forEach(calendar => {
                calendar.step(-12)
            })
        })
        this.element.querySelector('.right').addEventListener('click', () => {
            this.calendars.forEach(calendar => {
                calendar.step(12)
            })
        })
    }
}
export { FullCalendar }