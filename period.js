function calculate() {
    var lastPeriod = new Date(document.getElementById("last-period").value);
    var cycleLength = parseInt(document.getElementById("cycle-length").value);
    var periodLength = parseInt(document.getElementById("period-length").value);

    var nextPeriod = new Date(lastPeriod.getTime() + (cycleLength * 86400000));
    var ovulation = new Date(nextPeriod.getTime() - ((cycleLength - periodLength) / 2 * 86400000));

    var results = document.getElementById("results");
    results.innerHTML = "<p>Next Period: " + nextPeriod.toLocaleDateString() + "</p><p>Ovulation: " + ovulation.toLocaleDateString() + "</p>";
}
