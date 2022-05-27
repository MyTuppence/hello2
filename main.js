
/*for(let i=0;i<localStorage.length;i++) {
	const key = localStorage.key(i);
	const value = localStorage.getItem(key);
  
	console.log(key);
	console.log(value)
  }   */

  /*___________________________________________________________________________________________________________________
                                                                                                                                */
 
  
  const dataEntryTable_MinColumn = 1                      // set column index constants
  const dataEntryTable_MaxColumn = 2
  const dataEntryTable_QuantityColumn = 3
  const dataEntryTable_CommentsColumn = 4


  const btnStartUpEl = document.getElementById("populateTablesGoToSelectionMenu");
  const markerStartUpCompleted = document.getElementById("startUpCompeted");
  
  
  const tableDirectDataEntry_El = document.getElementById("directDataEntryTable");
  const tableSelectionMenuEl = document.getElementById("selectionMenuTable");

  const formEl = document.getElementById("addNewRecordForm");                        
  const btnGetAdminTable = document.getElementById("getdata");

  //details table
  let directDataEntryCaseID_El = document.getElementById("directEntryTitleRequestID")
  let directDataEntryBundleID_El = document.getElementById("directEntryTitleBundleID")
 

  //admin table
  const tableAdminEl = document.getElementById("masterAdminTable");                            
  let caseIDBoxEl = document.getElementById("caseID");
  let requestBoxEl = document.getElementById("request");
  let csvBoxEl = document.getElementById("importCSV");

  //site navigation buttons
  const topOfPage_El =document.getElementById("start")
  const dataEntryHeader_El =document.getElementById("dataEntryHeader")
  const adminHeader_El =document.getElementById("adminHeader")

  const btnFromMenuGoToDataEntry_El = document.getElementById("goToData"); 
  const btnFromMenuGoToAdmin_El = document.getElementById("goToAdmin");      
  const btnFromDataGoToMenu_El = document.getElementById("dataGoToMenu")   
  const btnFromDataGoToAdmin_El = document.getElementById("dataGoToAdmin");
  const btnFromAdminGoToMenu_El = document.getElementById("adminGoToMenu");
  const btnFromAdminGoToData_El = document.getElementById("adminGoToData");

   
  btnFromMenuGoToDataEntry_El.addEventListener("click", () => {
    dataEntryHeader_El.scrollIntoView();          
  });

  btnFromMenuGoToAdmin_El.addEventListener("click", () => {
    adminHeader_El.scrollIntoView();          
  });

  btnFromDataGoToMenu_El.addEventListener("click", () => {
    topOfPage_El.scrollIntoView();          
  });

  btnFromDataGoToAdmin_El.addEventListener("click", () => {
    adminHeader_El.scrollIntoView();          
  });

  btnFromAdminGoToMenu_El.addEventListener("click", () => {
    topOfPage_El.scrollIntoView();          
  });
   
  btnFromAdminGoToData_El.addEventListener("click", () => {
    dataEntryHeader_El.scrollIntoView();          
  });
  

/*_____________________________________________________________________________________________________________________________
  FUNCTIONS TO SET ITEMS and GET ITEMS FROM LOCAL STORAGE                                                                              */
  

  //   GET TABLE
  function getTable(targetTableID, targetTableIndex) {
    console.log("here")
    console.log(targetTableIndex)
    let myStorage = window.localStorage.getItem(targetTableIndex);
	
	  let restoredArray = JSON.parse(myStorage);
	console.log(restoredArray)
	  let numStoredItems = restoredArray.length;
	
	  let numRows = targetTableID.rows.length;
	  let numCols = numStoredItems / numRows;
	  let selectedValue = -1;
	
	  for (let i = 0; i < targetTableID.rows.length; i++) {
		for (let j = 0; j < targetTableID.rows[i].cells.length; j++) {
		  selectedValue = selectedValue + 1;
	
		  targetTableID.rows[i].cells[j].innerHTML = restoredArray[selectedValue];
		}
	  }
	};
	
	
	// SET
	function setTable(targetTableID, targetTableIndex) {	
	  rowObj = []
		for (let i = 0; i < targetTableID.rows.length; i++) {
		for (let j = 0; j < targetTableID.rows[i].cells.length; j++) {
		  rowObj.push(targetTableID.rows[i].cells[j].innerHTML);
		}
	  }
	
	  window.localStorage.setItem(targetTableIndex, JSON.stringify(rowObj));
	  return rowObj;
	};
	
    
  /*____________________________________________________________________________________________________________________
    START UP                                                              populates the menu and admin tables on startup */
  
    
  window.onload = function() { 
  getTable(tableAdminEl, "casesMasterTable")                                                       //populate admin table from localstorage  
  
  for (let i = 1; i < tableAdminEl.rows.length; i++) {                                             //populate menu from admin table 
	  tableSelectionMenuEl.rows[i].cells[0].innerHTML = tableAdminEl.rows[i].cells[0].innerHTML
	  tableSelectionMenuEl.rows[i].cells[1].innerHTML = tableAdminEl.rows[i].cells[1].innerHTML
	  tableSelectionMenuEl.rows[i].cells[2].innerHTML = tableAdminEl.rows[i].cells[3].innerHTML
  }
  }
    
  /*_______________________________________________________________________________________________________________________________
    SELECT MENU                                                                                                                                      */
  
   let selectedRow = 0
   let selectedKey = ""
  
  function myFunction(e) {

   let selectedKey = ""
	selectedRow=e.rowIndex;
  
   let selectedCase = tableSelectionMenuEl.rows[selectedRow].cells[0].innerHTML
   let selectedRequest = tableSelectionMenuEl.rows[selectedRow].cells[1].innerHTML
   
   for (let i = 1; i < tableAdminEl.rows.length; i++) { 
                                                          
	  if (tableAdminEl.rows[i].cells[0].innerHTML === selectedCase && tableAdminEl.rows[i].cells[1].innerHTML === selectedRequest) {             //find case/request in Admin table
	      selectedKey = tableAdminEl.rows[i].cells[2].innerHTML                                                                             //get key
        directDataEntryCaseID_El.innerHTML =  tableAdminEl.rows[i].cells[0].innerHTML
        directDataEntryBundleID_El.innerHTML = tableAdminEl.rows[i].cells[1].innerHTML
    }
   
   }
   
   getTable(tableDirectDataEntry_El,selectedKey)
	 
   const element = document.getElementById("directDataEntryTableTitle");
        element.scrollIntoView();
	};
	
  
 
  let buttonSave_El = document.getElementById("save");
  let firstNum_El = document.getElementById("first");                                                                                 //capturing each quantity cell of the direct-entry table
  //direct data entry table already declared
   
  rowObj = [];
  
  
  /*__________________________________________________________________________________________________________________
    FUNCTIONS TO ADD THE NUMBER OF ITEMS TO THE DIRECT DATA ENTRY TABLE                                                                                */
  
                                                                                                /* Two stage procedure: 
                                                                                              	 1. click a cell in the 'n' column of the direct entry table (changes to yellow)
                                                                                              	 2. click on a number in the ajacent 'n table' the the quanity is passed to the direct entry table     */
  
  
  //STEP 1 - IDENTIFY THE TARGET DIRECT DATA ENTRY TABLE CELL
  
  let tableCellID = "";                                                                         //the id tag of the selected cell
  let enterNumber = false;                                                                     // this is used to determine if a quantity has been entered into a table cell
  let tableCell = "";
  let tableRow = "";

  document.getElementById("directDataEntryTable").addEventListener("click", (e) => {            //react if table clicked
   
	if (e.target !== e.currentTarget) tableCellID = e.target.id;                               //if table is clicked, get the id of the clicked cell
			tableCell = document.getElementById(tableCellID);
		  tableCell.style.backgroundColor = "yellow";
      tableRow= tableCell.parentNode.rowIndex;
    	enterNumber = true;
  });
  
  // STEP2 - IDENTIFY THE SELECTED CELL IN THE QUANTITIES TABLE
  
  let numberItemsID = "";
  
  document.getElementById("numberItemsTable").addEventListener("click", (e) => {                 //react if table clicked
   
	if (e.target !== e.currentTarget) numberItemsID = e.target.id;                               //if table is clicked, get the id of the clicked cell
	let selectedCell = document.getElementById(numberItemsID);
  
	if ((enterNumber = true)) tableCell.innerHTML = selectedCell.innerHTML;
	
	tableCell.style.backgroundColor = "white";
	enterNumber = false;

  //test against min/max values

 if (tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_MinColumn].innerHTML > 0 
                         && tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_MaxColumn].innerHTML >0) {  
   if (tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_QuantityColumn].innerHTML < tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_MinColumn].innerHTML
         || tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_QuantityColumn].innerHTML > tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_MaxColumn].innerHTML) { 
       
       tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_CommentsColumn].style.backgroundColor = "yellow";
       tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_CommentsColumn].innerHTML = "comment"

      }  else {
        tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_CommentsColumn].style.backgroundColor = "white";
        tableDirectDataEntry_El.rows[tableRow].cells[dataEntryTable_CommentsColumn].innerHTML = ""
      }
  } 

  });

  //add comments
  
  
  /*___________________________________________________________________________________________________________________________________
    FUNCTION TO ADD A COMMENT TO THE DIRECT DATA ENTRY TABLE                                                                                                         */
  
  // called from the HTML table
  
	function update(OptionsSelectID, tableCommentCellId) {

	let tableComment_El = document.getElementById(tableCommentCellId);
	let d = document.getElementById(OptionsSelectID);
	let displayText = d.options[d.selectedIndex].text;

	tableComment_El.innerHTML = document.getElementById("value").value =
	  displayText;
  };
  
      
  /*_______________________________________________________________________________________________________________________________
    DIRECT DATA ENTRY TABLE BUTTONS                                                                                                                        */
  
  buttonSave_El
  
  buttonSave_El.addEventListener("click", () => {
	  let tableID = tableDirectDataEntry_El;
	  let caseID = directDataEntryCaseID_El.innerHTML; 
    let bundleID = directDataEntryBundleID_El.innerHTML;
    let tableKey = caseID + bundleID;
	  setTable(tableID, tableKey);
	});
   
  
 
  
  
  
  /*_________________________________________________________________________________________________________
    ADMIN CASE DETAILS ENTRY                                                                                                                            */
 
  function addNewRecord(e) {
	e.preventDefault();
	
  const str = document.getElementById("importCSV").value;

                                                                                                                     //const str = "Item min max n Comment abc 3 5 b b";
  const result = str.split(' ').filter(element => element);

  let selectedValue = -1

	for (let i = 0; i < tableDirectDataEntry_El.rows.length; i++) {                                                   //create new table in direct data entry table      
		for (let j = 0; j < tableDirectDataEntry_El.rows[i].cells.length; j++) {
		  selectedValue = selectedValue + 1;
     
		 tableDirectDataEntry_El.rows[i].cells[j].innerHTML = result[selectedValue];
     	 x = tableDirectDataEntry_El.rows[i].cells[j].innerHTML
    
         if ( x ==="b") { tableDirectDataEntry_El.rows[i].cells[j].innerHTML = ""}                                // using 'b' rather than "" in string
         if ( x ==='b"') { tableDirectDataEntry_El.rows[i].cells[j].innerHTML = ""}                              //temp fix
         
		}
	  }

    tableDirectDataEntry_El.rows[0].cells[0].innerHTML = "Items"                                                 //temp fix
   
   
  //find next empty row and populate
  let rowIndex = 0
  for (let i = 0; i < tableAdminEl.rows.length; i++) {
	if (tableAdminEl.rows[i].cells[0].innerHTML != "") { rowIndex = rowIndex + 1 }
   
  };
  tableAdminEl.rows[rowIndex].cells[0].innerHTML = caseIDBoxEl.value
  tableAdminEl.rows[rowIndex].cells[1].innerHTML = requestBoxEl.value
  tableAdminEl.rows[rowIndex].cells[2].innerHTML = caseIDBoxEl.value + requestBoxEl.value
  
 setTable(tableAdminEl, "casesMasterTable")                                                                      //save admin table  in local storage
 
 let y = caseIDBoxEl.value + requestBoxEl.value                                                                  //save new table in local storage 
 setTable(tableDirectDataEntry_El, y)

}                                                                          
  
  formEl.addEventListener("submit", addNewRecord);                                                               //form submit button
  
  
