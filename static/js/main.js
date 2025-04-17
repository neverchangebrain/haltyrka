function submitCipher() {
    const text = document.getElementById('text').value;
    const method = document.getElementById('method').value;
    const param = document.getElementById('param').value;
    const decrypt = document.getElementById('decrypt').checked;

    fetch('/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, method, param, decrypt })
    })
    .then(res => res.json())
    .then(data => {
        const resultBox = document.getElementById('result');
        if (data.error) {
            resultBox.textContent = "Ошибка: " + data.error;
            resultBox.classList.add("text-red-400");
        } else {
            resultBox.textContent = data.result;
            resultBox.classList.remove("text-red-400");
        }
    });
}
