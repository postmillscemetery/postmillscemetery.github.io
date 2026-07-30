//window.addEventListener('json_CemeteryDirectoryReady',plotInfo);
setTimeout(plotInfo,8000);
function plotInfo(){
    function ready(fn){ 
        if(document.readyState==='complete'||document.readyState==='interactive') setTimeout(fn,0); 
        else window.addEventListener('load',fn); }
    function buildPopupHtml(p){
        var plot = p.Plot;
        var name = ((p.FirstName||'') + ' ' + (p.LastName||'')).trim();
        //var interred = (name && p.Grantee) || (name && !p.Grantee && name !=='open');
        //var reserved = !name && p.Grantee;
        //var available = (!name && !p.Grantee) || (name ==='open' && !p.Grantee);
        var status = p.Status //interred ? 'Interred' : reserved ? 'Reserved' : available ? 'Available' : '';
        var notes = p.Notes//((p.Notes1 || '') + ' ' + (p.Notes2 || '') + ' ' + (p.Notes3 || '') + ' ' + (p.Notes4 || '')).trim();
        var editDate = new Date(p.EditDate || '');
        //var html = '<div style="background-color: #ef4036;text-align:center;padding:6px 8px;border-bottom:1px solid #ef4036;font-weight:bold;font-size:16px;color: #ffffff">'+ fullName +'</div>';
        var html = '<div class="plot-popup" style="font-family:Arial, Helvetica, sans-serif; font-size:13px;padding-left:8px;padding-right:8px;padding-bottom:8px;">'+
        '<table style="border-collapse:collapse;width:100%;cursor:text;">';
        html += '<tbody>';
        if (status === 'Interred') html += '<tr><td colspan="2" style="text-align:center;font-size:larger;border-bottom:none;">Deceased Info</td>'
        if (status === 'Interred') html += '<tr><td>Name</td><td>' + name + '</td></tr>';
        if (status === 'Interred') html += '<tr><td>Burial Date</td><td>' + (p.BurialDate || '') + '</td></tr>';
        if (status === 'Interred') html += '<tr><td>Burial Note</td><td>' + (p.BurialNote || '') + '</td></tr>';
        if (status !== 'Available') html += '<tr><td colspan="2" style="text-align:center;font-size:larger;border-bottom:none;">Deed Info</td>'
        if (status === 'Available') html += '<tr><td colspan="2" style="text-align:center;font-size:larger;border-bottom:none;padding-bottom:25%;font-style:italic;">Available</td>'
        if (status !== 'Available') html += '<tr><td>Grantee Last Name</td><td>' + (p.Grantee || '') + '</td></tr>';
        if (status !== 'Available') html += '<tr><td>Book</td><td>' + (p.Book || '') + '</td></tr>';
        if (status !== 'Available') html += '<tr><td>Page</td><td>' + (p.Page || '') + '</td></tr>';
        if (status !== 'Available') html += '<tr><td>Recording Date</td><td>' + (p.RecordingDate || '') + '</td></tr>';
        if (notes) html += '<tr><td colspan="2" style="text-align:center;font-size:larger;border-bottom:none;">Notes</td>'
        if (notes) html += '<tr><td colspan="2" style="font-weight:normal;border-bottom:none;">' + (notes || '') + '</td></tr>';
        if (editDate != 'Invalid Date') html += '<tr><td colspan="2" style="font-weight:normal; font-style: italic;text-align: right; border-bottom:none;">Last Edit: ' +  editDate.toLocaleDateString('en-US') + '</td></tr>';
        html += '</tbody></table></div>';
        return html;
    }

    function buildEditHtml(p){
        var id = p.ID;
        var lot = p.Lot
        var plot = p.Plot;
        var FirstName = p.FirstName;
        var selectedInterr = p.Status == 'Interred' ? 'selected' : '';
        var selectedReserv = p.Status == 'Reserved' ? 'selected' : '';
        var selectedAvail = p.Status == 'Available' ? 'selected' : '';
        var selectedFlag = p.Flagged == true ? 'selected' : '';
        var nowDate = new Date()
        var editHtml = '<body><div class="edit-plot" style="font-family:Arial, Helvetica, sans-serif; font-size:13px;padding-left:8px;padding-right:8px;padding-bottom:8px;"><h3 style="text-align:center;">Edit Plot Info</h3>'+
        '<form id="sheetForm" style="display: flex; flex-direction: column; max-width: 300px; gap: 10px;">'+
                '<label for="flagged">Flagg for review?</label><select id="flagged" name="Flagged" size="2" >'+ 
                    '<option value="TRUE"'+ selectedFlag+'>Yes</option>'+
                    '<option value="FALSE"' + !selectedFlag+'>No</option>'+      
                '<input type="hidden" id="ID" name="ID" value="'+p.ID+'" readonly >'+
                '<label for="lot">Lot:</label><input type="text" id="lot" name="Lot" value="'+p.Lot+'"  required>'+
                '<label for="plot">Plot:</label><input type="text" id="plot" name="Plot" value="'+p.Plot+'" required>'+
                '<label for="grantee">Grantee Last Name:</label><input type="text" id="grantee" name="Grantee" value="'+p.Grantee+'">'+
                '<label for="book">Book:</label><input type="number" id="book" name="Book" value="'+p.Book+'">'+
                '<label for="page">Page:</label><input type="number" id="page" name="Page" value="'+p.Page+'">'+
                '<label for="recordingdate">Recording Date:</label><input type="text" id="recordingdate" name="RecordingDate" value="'+p.RecordingDate+'">'+
                '<label for="status">Status</label><select id="status" name="Status" size="3" >'+
                    '<option value="Interred"'+ selectedInterr+'>Interred</option>'+
                    '<option value="Reserved"'+ selectedReserv+'>Reserved</option>'+
                    '<option value="Available"'+ selectedAvail+'>Available</option></select>'+
                '<label for="firstname">First Name:</label><input type="text" id="firstname" name="FirstName" value="'+p.FirstName+'" >'+
                '<label for="lastname">Last Name:</label><input type="text" id="lastname" name="LastName" value="'+p.LastName+'" >'+
                '<label for="burialdate">Burial Date:</label><input type="text" id="burialdate" name="BurialDate" value="'+p.BurialDate+'" >'+
                '<label for="burialnote">Burial Note:</label><input type="text" id="burialnote" name="BurialNote" value="'+p.BurialNote+'" >'+
                '<label for="notes">Notes:</label><textarea id="notes" name="Notes" rows="5" cols="30">'+p.Notes+'</textarea>'+
                '<input type="hidden" id="editdate" name="EditDate" value="'+nowDate.toLocaleDateString('en-US')+'">'+

                '<button type="submit" style="padding: 8px; cursor: pointer; background: #0f5fc5; color: white; border: none;">Save</button></form></div></body>'
        return editHtml;
    }


    ready(function(){
        var container = document.querySelector('.plot-list');
        if (!container) return;
        var mapContainer = (window.map && map.getContainer) ? map.getContainer() : document.body;
        var headerDiv = document.createElement('div');
        var popupDiv = document.createElement('div');
        popupDiv.id = 'plot-popup';
        popupDiv.style.position = 'absolute';
        popupDiv.style.zIndex = 10001;
        popupDiv.style.width = '400px';
        popupDiv.style.maxHeight = '50vh';
        //popupDiv.style.overflow = 'auto';
        popupDiv.style.background = '#f8f8f8';
        popupDiv.style.boxShadow = '0 3px 14px rgba(0,0,0,0.3)';
        popupDiv.style.display = 'none';
        popupDiv.style.padding = '0px';
        popupDiv.style.borderRadius = '4px';
        mapContainer.appendChild(popupDiv);
        var editDiv = document.createElement('div');
        editDiv.id = 'plot-edit';
        editDiv.style.position = 'absolute';
        editDiv.style.zIndex = 10001;
        editDiv.style.width = '300px';
        editDiv.style.maxHeight = '50vh';
        editDiv.style.background = '#f8f8f8';
        editDiv.style.boxShadow = '0 3px 14px rgba(0,0,0,0.3)';
        editDiv.style.display = 'none';
        editDiv.style.padding = '0px';
        editDiv.style.borderRadius = '4px';
        mapContainer.appendChild(editDiv);

        function positionPopupDiv(){
            try{
                    popupDiv.style.top = 60 + '%';
                    popupDiv.style.left = 10 +'px'
                    popupDiv.style.bottom = 2 + '%'
                    popupDiv.style.maxHeight = '50vh';
                    popupDiv.style.overflow = 'auto';
                    editDiv.style.top = 60 + '%';
                    editDiv.style.left = 10 +'px'
                    editDiv.style.bottom = 2 + '%'
                    editDiv.style.maxHeight = '50vh';
                    editDiv.style.overflow = 'auto';
                }
            catch(e){}
        }
        /*window.addEventListener('resize', positionPopupDiv);
        if (window.map && typeof map.on === 'function') map.on('move resize', positionPopupDiv);*/

        // highlighted plot helpers
        var highlightedPlotLayer = null;
        function clearPlotHighlight() {
            try {
                if (highlightedPlotLayer && window.layer_Plots_1a && typeof window.layer_Plots_1a.resetStyle === 'function') {
                    window.layer_Plots_1a.resetStyle(highlightedPlotLayer);
                } else if (highlightedPlotLayer && typeof highlightedPlotLayer.setStyle === 'function') {
                    // best-effort reset when resetStyle isn't available
                    highlightedPlotLayer.setStyle({
                        color: 'rgba(35,35,35,1.0)',
                        weight: 1,
                        fillColor: 'rgba(166,206,227,1.0)',
                        fillOpacity: 1
                    });
                }
            } catch (e) {}
            highlightedPlotLayer = null;
        }
        function highlightPlotById(plotId, panTo) {
            try {
                clearPlotHighlight();
                if (!plotId || !window.layer_Plots_1a || typeof window.layer_Plots_1a.eachLayer !== 'function') return;
                var pid = '' + plotId;
                var found = null;
                window.layer_Plots_1a.eachLayer(function(layer) {
                    var p = (layer && layer.feature && layer.feature.properties && layer.feature.properties.Plot) ? ('' + layer.feature.properties.Plot) : '';
                    if (p === pid) found = layer;
                });
                if (!found) return;
                if (typeof found.setStyle === 'function') {
                    found.setStyle({
                        color: 'rgba(255, 165, 0, 1)',//'rgba(0,255,255,1)',
                        weight: 4,
                        fillColor: 'rgba(255,255,0,1)',
                        fillOpacity: 1
                    });
                }
                if (typeof found.bringToFront === 'function') found.bringToFront();
                if (window.map && typeof window.map.fitBounds === 'function' && typeof found.getBounds === 'function') {
                    try { window.map.fitBounds(found.getBounds(), {
                        paddingTopLeft:[200,0],
                        maxZoom: map.getZoom() < 21 ? 21 : map.getZoom()}); 
                    } catch (e){}
                }
                highlightedPlotLayer = found;
            } catch (e) {}
        }

        // intercept clicks on rows (capture phase) and show fixed popup
        container.addEventListener('click', function(e){
            var target = e.target || e.srcElement;
            var row = target.closest ? target.closest('tr[data-plot], tr[data-idx]') : null;
            if (!row) return;
            // stop other handlers (including original that opens leaflet popup)
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            if (e.preventDefault) e.preventDefault();

            var plot = row.getAttribute('data-plot');
            var fid = row.getAttribute('data-id');
            // clear any previous selection
            container.querySelectorAll('tr.selected').forEach(function(r){ r.classList.remove('selected'); });
            // mark this row selected
            row.classList.add('selected');
            var feat = null;
            if (plot && window.json_PlotTable_6 && Array.isArray(window.json_PlotTable_6.features)) {
                for (var i = 0; i < window.json_PlotTable_6.features.length; i++) {
                    var f = window.json_PlotTable_6.features[i];
                    var pid = (f && f.properties && f.properties.Plot) ? (f.properties.Plot + '') : '';
                    var id = (f && f.properties && f.properties.ID) ? (f.properties.ID + '') : '';
                    if (pid === plot && id === fid) { feat = f; break; }
                }
            }
            if (!feat) {
                var idx = parseInt(row.getAttribute('data-idx'), 10);
                if (isNaN(idx)) return;
                feat = (window.json_PlotTable_6 && window.json_PlotTable_6.features && window.json_PlotTable_6.features[idx]) ? window.json_PlotTable_6.features[idx] : null;
            }
            var props = feat ? feat.properties || {} : {};
            var popupHtml = buildPopupHtml(props);
            var editHtml = buildEditHtml(props);
            var pl = props.Plot;
            var name = ((props.FirstName||'') + ' ' + (props.LastName||'')).trim();
            //var interred = (name && props.Grantee) || (name && !props.Grantee && name !=='open');
            //var reserved = !name && props.Grantee;
            //var available = (!name && !props.Grantee) || (name ==='open' && !props.Grantee);
            var status = props.Status == 'Interred' ? 'rgba(132, 172, 223,1)' : props.Status == 'Reserved' ? 'rgba(176, 206, 246,1)' :'rgba(219, 232, 249,1)';
            var editLink; //'/Form.html' //'https://www.appsheet.com/start/0318ac0c-250d-4f66-8de7-963caa56ca65' + String(props.EditLink);
            var headerHtml = '<div style="display: flex;justify-content: space-between;position:sticky;top:0;background-color:' + status 
                + ';text-align:left;padding:12px 6px 6px 12px;border-bottom:1px solid #EEE;font-weight:bold;font-size:16px;color: #000000;cursor:text;">'+ pl 
                +`<button id="plot-popup-edit" style="font-size:12px;margin-bottom:6px;padding:4px 8px;float:right;cursor:pointer;">Edit</button><button id="plot-popup-close" style="font-size:12px;margin-bottom:6px;padding:4px 8px;float:right;cursor:pointer;">Close</button></div>` //<a style="text-decoration:none;" href="${editLink}" target="_blank">Edit</a>
            popupDiv.innerHTML = headerHtml + popupHtml;
            var editBtn = popupDiv.querySelector('#plot-popup-edit');
            var closeBtn = popupDiv.querySelector('#plot-popup-close');
            if (editBtn) editBtn.addEventListener('click',function(){
                var editHeader = '<div style="display: flex;justify-content: space-between;position:sticky;top:0;background-color:' + status 
                    + ';text-align:left;padding:12px 6px 6px 12px;border-bottom:1px solid #EEE;font-weight:bold;font-size:16px;color: #000000;cursor:text;">'+ pl 
                    +`<button id="plot-edit-close" style="font-size:12px;margin-bottom:6px;padding:4px 8px;float:right;cursor:pointer;">Close</button></div>`
                popupDiv.style.display = 'none';
                editDiv.innerHTML = editHeader + editHtml;
                editDiv.style.display = 'block';  
                var editCloseBtn = editDiv.querySelector('#plot-edit-close');
                    if (editCloseBtn) editCloseBtn.addEventListener('click',function(){
                    editDiv.style.display = 'none';
                    popupDiv.style.display = 'block';
                });
                //form submission code
                const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwNYrcFVX8hkGais6vptMGgKfDhPPbVxfZf97LcyyGnU6DKPFN1VQUGjSdEdx_fX3BQzQ/exec';
                const form = document.getElementById('sheetForm');
                
                form.addEventListener('submit', e => {
                e.preventDefault();

                const formData = new FormData(form);

                fetch(SCRIPT_URL, { 
                    method: 'POST', 
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        // The API response tells you if it appended or modified a row
                        alert(`Success! Data was ${data.action} at row ${data.row}.`);
                        form.reset();
                    } else {
                        alert('Error updating sheet: ' + data.error);
                        console.error('Error:', data.error);
                    }
                })
                .catch(error => {
                    alert('Network error. Check console.');
                    console.error('Fetch Error:', error);
                });
                });
            });
           
            
            if (closeBtn) closeBtn.addEventListener('click', function(){
                popupDiv.style.display = 'none';
                container.querySelectorAll('tr.selected').forEach(function(r){ r.classList.remove('selected'); });
                clearPlotHighlight();
            });
            
           
            popupDiv.style.display = 'block';
            editDiv.style.display = 'none';
            positionPopupDiv();
            window.dispatchEvent(new Event('plotListClick'));
            // highlight the corresponding plot on the map
            try { highlightPlotById(plot || props.Plot, false); } catch (e) {}
            if (L && L.DomEvent) {
                if (L.DomEvent.disableClickPropagation) L.DomEvent.disableClickPropagation(popupDiv);
                if (L.DomEvent.disableScrollPropagation) L.DomEvent.disableScrollPropagation(popupDiv);
                if (L.DomEvent.disableClickPropagation) L.DomEvent.disableClickPropagation(editDiv);
                if (L.DomEvent.disableScrollPropagation) L.DomEvent.disableScrollPropagation(editDiv);
            }
        
        }, true);
    
    
    });
};
