const form = document.getElementById('imageForm');
const fileInput = document.getElementById('imageInput');
const nameInput = document.getElementById('imageName');
const descriptionInput = document.getElementById('imageDescription');
const dimensionsInput = document.getElementById('imageDimensions');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const description = descriptionInput.value;
    const dimensions = dimensionsInput.value;
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = function () {
        const fileBase64 = reader.result;

        const imageData = {
            name: name,
            description: description,
            dimensions: dimensions,
            img: fileBase64,
        };

        

        fetch('http://127.0.0.1:3000/api/persons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(imageData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Произошла ошибка: ', response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные сохранены:', data);
            // Очистка формы после успешной отправки
            form.reset();
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    };

    reader.readAsDataURL(file);
});
