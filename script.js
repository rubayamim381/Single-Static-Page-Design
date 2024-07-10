$(document).ready(function () {

    // ----------------------------plus minus add in side navbar------------------------------------ //
    if ($('.chart-section-index')[0].hasAttribute('data-twe-nav-active')) {
        $(".active.plusminus").text('-');
        $(".active.plusminus").closest('.chart-section-index').addClass('nav-item-shadow-active');
    }

    $(".chart-section-index").click(function () {
        $(".plusminus").text('+');
        $(".chart-section-index").removeClass('nav-item-shadow-active');

        if ($(this)[0].hasAttribute('data-twe-nav-active')) {
            $(this).children(".plusminus").text('-');
            $(this).addClass('nav-item-shadow-active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // collecting shiblings of elements
    // helping functoion
    let getSiblings = function (e) {

        let siblings = [];
        if (!e.parentNode) {
            return siblings;
        }

        let sibling = e.parentNode.firstChild;

        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    };


    //--------------------sticky content after scrolling from top and togglebutton---------------------------------------//
    let topToggleButton = document.querySelector('.top-nav-toogle');
    let top_right_side_nav = document.querySelector('.top-right-side-navbar');

    let isToggled = false;

    topToggleButton.addEventListener('click', function () {

        isToggled = !isToggled;
        this.classList.toggle('active');
        let navBtns = getSiblings(this);

        if (isToggled) {
            this.firstElementChild.src = './images/cross.svg'

            navBtns[0].classList.remove("bg-transparent", "border-white", "hover:text-black", "hover:bg-white", "focus:text-black", "focus:bg-white");
            navBtns[0].classList.add("bg-lime-500", "border-lime-500", "focus:bg-lime-500");

            navBtns[1].classList.remove("bg-transparent", "border-white", "hover:text-black", "hover:bg-white", "focus:text-black", "focus:bg-white");
            navBtns[1].classList.add("nav-bg-blue");

        }
        else {
            this.firstElementChild.src = './images/menu-bar-white.svg'

            navBtns[0].classList.remove("bg-lime-500", "border-lime-500", "focus:bg-lime-500");
            navBtns[0].classList.add("bg-transparent", "border-white", "hover:text-black", "hover:bg-white", "focus:text-black", "focus:bg-white");

            navBtns[1].classList.remove("nav-bg-blue");
            navBtns[1].classList.add("bg-transparent", "border-white", "hover:text-black", "hover:bg-white", "focus:text-black", "focus:bg-white");
        }

        top_right_side_nav.classList.toggle('remove');

    });

    let midToggleButton = document.querySelector('.mid-nav-toogle');
    let mid_right_side_nav = document.querySelector('.mid-right-side-navbar');

    let isToggled2 = false;


    midToggleButton.addEventListener('click', function () {

        isToggled2 = !isToggled2;
        this.classList.toggle('active');
        let navBtns = getSiblings(this);

        if (isToggled2) {
            this.firstElementChild.src = './images/cross.svg'

            navBtns[0].classList.remove("text-lime-500");
            navBtns[0].classList.add("bg-lime-500", "text-white");

            navBtns[1].classList.remove("text-black");
            navBtns[1].classList.add("text-white", "nav-bg-blue");

        }
        else {
            this.firstElementChild.src = './images/menu-black.svg'

            navBtns[0].classList.add("text-lime-500");
            navBtns[0].classList.remove("bg-lime-500", "text-white");

            navBtns[1].classList.add("text-black");
            navBtns[1].classList.remove("text-white", "nav-bg-blue");
        }

        mid_right_side_nav.classList.toggle('remove');

    });

    let midNavbar = document.querySelector('.mid-navbar');
    const sticky = midNavbar.offsetTop;

    window.addEventListener('scroll', function () {
        if (window.scrollY >= (sticky)) {
            midNavbar.classList.add('!fixed', 'top-0', 'left-0', 'px-5', 'mt-4');
        } else {
            midNavbar.classList.remove('!fixed', 'top-0', 'left-0', 'px-5', 'mt-4');
        }
    });

    // --------------------------- scroll button add-------------------------------------//
    const scrollButton = document.getElementById('scroll-btn');
    const rotateBtn = document.getElementById('rotate-btn');

    let track = 0;

    scrollButton.addEventListener('click', () => {
        const topPosition = 0;
        const bottomPosition = document.body.scrollHeight - window.innerHeight;

        if (window.scrollY >= topPosition && track == 0) {
            window.scrollTo({
                top: bottomPosition,
                behavior: 'smooth'
            });
        }

        if (window.scrollY <= bottomPosition && track == 1) {
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        }
    });

    window.addEventListener('scroll', () => {
        const bottomPosition = document.body.scrollHeight - window.innerHeight;
        if (window.scrollY == 0) {
            track = 0;
            rotateBtn.classList.remove('rotate1');
            rotateBtn.classList.add('rotate2');
        }
        else if (window.scrollY == bottomPosition) {
            track = 1;
            rotateBtn.classList.remove('rotate2');
            rotateBtn.classList.add('rotate1');
        }

        if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
            scrollButton.classList.remove("hidden");
        } else {
            scrollButton.classList.add("hidden");
        }
    });
});

//---------------------------chart js-------------------------------------//
// create dummy data

function generateWeightedRandom() {
    const random = Math.random();
    if (random < 0.98) { // 80% chance
        return Math.floor(Math.random() * 60) + 1; // 1 to 50
    } else {
        return Math.floor(Math.random() * 40) + 60; // 51 to 100
    }
}

function generateDailyData() {
    const data = [];
    const startDate = new Date('2024-1-1');
    const endDate = new Date('2024-6-31');

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const date = new Date(d).toISOString().split('T')[0];
        const value = generateWeightedRandom();
        data.push({ x: date, y: value });
    }
    return data;
}

// Generate data for each company
const seriesData = [
    { name: 'WPPOOL', data: generateDailyData(), color: '#fb923c' },
    { name: 'Google', data: generateDailyData(), color: '#6366f1' },
    { name: 'Microsoft', data: generateDailyData(), color: '#84cc16' },
    { name: 'Twitter', data: generateDailyData(), color: '#86198f' },

];

// Create the ApexCharts chart
var options = {
    chart: {
        type: 'line',
        height: 450,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        },
        events: {
            dataPointMouseEnter: function (event) {
                console.log('hi');
                console.log(event.path[0]);
                event.path[0].style.cursor = "pointer";
            }
        }
    },
    series: seriesData,
    xaxis: {
        type: 'datetime',
        tickPlacement: 'on',
        labels: {
            format: 'MMM',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
            }
        },
    },
    yaxis: {
        stepSize: 10,
        labels: {
            style: {
                fontSize: '14px',
            },
            formatter: val => `${val}%`
        },

    },
    legend: {
        fontSize: '16px',
        markers: {
            shape: 'square',
            fillColors: ['#fb923c', '#6366f1', '#84cc16', '#86198f'],
        },
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        padding: {
            top: 10,
            right: 20,
            bottom: 20,
            left: 20
        },
    },
    stroke: {
        curve: 'straight',
        width: 2
    },
    tooltip: {
        followCursor: true,
        x: {
            format: 'dd MMM yyyy'
        },
    },
    responsive: [
        {
            breakpoint: 1000,
            options: {
                grid: {
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 10
                    },
                },
            }
        }
    ]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();


//----------------------------NOT important: create a random information for table from GPT---------------------------------//

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateDummyData(count) {
    const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'China'];
    const tickers = ['AAPLE', 'MSFT', 'GOOGLE', 'AMAZON', 'TESLA', 'FB', 'NETFLIX'];
    const verticals = ['Tech', 'Healthcare', 'Finance', 'Retail', 'Energy', 'Industrial'];

    const data = [];

    for (let i = 0; i < count; i++) {
        data.push({
            country: getRandomItem(countries),
            ticker: getRandomItem(tickers),
            vertical: getRandomItem(verticals),
            price: getRandomFloat(10, 1500, 2),
            marketCap: getRandomFloat(1, 500, 2),
            revenueGrowth: getRandomFloat(-10, 50, 2) + '%',
            grossMargin: getRandomFloat(10, 90, 2) + '%',
            evRevenue: getRandomFloat(0.5, 30, 2),
            ytdPerformance: getRandomFloat(-50, 100, 2) + '%'
        });
    }

    return data;
}

function renderTable(data) {
    const tableBody = document.querySelector('#table-body');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Iterate over each object in data array
    data.forEach(item => {
        // Create a new row
        const row = document.createElement('tr');

        // Add cells (columns) to the row
        row.innerHTML = `
        <td>${item.country}</td>
        <td>${item.ticker}</td>
        <td>${item.vertical}</td>
        <td>${item.price}</td>
        <td>${item.marketCap}</td>
        <td>${item.revenueGrowth}</td>
        <td>${item.grossMargin}</td>
        <td>${item.evRevenue}</td>
        <td>${item.ytdPerformance}</td>
      `;

        // Append row to the table body
        tableBody.appendChild(row);
    });
}

// Generate 100 random dummy entries
const dummyData = generateDummyData(100);

// Render the dummy data in the table
renderTable(dummyData);

