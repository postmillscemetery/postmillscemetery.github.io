        var highlightLayer;
        function highlightFeature(e) {
            highlightLayer = e.target;
            if (e.target.feature.geometry.type === 'LineString' || e.target.feature.geometry.type === 'MultiLineString') {
              highlightLayer.setStyle({
                color: 'rgba(255, 255, 0, 1.00)',
              });
            } else {
              highlightLayer.setStyle({
                color: 'rgba(255, 165, 0, 1)',
                weight: 4,
                fillColor: 'rgba(255,255,0,1.0)',
                fillOpacity: 1
              });
            }//highlightLayer.bringToFront();
        }
        
        var map = L.map('map', {
            zoomControl:false, maxZoom:23, minZoom:20,
        })
        map.setMaxBounds([[43.88808,-72.24951],[43.88451,-72.25342]]);
        
        var hash = new L.Hash(map);
        map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a> &middot; <a href="https://farfieldmapping.com">Far Field Mapping</a>');
        var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
        // remove popup's row if "visible-with-data"
        function removeEmptyRowsFromPopupContent(content, feature) {
         var tempDiv = document.createElement('div');
         tempDiv.innerHTML = content;
         var rows = tempDiv.querySelectorAll('tr');
         for (var i = 0; i < rows.length; i++) {
             var td = rows[i].querySelector('td.visible-with-data');
             var key = td ? td.id : '';
             if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
                 rows[i].parentNode.removeChild(rows[i]);
             }
         }
         return tempDiv.innerHTML;
        }
        // modify popup if contains media
        function addClassToPopupIfMedia(content, popup) {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            var imgTd = tempDiv.querySelector('td img');
            if (imgTd) {
                var src = imgTd.getAttribute('src');
                if (/\.(jpg|jpeg|png|gif|bmp|webp|avif)$/i.test(src)) {
                    popup._contentNode.classList.add('media');
                    setTimeout(function() {
                        popup.update();
                    }, 10);
                } else if (/\.(mp3|wav|ogg|aac)$/i.test(src)) {
                    var audio = document.createElement('audio');
                    audio.controls = true;
                    audio.src = src;
                    imgTd.parentNode.replaceChild(audio, imgTd);
                    popup._contentNode.classList.add('media');
                    setTimeout(function() {
                        popup.setContent(tempDiv.innerHTML);
                        popup.update();
                    }, 10);
                } else if (/\.(mp4|webm|ogg|mov)$/i.test(src)) {
                    var video = document.createElement('video');
                    video.controls = true;
                    video.src = src;
                    video.style.width = "400px";
                    video.style.height = "300px";
                    video.style.maxHeight = "60vh";
                    video.style.maxWidth = "60vw";
                    imgTd.parentNode.replaceChild(video, imgTd);
                    popup._contentNode.classList.add('media');
                    // Aggiorna il popup quando il video carica i metadati
                    video.addEventListener('loadedmetadata', function() {
                        popup.update();
                    });
                    setTimeout(function() {
                        popup.setContent(tempDiv.innerHTML);
                        popup.update();
                    }, 10);
                } else {
                    popup._contentNode.classList.remove('media');
                }
            } else {
                popup._contentNode.classList.remove('media');
            }
        }
        var title = new L.Control({'position':'topright'});
        title.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };
        title.update = function () {
            this._div.innerHTML = '<h2>Post Mills Cemetery Map</h2>';
        };
        title.addTo(map);
        var zoomControl = L.control.zoom({
            position: 'topright'
        }).addTo(map);
        var scale = new L.control.scale({
            position: 'bottomright',
        });
        scale.addTo(map);
        
        var measureControl = new L.Control.Measure({
            position: 'topright',
            primaryLengthUnit: 'feet',
            secondaryLengthUnit: 'miles',
            primaryAreaUnit: 'sqfeet',
            secondaryAreaUnit: 'sqmiles'
        });
        //measureControl.addTo(map);


        //document.getElementsByClassName('leaflet-control-measure-toggle')[0].innerHTML = '';
        //document.getElementsByClassName('leaflet-control-measure-toggle')[0].className += ' fas fa-ruler';
        
        var bounds_group = new L.featureGroup([]);
        function setBounds() {
            if (bounds_group.getLayers().length) {
                map.fitBounds(bounds_group.getBounds());
            }
        }
		function pop_Buildings_5(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    for (var i in e.target._eventParents) {
                        if (typeof e.target._eventParents[i].resetStyle === 'function') {
                            e.target._eventParents[i].resetStyle(e.target);
                        }
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['fid'] !== null ? autolinker.link(String(feature.properties['fid']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_Buildings_5_0() {
            return {
                pane: 'pane_Buildings_5',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 0.75,
                fillColor: 'rgba(35,35,35,1.0',
                interactive: false,
            }
        }
        map.createPane('pane_Buildings_5');
        map.getPane('pane_Buildings_5').style.zIndex = 400;
        map.getPane('pane_Buildings_5').style['mix-blend-mode'] = 'normal';
        var layer_Buildings_5 = new L.geoJson(json_Buildings_5, {
            attribution: '',
            interactive: false,
            dataVar: 'json_Buildings_5',
            layerName: 'layer_Buildings_5',
            pane: 'pane_Buildings_5',
            onEachFeature: pop_Buildings_5,
            style: style_Buildings_5_0,
        });
        bounds_group.addLayer(layer_Buildings_5);
        map.addLayer(layer_Buildings_5);
			
		function pop_Driveways_4(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    for (var i in e.target._eventParents) {
                        if (typeof e.target._eventParents[i].resetStyle === 'function') {
                            e.target._eventParents[i].resetStyle(e.target);
                        }
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['fid'] !== null ? autolinker.link(String(feature.properties['fid']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }
			function style_Driveways_4_0() {
            return {
                pane: 'pane_Driveways_4',
                stroke: false, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(201,201,200,1.0)',
                interactive: false,
            }
        }
        function style_Driveways_4_1() {
            return {
                pane: 'pane_Driveways_4',
                opacity: 1,
                color: 'rgba(201,201,200,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 1,
                fillOpacity: 0,
                interactive: false,
            }
        }
        map.createPane('pane_Driveways_4');
        map.getPane('pane_Driveways_4').style.zIndex = 401;
        map.getPane('pane_Driveways_4').style['mix-blend-mode'] = 'normal';
        var layer_Driveways_4 = new L.geoJson.multiStyle(json_Driveways_4, {
            attribution: '',
            interactive: false,
            dataVar: 'json_Driveways_4',
            layerName: 'layer_Driveways_4',
            pane: 'pane_Driveways_4',
            onEachFeature: pop_Driveways_4,
            styles: [style_Driveways_4_0,style_Driveways_4_1,]
        });
        bounds_group.addLayer(layer_Driveways_4);
        map.addLayer(layer_Driveways_4);
        function pop_Roads_0(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    for (var i in e.target._eventParents) {
                        if (typeof e.target._eventParents[i].resetStyle === 'function') {
                            e.target._eventParents[i].resetStyle(e.target);
                        }
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['PRIMARYNAME'] !== null ? autolinker.link(String(feature.properties['PRIMARYNAME']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_Roads_0_0() {
            return {
                pane: 'pane_Roads_0',
                opacity: 0,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 1.0,
                fillOpacity: 0,
                interactive: false,
            }
        }
        function style_Roads_0_1() {
            return {
                pane: 'pane_Roads_0',
                stroke: false, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(168,168,168,1.0)',
                interactive: false,
            }
        }
        map.createPane('pane_Roads_0');
        map.getPane('pane_Roads_0').style.zIndex = 400;
        map.getPane('pane_Roads_0').style['mix-blend-mode'] = 'normal';
        var layer_Roads_0 = new L.geoJson.multiStyle(json_Roads_0, {
            attribution: '',
            interactive: false,
            dataVar: 'json_Roads_0',
            layerName: 'layer_Roads_0',
            pane: 'pane_Roads_0',
            onEachFeature: pop_Roads_0,
            styles: [style_Roads_0_0,style_Roads_0_1,]
        });
        bounds_group.addLayer(layer_Roads_0);
        map.addLayer(layer_Roads_0);
        function pop_Plots_1(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    for (var i in e.target._eventParents) {
                        if (typeof e.target._eventParents[i].resetStyle === 'function') {
                            e.target._eventParents[i].resetStyle(e.target);
                        }
                    }
                },
                mouseover: highlightFeature,
            
            });
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="1" style="font-weight:bold;font-size:larger;text-align:center;">' + (feature.properties['Plot'] !== null ? autolinker.link(String(feature.properties['Plot']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_Plots_1_0() { // interred
            return {
                pane: 'pane_Plots_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(15, 95, 197,.5)',
                interactive: true,
            }
        }
        function style_Plots_1_1() { //reserved
            return {
                pane: 'pane_Plots_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(103, 164, 244,.5)',
                interactive: true,
            }
        }
        function style_Plots_1_2() { // available
            return {
                pane: 'pane_Plots_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(189, 215, 250,.5)',
                interactive: true,
            }
        }
        function style_Plots_1a_0() { // highlight
            return {
                pane: 'pane_Plots_1',
                opacity: 1,
                color: 'rgba(35,35,35,0.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1, 
                fill: true,
                fillOpacity: 0,
                fillColor: 'rgba(189, 215, 250,.5)',
                interactive: true,
            }
        }
        map.createPane('pane_Plots_1');
        map.getPane('pane_Plots_1').style.zIndex = 401;
        map.getPane('pane_Plots_1').style['mix-blend-mode'] = 'normal';
        //window.addEventListener('json_CemeteryDirectoryReady',plotLayer());
        setTimeout(plotLayer,8000);
        function plotLayer(){
        var layer_Plots_1 = new L.geoJson(json_Plots_1, {
            attribution: '',
            interactive: true,
            dataVar: 'json_Plots_1',
            layerName: 'layer_Plots_1',
            pane: 'pane_Plots_1',
            onEachFeature: pop_Plots_1,
            style: function(feature) {
                var plotTable = window.json_PlotTable_6 ? window.json_PlotTable_6.features : [];
                //var plots = window.json_Plots_1 ? window.json_Plots_1.features : [];
                plotTable.forEach(function(p) {
                    if (p.properties.Plot === feature.properties.Plot) {
                        feature.properties.FirstName = p.properties.FirstName;
                        feature.properties.LastName = p.properties.LastName;
                        feature.properties.Grantee = p.properties.Grantee;
                        feature.properties["Status"] = p.properties.Status
                    }
                });
                var name = ((feature.properties['FirstName'] || '' ) + ' ' + (feature.properties['LastName'] || '')).trim();
                var grantee = feature.properties['Grantee'];
                var status = feature.properties['Status'];
                //var interred = ((name && grantee) || (name && !grantee && name !=='open'));
                //var reserved = (!name && grantee);
                //var available = ((!name && !grantee) || (name === 'open' && !grantee));
                if (status == 'Interred') { //interred
                    return style_Plots_1_0();
                } else if (status ==  'Reserved') { // reserved
                    return style_Plots_1_1();
                } else { // available
                    return style_Plots_1_2();
                }
            }
        });
        bounds_group.addLayer(layer_Plots_1);
        map.addLayer(layer_Plots_1);
        };

        var layer_Plots_1a = new L.geoJson(json_Plots_1, {
            attribution: '',
            interactive: true,
            dataVar: 'json_Plots_1',
            layerName: 'layer_Plots_1',
            pane: 'pane_Plots_1',
            onEachFeature: pop_Plots_1,
            style: style_Plots_1a_0()
        });
        map.addLayer(layer_Plots_1a)
        function pop_LotLabels_2(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    for (var i in e.target._eventParents) {
                        if (typeof e.target._eventParents[i].resetStyle === 'function') {
                            e.target._eventParents[i].resetStyle(e.target);
                        }
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table>\
                    <tr>\
                        <td style="font-size:14px; font-weight:bold;text-align:center;padding-bottom:6px;">' + (feature.properties['Lot'] !== null ? autolinker.link(String(feature.properties['Lot']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td>Lot Size: ' + '<span style="font-weight:bold;">' + (feature.properties['Lot_Size'] !== null ? autolinker.link(String(feature.properties['Lot_Size']).replace(/'/g, '\'').toLocaleString()) : '') + '</span></td>\
                    </tr>\
                    <tr>\
                       <td>Total Plots: ' + '<span style="font-weight:bold;">' + (feature.properties['Total_Plots'] !== null ? autolinker.link(String(feature.properties['Total_Plots']).replace(/'/g, '\'').toLocaleString()) : '') + '</span></td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
            layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { 
                maxHeight: 400,
                //closeOnClick: true,
                autoClose: true 
            });
            window.addEventListener('plotListClick',function(){
                layer.closePopup()
            })
        }

        function style_LotLabels_2_0() {
            return {
                pane: 'pane_LotLabels_2',
                opacity: 0,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1, 
                fill: true,
                fillOpacity: 0,
                stroke: true,
                interactive: true
            }
        }
        map.createPane('pane_LotLabels_2');
        map.getPane('pane_LotLabels_2').style.zIndex = 402;
        map.getPane('pane_LotLabels_2').style['mix-blend-mode'] = 'normal';
        var layer_LotLabels_2 = new L.geoJson(json_LotLabels_2, {
            attribution: '',
            interactive: true,
            dataVar: 'json_LotLabels_2',
            layerName: 'layer_LotLabels_2',
            pane: 'pane_LotLabels_2',
            onEachFeature: pop_LotLabels_2,
            style: style_LotLabels_2_0,
        });
       
        bounds_group.addLayer(layer_LotLabels_2);

        map.addLayer(layer_LotLabels_2);
        function pop_CemeteryBoundary_3(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    for (var i in e.target._eventParents) {
                        if (typeof e.target._eventParents[i].resetStyle === 'function') {
                            e.target._eventParents[i].resetStyle(e.target);
                        }
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['fid'] !== null ? autolinker.link(String(feature.properties['fid']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_CemeteryBoundary_3_0() {
            return {
                pane: 'pane_CemeteryBoundary_3',
                opacity: 1,
                color: 'rgba(0,0,0,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 3.0,
                fillOpacity: 0,
                interactive: false,
            }
        }
        map.createPane('pane_CemeteryBoundary_3');
        map.getPane('pane_CemeteryBoundary_3').style.zIndex = 403;
        map.getPane('pane_CemeteryBoundary_3').style['mix-blend-mode'] = 'normal';
        var layer_CemeteryBoundary_3 = new L.geoJson(json_CemeteryBoundary_3, {
            attribution: '',
            interactive: false,
            dataVar: 'json_CemeteryBoundary_3',
            layerName: 'layer_CemeteryBoundary_3',
            pane: 'pane_CemeteryBoundary_3',
            onEachFeature: pop_CemeteryBoundary_3,
            style: style_CemeteryBoundary_3_0,
        });
        bounds_group.addLayer(layer_CemeteryBoundary_3);
        map.addLayer(layer_CemeteryBoundary_3);
		
        map.createPane('pane_Survey_7').style['mix-blend-mode'] = 'normal';
        map.getPane('pane_Survey_7').style.zIndex = 300;
        var img_Survey_7 = 'data/Survey_georef_7.png';
        var img_bounds_Survey_7 = [[43.885201814993565,-72.25311795149555],[43.887392678114544,-72.25052790302821]];
        var layer_Survey_7 = new L.imageOverlay(img_Survey_7,
                    img_bounds_Survey_7,
                    {pane: 'pane_Survey_7'});
        bounds_group.addLayer(layer_Survey_7);
        //map.addLayer(layer_Survey_7);
  



		var oldCemetery = L.tooltip({
            permanent: true,
        })
            .setLatLng([43.88639,-72.25150])
            .setContent('<div style="color: #323232; font-size: 12pt; font-weight: bold; font-family: \'Open Sans\', sans-serif;">Old Cemetery</div>')
            .openOn(map);
        

  
        var overlaysTree = [
            //{label: '<img src="legend/CemeteryBoundary_3.png" /> Cemetery Boundary', layer: layer_CemeteryBoundary_3},
            {label: 'Lot Labels', layer: layer_LotLabels_2},
            //{label: 'Plots', layer: layer_Plots_1},
            {label: "1979 Survey", layer: layer_Survey_7},
            //{label: '<img src="legend/Roads_0.png" /> Roads', layer: layer_Roads_0},
		 	//{label: '<img src="legend/Driveways_4.png" /> Driveways', layer: layer_Driveways_4},
			//{label: '<img src="legend/Buildings_5.png" /> Buildings', layer: layer_Buildings_5},
            ]	
        var lay = L.control.layers.tree(null, overlaysTree,{
            position: 'topright',
            //namedToggle: true,
            //selectorBack: false,
            //closedSymbol: '&#8862; &#x1f5c0;',
            //openedSymbol: '&#8863; &#x1f5c1;',
            //collapseAll: 'Collapse all',
            //expandAll: 'Expand all',
            collapsed: false,
        });
        lay.addTo(map);
        setBounds();
        
        var i = 0;
        layer_Roads_0.eachLayer(function(layer) {
            var context = {
                feature: layer.feature,
                variables: {}
            };
            layer.bindTooltip((layer.feature.properties['PRIMARYNAME'] === 'Robinson Hill Road'?String('<div style="transform: rotate(18deg);color: #000000; font-size: 12pt; font-family: \'Open Sans\', sans-serif;">' + layer.feature.properties['PRIMARYNAME']) + '</div>': layer.feature.properties['PRIMARYNAME'] === 'VT Route 244'?'<a title="SPUI, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Vermont_244.svg"><img width="40" alt="Vermont 244" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Vermont_244.svg/330px-Vermont_244.svg.png"></a>':''), {permanent: true, offset: [-0, -16], className: 'css_Roads_0'});
            labels.push(layer);
            totalMarkers += 1;
              layer.added = true;
              addLabel(layer, i);
              i++;
        });
        var i = 0;
        layer_LotLabels_2.eachLayer(function(layer) {
            var context = {
                feature: layer.feature,
                variables: {}
            };
            layer.bindTooltip((layer.feature.properties['Lot'] !== null?String('<div style="color: #323232; text-shadow: 0px 0px 4px #ffffff; font-size: 10pt; font-weight: bold; font-family: \'Open Sans\', sans-serif;">' + layer.feature.properties['Lot']) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_LotLabels_2'});
            labels.push(layer);
            totalMarkers += 1;
              layer.added = true;
              addLabel(layer, i);
              i++;
        });
			/*
		var i = 0;
        layer_Plots_1.eachLayer(function(layer) {
            var context = {
                feature: layer.feature,
                variables: {}
            };
            layer.bindTooltip((layer.feature.properties['Plot_Name'] !== null?String('<div style="color: #323232; font-size: 10pt; font-weight: bold; font-family: \'Open Sans\', sans-serif;">' + layer.feature.properties['Plot_Name']) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_Plots_1'});
            labels.push(layer);
            totalMarkers += 1;
              layer.added = true;
              addLabel(layer, i);
              i++;
        });*/

        /*
        map.addControl(new L.Control.Search({
            layer: layer_LotLabels_2,
            position: 'topleft',
            initial: false,
            hideMarkerOnCollapse: true,
            propertyName: 'Lot'}));
        if (typeof url === 'undefined') {
            document.getElementsByClassName('search-button')[0].className += ' fa fa-binoculars';
        } else {
            document.getElementsByClassName('search-button')[1].className += ' fa fa-binoculars';
        }*/
        resetLabels([layer_Roads_0,layer_LotLabels_2]);
        map.on("zoomend", function(){
            resetLabels([layer_Roads_0,layer_LotLabels_2]);
        });
        map.on("layeradd", function(){
            resetLabels([layer_Roads_0,layer_LotLabels_2]);
        });
        map.on("layerremove", function(){
            resetLabels([layer_Roads_0,layer_LotLabels_2]);
        });
    
