(function(){
  // Replace with the Web App URL copied from Step 1
const API_URL = "https://script.google.com/macros/s/AKfycbwNYrcFVX8hkGais6vptMGgKfDhPPbVxfZf97LcyyGnU6DKPFN1VQUGjSdEdx_fX3BQzQ/exec";
async function fetchSheetData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    obj = {};
    obj.arr = new Array();
    data.forEach(function(item){
        var ID = item.ID == '' ? '' : item.ID;
        var Lot = item.Lot == '' ? '' : item.Lot;
        var Plot = item.Plot == '' ? '' : item.Plot;
        var FirstName = item.FirstName == '' ? '' : item.FirstName;
        var LastName = item.LastName == '' ? '' : item.LastName;
        var BurialDate = item.BurialDate == '' ? '' : item.BurialDate;
        var BurialNote = item.BurialNote == '' ? '' : item.BurialNote;
        var Book = item.Book == '' ? '' : item.Book; 
        var Page = item.Page == '' ? '' : item.Page;
        var RecordingDate = item.RecordingDate == '' ? '' : item.RecordingDate;
        var Grantee = item.Grantee == '' ? '' : item.Grantee;
        var Notes1 = item.Notes1 == '' ? '' : item.Notes1;
        var Notes2 = item.Notes2 == '' ? '' : item.Notes2;
        var Notes3 = item.Notes3 == '' ? '' : item.Notes3;
        var Notes4 = item.Notes4 == '' ? '' : item.Notes4;
        var EditDate = item.EditDate == '' ? '' : item.EditDate;
        var Status = item.Status == '' ? '' : item.Status;
        var EditLink = item.EditLink == '' ? '' : item.EditLink;
        var Flagged = item.Flagged == '' ? '' : item.Flagged;

        obj.arr.push({"type": "Feature", "properties": {
        ID: ID,
        Lot: Lot,
        Plot: Plot,
        FirstName: FirstName,
        LastName: LastName,
        BurialDate: BurialDate,
        BurialNote: BurialNote,
        Book: Book,
        Page: Page,
        RecordingDate: RecordingDate,
        Grantee: Grantee,
        Notes1: Notes1,
        Notes2: Notes2,
        Notes3: Notes3,
        Notes4: Notes4,
        EditDate: EditDate,
        Status: Status,
        EditLink: EditLink,
        Flagged: Flagged
      }});
  })
    const fc = { type: "FeatureCollection", name : "Plots", crs : { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } , features: obj.arr };
    //document.getElementById('test').innerHTML = JSON.stringify(fc);
     // expose for PlotTable_6.js
    window.json_PlotTable_6 = fc;
    // optional: notify listeners so you can avoid polling
    window.dispatchEvent(new Event('json_CemeteryDirectoryReady'));
    console.log("Your Sheet Data:", data);
    // You can now map, filter, or render this data to your HTML UI
    
  } catch (error) {
    console.error("Failed to load Google Sheet data:", error);
  }
}

// Execute the function
fetchSheetData();
