var buscarPersona = (function () {
    var search = function(query){
        personaService.search(query, appDefaults.defaults.searchTypes.enabled,function(result){
            renderResult(result);
        });
    };
    var renderResult = function(list){
        var rows = [];
        for (var i = 0; i < list.length; i++) {
            var persona = list[i];
            rows.push({
                events: [{type: 'click', action: "redirect('/persona/profile/"+ persona.idPersona + "')"}],
                cols: [
                    {type: 'card-table-icon', icon: 'mdi-social-group', background: 'green accent-4 white-text'},
                    {type: 'card-table-content', label: '', value: grupo.gpoNombre.toUpperCase()},
                    {type: 'card-table-content', label: 'Lugar de Reunion', value: grupo.gpoLugarReunion},
                    {type: 'card-table-content', label: 'Fecha de Creacion', value: day + '/' + month + '/' + year}
                    
                ]
            });

        }
        var idPrefix = strings.random(8);
        components.render(RENDER_LIST_CONTAINER, components.cardTable.code(rows, idPrefix));
        components.cardTable.event(rows, idPrefix);
        components.dropdownButton.init();
    };
    return{
        search:search
    };
}());