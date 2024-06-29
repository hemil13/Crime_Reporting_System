document.getElementById('mobile-menu').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('.navbar-menu').classList.toggle('active');
});

document.querySelectorAll('.dropdown-toggle').forEach(function (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default anchor click behavior
        this.nextElementSibling.classList.toggle('active');
        // Toggle display of dropdown menu
        if (this.nextElementSibling.style.display === 'block') {
            this.nextElementSibling.style.display = 'none';
        } else {
            this.nextElementSibling.style.display = 'block';
        }
    });
});

var map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [-120, 50],
    zoom: 2
});

map.on('load', function () {
    // Add a geojson point source.
    // Heatmap layers also work with a vector tile source.
    map.addSource('earthquakes', {
        'type': 'geojson',
        'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
    });

    map.addLayer(
        {
            'id': 'earthquakes-heat',
            'type': 'heatmap',
            'source': 'earthquakes',
            'maxzoom': 9,
            'paint': {
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0,
                    'rgba(33,102,172,0)',
                    0.2,
                    'rgb(103,169,207)',
                    0.4,
                    'rgb(209,229,240)',
                    0.6,
                    'rgb(253,219,199)',
                    0.8,
                    'rgb(239,138,98)',
                    1,
                    'rgb(178,24,43)'
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    2, // high value is high radius for each point
                    9,
                    20
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    1,
                    9,
                    0
                ]
            }
        }
    );

    map.addLayer(
        {
            'id': 'earthquakes-point',
            'type': 'circle',
            'source': 'earthquakes',
            'minzoom': 7,
            'paint': {
                // Size circle radius by earthquake magnitude and zoom level
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
                    16,
                    ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
                ],
                // Color circle by earthquake magnitude
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'mag'],
                    1,
                    'rgba(33,102,172,0)',
                    2,
                    'rgb(103,169,207)',
                    3,
                    'rgb(209,229,240)',
                    4,
                    'rgb(253,219,199)',
                    5,
                    'rgb(239,138,98)',
                    6,
                    'rgb(178,24,43)'
                ],
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                // Transition from heatmap to circle layer by zoom level
                'circle-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    0,
                    8,
                    1
                ]
            }
        }
    );

    const marker1 = new maplibregl.Marker()
        .setLngLat([-151.5129, 63.1016])
        .addTo(map);

    const popup1 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Theft</p>'); // Set the HTML content of the pop-up

    marker1.setPopup(popup1);



    const marker2 = new maplibregl.Marker()
        .setLngLat([-148.7794, 63.9496])
        .addTo(map);
    const popup2 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Assault</p>'); // Set the HTML content of the pop-up

    marker2.setPopup(popup2);



    const marker3 = new maplibregl.Marker()
        .setLngLat([-125.213167, 41.036])
        .addTo(map);
    const popup3 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Theft</p>'); // Set the HTML content of the pop-up

    marker3.setPopup(popup3);



    const marker4 = new maplibregl.Marker()
        .setLngLat([-117.812833, 34.096833])
        .addTo(map);
    const popup4 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Vandalism</p>'); // Set the HTML content of the pop-up

    marker4.setPopup(popup4);






    const marker5 = new maplibregl.Marker()
        .setLngLat([ -28.8364, -55.2702])
        .addTo(map);
    const popup5 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Fraud</p>'); // Set the HTML content of the pop-up

    marker5.setPopup(popup5);





    const marker6 = new maplibregl.Marker()
        .setLngLat([ -49.3194, 13.4552])
        .addTo(map);
    const popup6 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Theft</p>'); // Set the HTML content of the pop-up

    marker6.setPopup(popup6);





    const marker7 = new maplibregl.Marker()
        .setLngLat([ -77.9778, -1.6647])
        .addTo(map);
    const popup7 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Vandalism</p>'); // Set the HTML content of the pop-up

    marker7.setPopup(popup7);





    const marker8 = new maplibregl.Marker()
        .setLngLat([-95.0179, 16.6332])
        .addTo(map);
    const popup8 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Assault</p>'); // Set the HTML content of the pop-up

    marker8.setPopup(popup8);





    const marker9 = new maplibregl.Marker()
        .setLngLat([-78.3466, -0.2479])
        .addTo(map);
    const popup9 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Others</p>'); // Set the HTML content of the pop-up

    marker9.setPopup(popup9);






    const marker10 = new maplibregl.Marker()
        .setLngLat([-138.3287, 60.8439])
        .addTo(map);
    const popup10 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Assault</p>'); // Set the HTML content of the pop-up

    marker10.setPopup(popup10);







    const marker11 = new maplibregl.Marker()
        .setLngLat([-178.9394, -17.3298])
        .addTo(map);
    const popup11 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Assault</p>'); // Set the HTML content of the pop-up

    marker11.setPopup(popup11);






    const marker12 = new maplibregl.Marker()
        .setLngLat([-166.9646, 53.8971])
        .addTo(map);
    const popup12 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Vandalsim</p>'); // Set the HTML content of the pop-up

    marker12.setPopup(popup12);






    const marker13 = new maplibregl.Marker()
        .setLngLat([92.0628, 12.7773])
        .addTo(map);
    const popup13 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Others</p>'); // Set the HTML content of the pop-up

    marker13.setPopup(popup13);







    const marker14 = new maplibregl.Marker()
        .setLngLat([141.2485, 37.3415])
        .addTo(map);
    const popup14 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Theft</p>'); // Set the HTML content of the pop-up

    marker14.setPopup(popup14);







    const marker15 = new maplibregl.Marker()
        .setLngLat([-13.5314, -7.0219])
        .addTo(map);
    const popup15 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Assault</p>'); // Set the HTML content of the pop-up

    marker15.setPopup(popup15);






    const marker16 = new maplibregl.Marker()
        .setLngLat([-66.7666, -23.8893])
        .addTo(map);
    const popup16 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Vandalism</p>'); // Set the HTML content of the pop-up

    marker16.setPopup(popup16);







    const marker17 = new maplibregl.Marker()
        .setLngLat([-156.177667, 19.442])
        .addTo(map);
    const popup17 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Fraud</p>'); // Set the HTML content of the pop-up

    marker17.setPopup(popup17);








    const marker18 = new maplibregl.Marker()
        .setLngLat([139.4711, 35.839])
        .addTo(map);
    const popup18 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Fraud</p>'); // Set the HTML content of the pop-up

    marker18.setPopup(popup18);








    const marker19 = new maplibregl.Marker()
        .setLngLat([-119.5538, 38.7481])
        .addTo(map);
    const popup19 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Fraud</p>'); // Set the HTML content of the pop-up

    marker19.setPopup(popup19);








    const marker20 = new maplibregl.Marker()
        .setLngLat([-82.4676, -42.4862])
        .addTo(map);
    const popup20 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Others</p>'); // Set the HTML content of the pop-up

    marker20.setPopup(popup20);








    const marker21 = new maplibregl.Marker()
        .setLngLat([-93.2168, 15.3544])
        .addTo(map);
    const popup21 = new maplibregl.Popup({ offset: 25 }) // Specify an offset
        .setHTML('<h3>Crime Title</h3><p>Assault</p>'); // Set the HTML content of the pop-up

    marker21.setPopup(popup21);


});

