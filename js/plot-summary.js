setTimeout(plotSummary,10000);
function plotSummary () {
    if (!window.json_PlotTable_6) return;
    var features = json_PlotTable_6.features || [];
    
    var listItems = features.map(function(f) { return { props: f.properties || {}, geom: f.geometry || null }; });
    listItems.sort(function(a, b) {
        var la = (a.props.Plot || '').toString();
        var lb = (b.props.Plot || '').toString();
        return la.localeCompare(lb);
    });

    var container = document.createElement('div');
    var mapContainer = (window.map && map.getContainer) ? map.getContainer() : document.body;
    container.id = 'plot-summary';
    container.className = 'plot-summary info';
    container.style.zIndex = 10001;
    //container.style.maxHeight = '40vh';
    container.style.overflow = 'hidden';
    container.style.padding = '0px';
    container.style.width = '150px';
    container.style.position = 'absolute';
   // container.style.bottom = '0vh';
   container.style.display = 'block'
    mapContainer.appendChild(container);
    function positionPopupDiv(){
                try{
                        container.style.top = 35 + '%';
                        container.style.right = 10 +'px'
                        //container.style.bottom = 35 + '%'
                        container.style.maxHeight = '30vh';
                        container.style.overflow = 'hidden';
                    }
                catch(e){}
    }
    positionPopupDiv()

    var html = '<div style="padding: 8px;display:flex;justify-content:space-between;align-items:center;padding-bottom:8px;background:#0f5fc5;">' +
               '<h3 style="margin:0;color:#ffffff;">Summary</h3>' +
               '</div>';

    html += '<div id="summary-div" style="padding-left:2px;padding-right:2px;padding-bottom:8px;">'
    
    if (!window.json_Plots_1) return;
    var plotFeatures = json_Plots_1.features
    var plotItems = plotFeatures.map(function(l) {return {props: l.properties || {},geom: l.geometry || null};});
    var plotArr = [];
    plotItems.forEach(function(item,idx) {
        var p = item.props;
        var plot = p.Plot;
        plotArr.push(plot);
    });

    var plotCount = plotArr.length;
    
    obj = {};
    obj.arr = new Array();
    //var arr = [];
    listItems.forEach(function(item, idx) {
        var p = item.props;
        var LotAttr = p.Lot ? ' data-lot="' + (p.Lot + '') + '"' : '';
        var PlotAttr = p.Plot ? ' data-plot="' + (p.Plot + '') + '"' : '';
        var name = ((p.FirstName||'') + ' ' + (p.LastName||'')).trim();
        //var interred = (name && p.Grantee) || (name && !p.Grantee && name !=='open');
        //var reserved = !name && p.Grantee;
        //var available = (!name && !p.Grantee) || (name ==='open' && !p.Grantee);
        var status = p.Status // interred ? 'Interred' : reserved ? 'Reserved' : available ? 'Available' : '';
        obj.arr.push({status: status, plot: p.Plot});
    });
   
    var plotTable = obj.arr;
    var plotTableCount = plotTable.filter((value, index, self) =>
            index === self.findIndex((t) => (
            t.status === value.status && t.plot === value.plot
             ))).length;
    var interred = obj.arr.filter(function(value){
        if (value.status === 'Interred')
            return true;
        return false;
    });
    var interredCount = interred.filter((value, index, self) =>
            index === self.findIndex((t) => (
            t.status === value.status && t.plot === value.plot
             ))).length;

    var reserved = obj.arr.filter(function(value){
        if (value.status === 'Reserved')
            return true;
        return false;
    });
    var reservedCount = reserved.filter((value, index, self) =>
            index === self.findIndex((t) => (
            t.status === value.status && t.plot === value.plot
             ))).length;
    var available = obj.arr.filter(function(value){
        if (value.status === 'Available')
            return true;
        return false;
    });
    var availableCount = available.filter((value, index, self) =>
            index === self.findIndex((t) => (
            t.status === value.status && t.plot === value.plot
             ))).length;

    var availableCountTotal = (plotCount - plotTableCount) + availableCount;

    if (!window.json_LotLabels_2) return;
    var lotFeatures = json_LotLabels_2.features
    var lotItems = lotFeatures.map(function(l) {return {props: l.properties || {},geom: l.geometry || null};});
    var lotArr = [];
    lotItems.forEach(function(item,idx) {
        var p = item.props;
        var lot = p.Lot;
        lotArr.push(lot);
    });

    var lotCount = lotArr.length;

    html += '<p>Lots: <b>'+lotCount+
    '</b></p><p style="padding-left:0px;">Plots: <b>'+plotCount+
    '</b></p><p style="padding-left:12px;"><button id="interred_btn" class="button button1"></button>Interred: <b>'+interredCount+
    '</b></p><p style="padding-left:12px;"><button id="reserved_btn" class="button button2"></button>Reserved: <b>'+reservedCount+
    '</b></p><p style="padding-left:12px;"><button id="available_btn" class="button button3"></button>Available: <b>' +availableCountTotal+
    '</b></p></div>';
    container.innerHTML = html;
    /*
    var interred_btn = container.querySelector('#interred_btn');
    interred_btn.addEventListener('click', function(){
       
    })
*/
      /*function addToMap() {
        if (window.map && window.L && L.Control) {
            var ctrl = L.control({ position: 'topright' });
            ctrl.onAdd = function() { return container; };
            ctrl.addTo(map);
            // prevent clicks/scrolls inside this control from propagating to the map
            if (L && L.DomEvent) {
                if (L.DomEvent.disableClickPropagation) L.DomEvent.disableClickPropagation(container);
                if (L.DomEvent.disableScrollPropagation) L.DomEvent.disableScrollPropagation(container);
            }
            
        }
    }*/

    /*if (document.readyState === 'complete' || document.readyState === 'interactive') addToMap();
    else window.addEventListener('load', addToMap);*/
    if (L && L.DomEvent) {
                    if (L.DomEvent.disableClickPropagation) L.DomEvent.disableClickPropagation(container);
                    if (L.DomEvent.disableScrollPropagation) L.DomEvent.disableScrollPropagation(container);
    }};
