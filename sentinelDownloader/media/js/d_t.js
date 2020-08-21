$(document).ready(function() {
   // $('#table_id').dataTable();
} );

function fillingDataTable(){

}
let str;
let dataTb= document.createElement('tr');
let table = document.getElementById('date');
let arr=[1,2,3,4,5,6,7,8,9];
for (item of arr){
    let dataTb= document.createElement('tr');
    str = `Row${item}`;
dataTb.innerHTML = `

                <td>${str} Data 1</td>
                <td>${str} Data 2</td>
                <td>etc</td>
           `;
//table.appendChild(dataTb);
}