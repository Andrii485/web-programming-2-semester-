
const API_URL = "http://nginx/php/subscribers"; 

async function test() {
    console.log("--- Тестування підключення до API через проксі ---");
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            const data = await response.json();
            console.log("Успіх! Отримано даних:", data.data.length);
        } else {
            console.log("Помилка API. Код:", response.status); 
        }
    } catch (e) {
        console.log("Помилка мережі:", e.message);
    }
}
test();
setInterval(() => {}, 1000); 