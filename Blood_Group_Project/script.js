let chart;
let pieChart;

function addData(){

    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let blood = document.getElementById("blood").value;
    let hb = document.getElementById("hb").value;

    if(name === "" || hb === ""){
        alert("Please fill all details");
        return;
    }

    let status = "";

    if(hb < 12){
        status = "Low";
    }
    else{
        status = "Normal";
    }

    let tableBody = document.getElementById("tableBody");

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${gender}</td>
        <td>${blood}</td>
        <td>${hb}</td>
        <td>${status}</td>
        <td>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);

    updateChart();

    calculateAverageHb();

    document.getElementById("totalStudents").innerText =
    "Total Students: " + document.querySelectorAll("#tableBody tr").length;

    document.getElementById("name").value = "";
    document.getElementById("hb").value = "";
    localStorage.setItem(
    "tableData",
    document.getElementById("tableBody").innerHTML
);
}

function deleteRow(button){

    button.parentElement.parentElement.remove();

    updateChart();

    calculateAverageHb();

    document.getElementById("totalStudents").innerText =
    "Total Students: " + document.querySelectorAll("#tableBody tr").length;
}

function calculateAverageHb(){

    let rows = document.querySelectorAll("#tableBody tr");

    if(rows.length === 0){

        document.getElementById("averageHb").innerText =
        "Average Hb: 0";

        return;
    }

    let total = 0;

    rows.forEach((row)=>{

        total += Number(row.cells[3].innerText);

    });

    let avg = total / rows.length;

    document.getElementById("averageHb").innerText =
    "Average Hb: " + avg.toFixed(1);
}

function searchData(){

    let input = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach((row)=>{

        let name = row.cells[0].innerText.toLowerCase();

        if(name.includes(input)){
            row.style.display = "";
        }
        else{
            row.style.display = "none";
        }

    });

}

function updateChart(){

    let rows = document.querySelectorAll("#tableBody tr");

    let countA = 0;
    let countB = 0;
    let countO = 0;
    let countAB = 0;

    rows.forEach((row)=>{

        let blood = row.cells[2].innerText;

        if(blood === "A+" || blood === "A-"){
            countA++;
        }
        else if(blood === "B+" || blood === "B-"){
            countB++;
        }
        else if(blood === "O+" || blood === "O-"){
            countO++;
        }
        else{
            countAB++;
        }

    });

    let ctx = document.getElementById("myChart");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: 'bar',

        data: {

            labels: ['A', 'B', 'O', 'AB'],

            datasets: [{

                label: 'Blood Group Count',

                data: [countA, countB, countO, countAB]

            }]
        }

    });

    let pie = document.getElementById("pieChart");

    if(pieChart){
        pieChart.destroy();
    }

    pieChart = new Chart(pie, {

        type: 'pie',

        data: {

            labels: ['A', 'B', 'O', 'AB'],

            datasets: [{

                data: [countA, countB, countO, countAB]

            }]
        }

    });

}

window.onload = function(){

    let savedData = localStorage.getItem("tableData");

    if(savedData){

        document.getElementById("tableBody").innerHTML = savedData;

        updateChart();

        calculateAverageHb();

        document.getElementById("totalStudents").innerText =
        "Total Students: " + document.querySelectorAll("#tableBody tr").length;
    }

}