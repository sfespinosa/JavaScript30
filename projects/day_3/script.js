const inputs = document.querySelectorAll('.controls input'); // collects the sliders

function handleUpdate() {
    const suffix = this.dataset.sizing || ''; // will use px whenever needed
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix) // sets the styling
}

inputs.forEach(input => input.addEventListener('change', handleUpdate)); // will confirm the change
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate)); // will cause the slider effect