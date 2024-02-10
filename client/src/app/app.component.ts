import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'coded-root',
    standalone: true,
    imports: [RouterOutlet, ToastModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'coded-school';

    constructor(private ngPrimeConfig: PrimeNGConfig) {}

    ngOnInit(): void {
        this.ngPrimeConfig.setTranslation({
            dayNames: [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
            ],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNames: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ],
            monthNamesShort: [
                'Янв',
                'Фев',
                'Мар',
                'Апр',
                'Май',
                'Июнь',
                'Июль',
                'Авг',
                'Сен',
                'Окт',
                'Ноя',
                'Дек',
            ],
            today: 'Сегодня',
            weekHeader: 'Нед',
            firstDayOfWeek: 1,
        });
    }
}
