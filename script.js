document.addEventListener("DOMContentLoaded", () => {

    animate("bugs", 10, "", "+");
    animate("bounty", 1000, "$", "+");
    animate("cve", 1);
    animate("companies", 10, "", "+");

});

function animate(id, target, prefix = "", suffix = "") {

    const el = document.getElementById(id);

    let current = 0;

    const timer = setInterval(() => {

        current++;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        el.textContent = `${prefix}${current}${suffix}`;

    }, 25);

}