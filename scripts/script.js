
'use strict'

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Исключение накладывания контента на хедер при скроле/прокрутке страницы */

    const header = document.querySelector('.header');       // создаем переменную находя блок по классу

    if (header) {                                           // проверяем существование элемента в DOM
        console.log('Константа header существует');

        /* 
        *   Алгоритм
        *
        *   1. Начало.
        *   2. Получаем высоту блока/элемента (создание переменной, которая не будет меняться).
        *   3. Проверка условия (навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку): если страница прокручивается.
        *       3.1. Да: Получаем значение насколько прокрутили страницу (создание переменной, которая будет меняться).
        *           3.1.1 Проверка условия (сравниваем высоту элемента и значение прокрученной страницы): если расстояние от верха страницы больше высоты элемента
        *               3.1.1.1. Да: устанавливаем класс модификатора на элемент
        *               3.1.1.2. Нет (если расстояние от верха экрана меньше высоты элемента): удаляем класс модификатора у элемента
        *       3.2. Нет: Конец
        *   4. Конец
        * 
        *   Блок-схема: /images/block-schema2.png
        */

        const heightHeader = header.offsetHeight;           // определяем высоту блока, включая внутренние отступы

        document.addEventListener('scroll', () => {         // навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку

            console.log('Страница скролится');

            let scrollPageY = this.scrollY;                 // получаем значение насколько прокрутили страницу

            if (scrollPageY > heightHeader) {               // условие: если расстояние от верха страницы больше высоты элемента
                header.classList.add('header--scroll')      // устанавливаем класс модификатора на элемент
            } else {
                header.classList.remove('header--scroll')   // удаляем класс модификатора у элемента
            }

        })

    }
});

// Объявляем переменную-массив intensiveImg и сохраняем в нее все элементы на странице с классом intensive__img  
const cardImg = document.querySelectorAll('.card__icon');

// Пройдемся по каждому элементу массива intensiveImg, с помощью цикла forEach.  Внутри функции 2 переменные: 
// item - текущее изображение, а index — его номер в массиве, начиная с 0
cardImg.forEach((item, index) => {

    // Объявляем переменную intensiveText и сохраняем в нее все элементы с классом intensive__description, которые связаны с описаниями для изображений
    const cardText = document.querySelectorAll('.card__description');

    // Когда курсор наводится на изображение (событие mouseenter), срабатывает обработчик события mouseenter:
    item.addEventListener('mouseenter', () => {
        // Делаем изображение полупрозрачным
        item.style.opacity = 0.5;
        // И удаляем атрибут hidden и текст становится видимым
        cardText[index].removeAttribute('hidden');
    });

    // Когда курсор убираем с изображения (событие mouseleave), срабатывает обработчик события mouseleave:
    item.addEventListener('mouseleave', () => {
        // Изображение делаем непрозрачным
        item.style.opacity = 1;
        // И добавляем атрибут hidden и текст становится видимым
        cardText[index].setAttribute('hidden', true);
    });
});


// Дополнительные скрипты
// Scroll up
// Обратите внимание, что в коде выше уже есть слушатель скролла (на следующей практике уберем повторение)

const scrollUpButton = document.querySelector('.scroll-up');

if (scrollUpButton) {
    const windowHeight = document.documentElement.clientHeight; // Определяем высоту видимой части окна браузера
    console.log("кнопка вверх найдена")
    // Показать кнопку при прокрутке вниз на высоту экрана
    document.addEventListener('scroll', () => {
        let scrollPageY = this.scrollY;
        console.log("скролим")
        console.log(scrollPageY)
        console.log(windowHeight)
        if (scrollPageY >= windowHeight / 4) {
            scrollUpButton.classList.add('scroll-up--show');
        } else {
            scrollUpButton.classList.remove('scroll-up--show');
        }
    });

    // Плавная прокрутка наверх при нажатии на кнопку
    scrollUpButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

}

//Этот код используется в 3.5. Мы его закомментировали, потому что в 3.6 этот код дублируется.//
//Объявляем переменную headerMenu и сохраняем в нее header__menu
const headerMenu = document.querySelector('.header__menu');
// Если такой элемент существует
/* if (headerMenu) {
    //Объявляем переменную headerList и сохраняем в нее header__list, чтобы мы могли добавить новые элементы
    const headerList = headerMenu.querySelector('.header__list');

    //Создаем объект menuData, который содержит данные для трех ссылок меню.
    const menuData = {
        // Каждая ссылка содержит link (адрес ссылки; если ссылка никуда не ведет, то можно оставить #) и title (текст ссылки).
        link1: {
            link: 'account.html',
            title: 'Аккаунт',
        },
        link2: {
            link: 'information.html',
            title: 'Информация',
        },
        link3: {
            link: 'balance_sheet.html',
            title: 'Бух. баланс',
        },
        link4: {
            link: 'vertical_analysis.html',
            title: 'Верт.анализ',
        },
        link5: {
            link: 'horizontal_analysis.html',
            title: 'Гор.анализ',
        }
    }

    //Создаем функцию createLink, которая будет добавлять ссылку в меню. Внутри функции 2 переменные: UrlLink – адрес, а title — текст ссылки.
    const createLink = (UrlLink, title) => {
        // создаем переменную  link, которая будет содержать HTML-код ссылки и вставляем в него 2 переменные
        const link = `
            <li class="header__item"><a href="${UrlLink}" class="header__item-link">${title}</a></li>
            `;
        return link;
    }

    // Создаем цикл for и проходим по всем элементам объекта menuData.
    for (const linkItem in menuData) {
        //Получаем данные для ссылки и сохраняем в переменную link.
        const link = menuData[linkItem];
        //Создаем переменную linkIndex и вызываем функцию createLink, куда передаем адрес и заголовок.
        const linkIndex = createLink(link.link, link.title);
        console.log(linkItem);
        // С помощью метода insertAdjacentHTML добавляем созданный HTML-код в конец списка headerList.
        headerList.insertAdjacentHTML('beforeend', linkIndex);

    }
}
    */
// Preloader страницы
const preloader = document.querySelector('.preloader');
const content = document.querySelectorAll('.loader__content');
if (preloader && content) {
    setTimeout(() => {
        // Скрываем прелоадер
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';

        // Показываем контент
        for (let i = 0; i < content.length; i++)
            content[i].style.opacity = '1';

        // Удаляем элемент из DOM
        preloader.remove();
    }, 500); // Задержка 3 секунды
}

/* Лекция 6 */
if (headerMenu) {
    const linkList = headerMenu.querySelector('.header__list');

    // Пример URL для получения данных с сервера
    const apiUrl = 'data.json';

    // Функция для создания карточки
    const createLink = (linkUrl, title) => {

        // Шаблонные строки и подстановки
        const link = `
                <li class="header__item"><a href="${linkUrl}" class="header__item-link">${title}</a></li>
             `;

        return link;
    }

// Загрузка данных с сервера
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Данные
        console.log(typeof (data)); // Тип полученных данных

        
        data.forEach(item => {
            const linkElement = createLink(item.link, item.title);
            linkList.insertAdjacentHTML('beforeend', linkElement);
        });
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
    });
}

// Карусель (слайдер)
const slider = document.querySelector('.swiper');

if (slider) {
    const swiper = new Swiper(slider, {
        // Дополнительные параметры
        slidesPerView: 3, // Количество слайдов на экране
        spaceBetween: 30, // Расстояние между слайдами
        loop: true,  // Зацикливание слайдов

        // Пагинация
        pagination: {
            el: '.swiper-pagination',
        },

        // Навигационные стрелки
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    
}
const registrationPopup = document.querySelector('#popup-registration');
registrationPopup.addEventListener('submit', event => {
    event.preventDefault(); // Предотвращаем отправку формы

    const username = registrationPopup.querySelector('#username').value;
    const login = registrationPopup.querySelector('#login').value;
    const password = registrationPopup.querySelector('#password').value;
    const confirmPassword = registrationPopup.querySelector('#confirm-password').value;

    const errorMessage = registrationPopup.querySelector('#error-message');

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Пароли не совпадают';
        errorMessage.style.color = 'red';
        return;
    }

    if (username.length < 3) {
        errorMessage.textContent = 'Имя пользователя должно содержать не менее 3 символов';
        return;
    }

    if (password.length < 8) {
        errorMessage.textContent = 'Пароль должен содержать не менее 8 символов';
        return;
    }

    // Здесь можно добавить отправку данных на сервер
    errorMessage.textContent = 'Регистрация прошла успешно!';
    errorMessage.style.color = 'green';

    // Запишем логин
    window.localStorage.setItem("login", login);

    // Очистка формы
    document.getElementById('registration-form').reset();
});

