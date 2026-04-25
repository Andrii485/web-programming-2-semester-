
const BASE_URL = "http://localhost/php";
let currentPage = 1;



async function fetchSubscribers(page = 1) {
    try {

        const response = await fetch(`${BASE_URL}/subscribers?page=${page}&per_page=5`);

        if (!response.ok) {
            // Якщо сервер повернув 500, ми виведемо текст помилки
            const errorText = await response.text();
            console.error("Сервер повернув помилку:", errorText);
            throw new Error(`Помилка сервера: ${response.status}`);
        }

        const result = await response.json();
        renderTable(result.data);
        renderPagination(result.meta, result.links);
    } catch (error) {
        console.error("Помилка отримання даних:", error);
        document.getElementById('subscribers-list').innerHTML =
            `<tr><td colspan="4" class="text-center text-red-500 py-10">Не вдалося завантажити дані. Перевірте консоль (F12)</td></tr>`;
    }
}

function renderTable(subscribers) {
    const list = document.getElementById('subscribers-list');
    list.innerHTML = "";

    subscribers.forEach(sub => {
        list.innerHTML += `
            <tr class="hover:bg-gray-50">
                <td class="px-5 py-4 border-b text-sm font-medium text-gray-900">${sub.name}</td>
                <td class="px-5 py-4 border-b text-sm text-gray-600">${sub.email}</td>
                <td class="px-5 py-4 border-b text-sm">
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                        ${sub.subscriptions ? sub.subscriptions.length : 0} сервісів
                    </span>
                </td>
                <td class="px-5 py-4 border-b text-center text-sm">
                    <button onclick='showSubscriptions(${JSON.stringify(sub)})' class="text-indigo-600 hover:text-indigo-900 font-bold">Деталі</button>
                </td>
            </tr>
        `;
    });
}

function renderPagination(meta, links) {
    document.getElementById('page-info').innerText = `Сторінка ${meta.current_page} з ${meta.last_page}`;

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    btnPrev.disabled = !links.prev;
    btnNext.disabled = !links.next;

    btnPrev.onclick = () => fetchSubscribers(meta.current_page - 1);
    btnNext.onclick = () => fetchSubscribers(meta.current_page + 1);
}

function showSubscriptions(subscriber) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    document.getElementById('modal-title').innerText = `Підписки: ${subscriber.name}`;

    if (!subscriber.subscriptions || subscriber.subscriptions.length === 0) {
        content.innerHTML = "<p class='text-gray-500'>У цього підписника немає активних підписок.</p>";
    } else {
        content.innerHTML = subscriber.subscriptions.map(s => `
            <div class="border-l-4 border-indigo-500 pl-4 py-2 bg-gray-50 rounded">
                <div class="font-bold text-indigo-700 uppercase text-sm">${s.service}</div>
                <div class="text-sm text-gray-600">Тема: ${s.topic}</div>
                <div class="text-xs text-gray-400">Діє до: ${new Date(s.expired_at).toLocaleDateString()}</div>
            </div>
        `).join('');
    }

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Початкове завантаження
fetchSubscribers();