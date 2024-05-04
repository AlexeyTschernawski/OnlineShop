const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');
        const modalDescription = document.getElementById('modal-description');
        const closeBtn = document.getElementsByClassName('close')[0];
        const imageContainer = document.getElementById('imageContainer');
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');
        const pageCounter = document.getElementById('pageCounter');
        const prevPageBtnBottom = document.getElementById('prevPageBtnBottom');
        const nextPageBtnBottom = document.getElementById('nextPageBtnBottom');
        const pageCounterBottom = document.getElementById('pageCounterBottom');


        const itemsPerPage = 8;
        let currentPage = 0;

        // Переменная для хранения данных из файла JSON
let imageData;

// Загрузка данных из файла JSON
fetch('/backend/myjsonfile.json')
    .then(response => response.json())
    .then(data => {
        // Сохранение данных для дальнейшего использования
        imageData = data;
        // Вызов функции для отображения изображений на первой странице
        displayImages(currentPage);
        // Обновление кнопок пагинации
        updatePaginationButtons();
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));

        //Функция изображений для текущей страницы
        function displayImages(page) {
            imageContainer.innerHTML = '';
        
            const startIndex = page * itemsPerPage;
            const endIndex = (page + 1) * itemsPerPage;
        
            for (let i = startIndex; i < endIndex && i < imageData.length; i++) {
                const data = imageData[i];
                const item = document.createElement('div');
                item.classList.add('item');
        
                item.innerHTML = `
                    <img src="${data.img}" alt="Товар ${i + 1}">
                    <div class="nametext">
                        <div class="nametext1">${data.name}</div>
                        <div class="nametext2"></div>
                        <div class="nametext3">${data.dimensions}</div>
                    </div>
                    <div class="description">
                        <p>${data.description}</p>
                    </div>
                `;
        
                item.addEventListener('click', () => {
                    modal.style.display = 'block';
                    modalImg.src = data.img;
                    modalDescription.textContent = data.description;
                });

                imageContainer.appendChild(item);
            }
        }


        // Функция для обновления кнопок пагинации
        function updatePaginationButtons() {
            prevPageBtn.disabled = currentPage === 0;
            nextPageBtn.disabled = (currentPage + 1) * itemsPerPage >= imageData.length;

            // Отображение всех номеров страниц в виде ссылок
            const totalPages = Math.ceil(imageData.length / itemsPerPage);
            pageCounter.innerHTML = Array.from({ length: totalPages }, (_, i) => {
                if (i === currentPage) {
                    return `<span class="current-page">${i + 1}</span>`;
                } else {
                    return `<a href="#" onclick="changePage(${i})">${i + 1}</a>`;
                }
            }).join(', ');

            // Нижняя навигация
            prevPageBtnBottom.disabled = currentPage === 0;
            nextPageBtnBottom.disabled = (currentPage + 1) * itemsPerPage >= imageData.length;
            pageCounterBottom.innerHTML = Array.from({ length: totalPages }, (_, i) => {
                if (i === currentPage) {
                    return `<span class="current-page">${i + 1}</span>`;
                } else {
                    return `<a href="#" onclick="changePage(${i})">${i + 1}</a>`;
                }
            }).join(', ');
        }

        // Функция для изменения страницы
        function changePage(page) {
            currentPage = page;
            displayImages(currentPage);
            updatePaginationButtons();
        }

        // Обработчики событий для кнопок пагинации
        prevPageBtn.addEventListener('click', () => {
            currentPage--;
            displayImages(currentPage);
            updatePaginationButtons();
        });

        nextPageBtn.addEventListener('click', () => {
            currentPage++;
            displayImages(currentPage);
            updatePaginationButtons();
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });

        // Показать изображения для первой страницы при загрузке
        displayImages(currentPage);
        // Обновить кнопки пагинации при загрузке
        updatePaginationButtons();