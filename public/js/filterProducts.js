window.addEventListener('load', () => {
    let formFilter = document.getElementById('form-filter');
    let inputs = formFilter.querySelectorAll('input');
    let btnReset = document.getElementById('btn-reset');

    btnReset.addEventListener('click', (e) => {
        e.preventDefault()
        inputs.forEach(input => {
            input.checked = false;
        });
        formFilter.submit();
    });
});