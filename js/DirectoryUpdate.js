(function(){
  // Replace with the Web App URL copied from Step 1
const API_URL = "https://script.google.com/macros/s/AKfycbzazfncDaJHyyxTT0ReMNPK_UEipJ3wEewBN_MNw6VhR1GPGPVj9cgJyJYLHmkSIqYKEg/exec";
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
        var ID = item.ID == '' ? null : item.ID;
        var Lot = item.Lot == '' ? null : item.Lot;
        var Plot = item.Plot == '' ? null : item.Plot;
        var FirstName = item.FirstName == '' ? null : item.FirstName;
        var LastName = item.LastName == '' ? null : item.LastName;
        var BurialDate = item.BurialDate == '' ? null : item.BurialDate;
        var BurialNote = item.BurialNote == '' ? null : item.BurialNote;
        var Book = item.Book == '' ? null : item.Book; 
        var Page = item.Page == '' ? null : item.Page;
        var RecordingDate = item.RecordingDate == '' ? null : item.RecordingDate;
        var Grantee = item.Grantee == '' ? null : item.Grantee;
        var Notes1 = item.Notes1 == '' ? null : item.Notes1;
        var Notes2 = item.Notes2 == '' ? null : item.Notes2;
        var Notes3 = item.Notes3 == '' ? null : item.Notes3;
        var Notes4 = item.Notes4 == '' ? null : item.Notes4;
        var EditDate = item.EditDate == '' ? null : item.EditDate;
        var Status = item.Status == '' ? null : item.Status;
        var EditLink = item.EditLink == '' ? null : item.EditLink;
        var Flagged = item.Flagged == '' ? null : item.Flagged;

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
})();
