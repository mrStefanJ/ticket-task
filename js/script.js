document.addEventListener("DOMContentLoaded", function () {
    function PrintNumber() {
        let a = 1;
        const wrapper = document.querySelector('.feat-ticket__number-wrapper');
        for (a; a <= 30; a++) {
            const div = document.createElement('div');
            div.innerHTML = a;
            div.className = 'feat-nmb';
            const outerDiv = document.createElement('div');
            outerDiv.className = 'feat-nmb__wrapper';
            outerDiv.append(div);
            outerDiv.addEventListener("click", (e) => myClick(e));
            wrapper.append(outerDiv);
        }
    }

    function myClick(e) {
        let selectedEl = document.querySelector(".feat-nmb__wrapper");
        if (selectedNumbers.length > 4) {
            return;
        }
        selectedNumbers.push(e.currentTarget.textContent)
        if (selectedEl > 4) {
            selectedEl.classList.remove("feat-nmb__wrapper--selected");
        }
        e.target.classList.add("feat-nmb__wrapper--selected");
    }

    function populateTicket() {
        if (selectedNumbers.length === 0) {
            return;
        }
 
        ticketNumbers.push(selectedNumbers)
        const tickets = document.querySelector('.feat-ticket__wrapper').children;
        const latestTicket = ticketNumbers[ticketNumbers.length - 1];
        latestTicket.forEach((number) => {
            const div = document.createElement('div');
            div.innerHTML = number;
            div.className = 'feat-ticket__selected-nmb';
            tickets[ticketNumbers.length - 1].append(div);
        })
        payment += latestTicket.length * 50;
        const wrapper = document.querySelector('.feat-ticket__number-wrapper').children;

        for (let child of wrapper) {
            child.firstChild.classList.remove("feat-nmb__wrapper--selected")
        }

        selectedNumbers = [];

        if (ticketNumbers.length === 5) {
            document.querySelector(".feat-ticket__btn").classList.add('feat-ticket__btn--submit');
            document.querySelector(".feat-ticket__btn").classList.remove('feat-ticket__btn');
            document.querySelector(".feat-ticket__btn--submit").innerHTML = 'ODIGRAJ';
            document.querySelector(".feat-ticket__btn--submit").addEventListener('click', () => renderRandomNumbers());
        }
    }

    function renderRandomNumbers() {
        const interval = setInterval(() => {
            let renderedNumber = Math.floor(Math.random() * 30) + 1;
            // Make sure the unique numbers are getting displayed
            if (renderNumberList.indexOf(renderedNumber) !== -1) { return; }

            renderNumberList.push(renderedNumber);
            const div = document.createElement('div');
            div.innerHTML = renderedNumber;
            div.className = 'feat-nmb';
            document.querySelector('.feat-drawn-numbers__wrapper').append(div);

            if (renderNumberList.length == 12) {
                clearInterval(interval);
                checkTickets();
            }
        }, 2000);
    }

    function checkTickets() {
        const tickets = document.querySelector('.feat-ticket__wrapper').children;
        for (ticket in ticketNumbers) {
            let confirmedNumbers = 0;
            for (number in ticketNumbers[ticket]) {
                const selectedNumber = Number(ticketNumbers[ticket][number]);
                if (renderNumberList.indexOf(selectedNumber) !== -1) {
                    confirmedNumbers = confirmedNumbers + 1;
                }
            }

            if (tickets[ticket] &&
                confirmedNumbers === ticketNumbers[ticket].length) {
                tickets[ticket].classList.add('feat-ticket--win');
                payoff += quota * ticketNumbers[ticket].length;
            } else {
                tickets[ticket].classList.add('feat-ticket--lose')
            }
        }

        document.querySelector('.feat-payment').innerHTML = payment;
        document.querySelector('.feat-payoff').innerHTML = payoff;
        document.querySelector('.feat-payments').style.display= 'block';
        
        setTimeout(() => {
            location.reload();
        }, 30000);
    }

    let selectedNumbers = [];
    const ticketNumbers = [];
    const renderNumberList = [];
    const quota = 100;
    let payment = 0;
    let payoff = 0
    PrintNumber();
    document.querySelector(".feat-ticket__btn").addEventListener("click", () => populateTicket());
});