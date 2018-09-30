
function errorMessage(params) {
    new PNotify({
        title: '<span class="red-text bold">' + params.title + '</span>',
        text: params.content,
        addclass: 'crm-pnotify',
        icon: 'mdi-alert-warning red-text',
        buttons: {
            sticker: false
        }
    });
}

function infoMessage(params) {
    new PNotify({
        title: '<span class="blue-text bold">' + params.title + '</span>',
        text: params.content,
        addclass: 'crm-pnotify',
        icon: 'mdi-action-info blue-text',
        buttons: {
            sticker: false
        }
    });
}

function successMessage(params) {
    new PNotify({
        title: '<span class="green-text bold">' + params.title + '</span>',
        text: params.content,
        addclass: 'crm-pnotify',
        icon: 'mdi-action-done green-text lighten-3',
        buttons: {
            sticker: false
        }
    });
}

function showMessage(params) {
    new PNotify({
        title: params.title,
        text: params.content,
        addclass: 'crm-pnotify',
        icon: false,
        buttons: {
            sticker: false
        }
    });
}
function confirmForm(form) {
    confirmMessage({
        title: message.logout.title,
        content: message.logout.confirm
    }, function () {
        $(form).submit();
    });
}

function confirmMessage(params, event) {
    (new PNotify({
        title: params.title,
        text: params.content,
        addclass: 'crm-pnotify',
        icon: 'mdi-communication-chat white-text',
        hide: false,
        confirm: {
            confirm: true
        },
        buttons: {
            closer: false,
            sticker: false
        },
        history: {
            history: false
        }
    })).get().on('pnotify.confirm', event);
}

/**
 * No modifcar la estructura que ya esta desarrollada, solo el contenido de los mensajes.
 * La estructura es la siguiente:
 * message>[OBJETO] > [METODO] > [TITULO_MENSAJE],[TIPO_MENSAJE].
 * - Cada OBJETO esta delimitado por comas.
 * - Es obligatorio poner el TITULO_MENSAJE en cada METODO
 * - Los mensajes que muestran algo resultado positivo, bueno, ok, son del tipo: success
 * - Los mensajes que muestran algun resultado erroneo, una falla, etc. Son del tipo: error
 * - Los mensajes que muestran solo información, son del tipo : info
 * @type Object
 */
var message = {
    logout: {
        title: "Cerrar sesion",
        confirm: "¿Está seguro(a) de cerrar sesion?"
    },
    persona: {
        add: {
            title: "Registro de Persona",
            success: "Persona registrada con éxito.",
            error: "Hubo un error al momento de registrar a la persona.",
            exist:"Ya tenemos registrada una persona con los mismos datos"
        },
        update: {
            title: "Actualización de datos Personales",
            success: "Los datos de la persona han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos de la persona."
        },
        delete: {
            title: "Eliminación de Persona",
            success: "Persona eliminada con éxito.",
            error: "Hubo un error al momento de eliminar a la persona."
        },
        list: {
            title: "Listado de Personas",
            empty: "Aún no hay personas registradas en el sistema"
        },
        search: {
            title: "Búsqueda de Personas",
            empty: "No se han encontrado resultados para la búsqueda"
        },
        get: {
            title: "Cargando información de Persona",
            error: "No se han encontrado resultados para la persona seleccionada"
        }
    },
    connector: {
        title: "Sistema CRM Digital 2.0",
        error: "Ocurrió un error al momento de enviar la información, asegurese de que tiene conexión a internet. " +
                "De lo contrario, comuníquese con el administrador del sistema.",
        fileUploader: {
            title: "Sistema CRM Digital 2.0",
            error: "Ocurrió un error al momento de subir el archivo."
        }
    },
    grupo: {
        add: {
            title: "Registro de Grupo Pequeño",
            success: "Grupo Pequeño registrado con éxito.",
            error: "Hubo un error al momento de registrar al Grupo Pequeño."
        },
        update: {
            title: "Actualización de Grupo Pequeño",
            success: "Los datos del Grupo Pequeño han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos del Grupo Pequeño."
        },
        delete: {
            title: "Eliminación de Grupo Pequeño",
            success: "Grupo Pequeño eliminado con éxito.",
            error: "Hubo un error al momento de eliminar al Grupo Pequeño."
        },
        list: {
            title: "Listado de Grupos Pequeños",
            empty: "Aún no hay Grupos Pequeños registrados en el sistema"
        },
        get: {
            title: "Cargando información de Grupo Pequeño",
            error: "No se han encontrado resultados para el grupo seleccionado"
        }
    },
    asgrupo: {
        add: {
            title: "Registro de Asistencia",
            success: "Asistencia Registrada con éxito",
            error: "Hubo un error al momento de registrar la asistencia"
        }
    },
    usuario: {
        update: {
            title: "Actualizar Usuario",
            success: "Los datos del usuario han sido actualizados con éxito",
            error: "Hubo un error al momento de actualizar el usuario",
            clave: "La clave ingresada no es correcta"
        }
    },
    asescuela:{
        add:{
            title:"Registro de Asistencia",
            success:"Asistencia Registrada con éxito",
            error:"Hubo un error al momento de registrar la asistencia"
        }
    },
    evento: {
        add: {
            title: "Registro de Evento",
            success: "Evento registrado con éxito.",
            error: "Hubo un error al momento de registrar el Evento"
        },
        update: {
            title: "Actualización del Evento",
            success: "Los datos del Evento han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos del Evento"
        },
        delete: {
            title: "Eliminación del Evento",
            success: "Evento eliminado con éxito.",
            error: "Hubo un error al momento de eliminar el Evento."
        },
        list: {
            title: "Listado de Eventos",
            empty: "Aún no hay Eventos registrados en el sistema"
        },
        get: {
            title: "Cargando información de Evento",
            error: "Hubo un error al momento de cargar el evento seleccionado"
        }
    },
    unionp: {
        add: {
            title: "Registro de Unión",
            success: "Unión registrado con éxito.",
            error: "Hubo un error al momento de registrar Unión"
        },
        update: {
            title: "Actualización de Unión",
            success: "Los datos del Unión han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos de Unión"
        },
        delete: {
            title: "Eliminación de Unión",
            success: "Unión eliminado con éxito.",
            error: "Hubo un error al momento de eliminar Unión."
        },
        list: {
            title: "Listado de Unións",
            empty: "Aún no hay Uniones registrados en el sistema"
        }
    },
    eventopersona: {
        title: "Registro de Asistencia de Miembro GP",
        error: "Hubo un error al momento de registrar la Asistencia de Miembro GP"
    },
    campo: {
        add: {
            title: "Registro de Campo",
            success: "Campo registrado con éxito.",
            error: "Hubo un error al momento de registrar el Campo"
        },
        update: {
            title: "Actualización de Campo",
            success: "Los datos del Campo han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos de Campo"
        },
        delete: {
            title: "Eliminación de Campo",
            success: "Campo eliminado con éxito.",
            error: "Hubo un error al momento de eliminar Campo."
        },
        list: {
            title: "Listado de Campos",
            empty: "Aún no hay Campos registrados en el sistema"
        }
    },
    distrito: {
        add: {
            title: "Registro de Distrito Misionero",
            success: "Distrito Misionero registrado con éxito.",
            error: "Hubo un error al momento de registrar al Distrito Misionero"
        },
        update: {
            title: "Actualización de Distrito Misionero",
            success: "Los datos del Distrito Misionero han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos de Distrito Misionero"
        },
        delete: {
            title: "Eliminación de Distrito Misionero",
            success: "Distrito Misionero eliminado con éxito.",
            error: "Hubo un error al momento de eliminar al Distrito Misionero."
        },
        list: {
            title: "Listado de Distritos Misioneros",
            empty: "Aún no hay Distritos Misioneros registrados en el sistema"
        },
        get: {
            title: "Cargando información de Distirto Misionero",
            error: "Hubo un error al momento de cargar el Distrito seleccionado"
        }
    },
    escuela: {
        add: {
            title: "Registro de Escuela Sabática",
            success: "Escuela Sabática registrado con éxito.",
            error: "Hubo un error al momento de registrar a la Escuela Sabática"
        },
        update: {
            title: "Actualización de Escuela Sabática",
            success: "Los datos de Escuela Sabática han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos de la Escuela Sabática"
        },
        delete: {
            title: "Eliminación de Escuela Sabática",
            success: "Escuela Sabática eliminado con éxito.",
            error: "Hubo un error al momento de eliminar a la Escuela Sabática."
        },
        list: {
            title: "Listado de Escuelas Sabáticas",
            empty: "Aún no hay Escuelas Sabáticas registrados en el sistema"
        },
        get: {
            title: "Cargando información de Escuela Sabática",
            error: "Hubo un error al momento de cargar la Escuela seleccionada"
        }
    },
    iglesia: {
        add: {
            title: "Registro de Iglesia",
            success: "Iglesia registrado con éxito.",
            error: "Hubo un error al momento de registrar a la Iglesia"
        },
        update: {
            title: "Actualización de Iglesia",
            success: "Los datos del Iglesia han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos de la Iglesia"
        },
        delete: {
            title: "Eliminación de Iglesia",
            success: "Iglesia eliminado con éxito.",
            error: "Hubo un error al momento de eliminar a la Iglesia."
        },
        list: {
            title: "Listado de Iglesias",
            empty: "Aún no hay Iglesias registrados en el sistema"
        },
        get: {
            title: "Cargando información de Iglesia",
            error: "Hubo un error al momento de cargar la Iglesia seleccionada"
        }
    },
    miembrogp: {
        add: {
            title: "Registro del Miembro de Grupo Pequeño",
            success: "Miembro de Grupo Pequeño registrado con éxito.",
            error: "Hubo un error al momento de registrar al Miembro de Grupo Pequeño"
        },
        update: {
            title: "Actualización del Miembro de Grupo Pequeño",
            success: "Los datos del Miembro de Grupo Pequeño han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos del Miembro de Grupo Pequeño"
        },
        delete: {
            title: "Eliminación del Miembro de Grupo Pequeño",
            success: "Miembro de Grupo Pequeño eliminado con éxito.",
            error: "Hubo un error al momento de eliminar al Miembro de Grupo Pequeño."
        },
        list: {
            title: "Listado de Miembros de Grupo Pequeño",
            empty: "Aún no hay Miembros de Grupo Pequeño registrados en el sistema"
        }
    },
    miembromin: {
        add: {
            title: "Registro del Mimebro de Ministerio",
            success: "Mimebro de Ministerio registrado con éxito.",
            error: "Hubo un error al momento de registrar al Mimebro de Ministerio"
        },
        update: {
            title: "Actualización de Mimebro de Ministerio",
            success: "Los datos del Mimebro de Ministerio han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos de Mimebro de Ministerio"
        },
        delete: {
            title: "Eliminación del Mimebro de Ministerio",
            success: "Mimebro de Ministerio eliminado con éxito.",
            error: "Hubo un error al momento de eliminar al Mimebro de Ministerio."
        },
        list: {
            title: "Listado de los Mimebros de Ministerio",
            empty: "Aún no hay Mimebros de Ministerio registrados en el sistema"
        }
    },
    ministerio: {
        add: {
            title: "Registro de Ministerio",
            success: "Ministerio registrado con éxito.",
            error: "Hubo un error al momento de registrar el Ministerio"
        },
        update: {
            title: "Actualización de Ministerio",
            success: "Los datos del Ministerio han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos de Ministerio"
        },
        delete: {
            title: "Eliminación de Ministerio",
            success: "Ministerio eliminado con éxito.",
            error: "Hubo un error al momento de eliminar el Ministerio."
        },
        list: {
            title: "Listado de Ministerios",
            empty: "Aún no hay Ministerios registrados en el sistema"
        },
        get: {
            title: "Cargando información de Ministerio",
            error: "Hubo un error al momento de cargar el Ministerio seleccionado"
        }
    },
    periodo: {
        add: {
            title: "Registro del Periodo de Trabajo",
            success: "Periodo de Trabajo registrado con éxito.",
            error: "Hubo un error al momento de registrar Periodo de Trabajo"
        },
        update: {
            title: "Actualización del Periodo de Trabajo",
            success: "Los datos del Periodo de Trabajo han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos del Periodo de Trabajo"
        },
        delete: {
            title: "Eliminación del Periodo de Trabajo",
            success: "Periodo de Trabajo eliminado con éxito.",
            error: "Hubo un error al momento de eliminar el Periodo de Trabajo."
        },
        list: {
            title: "Listado de Periodos de Trabajo",
            empty: "Aún no hay Uniones registrados en el sistema"
        },
        get: {
            title: "Cargando información de Periodo",
            error: "Hubo un error al momento de cargar el periodo seleccionado"
        }
    },
    tipoevento: {
        add: {
            title: "Registrar Tipo de Evento",
            success: "El Tipo de Evento fue registrado con éxito.",
            error: "Hubo un error al momento de registrar el Tipo de Evento"
        },
        update: {
            title: "Actualización del Tipo de Evento",
            success: "Los datos del Tipo de Evento han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos del Tipo de Evento"
        },
        delete: {
            title: "Eliminación del Tipo de Evento",
            success: "El Tipo de Evento fue eliminado con éxito.",
            error: "Hubo un error al momento de eliminar el Tipo de Evento."
        },
        list: {
            title: "Listado de los Tipos de Eventos",
            empty: "Aún no hay Tipos de Eventos registrados en el sistema"
        }
    },
    rol: {
        add: {
            title: "Registrar Tipo de Rol",
            success: "El Tipo de Rol fue registrado con éxito.",
            error: "Hubo un error al momento de registrar el Tipo de Rol"
        },
        update: {
            title: "Actualización del Tipo de Rol",
            success: "Los datos del Tipo de Rol han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos del Tipo de Rol"
        },
        delete: {
            title: "Eliminación del Tipo de Rol",
            success: "El Tipo de Rol fue eliminado con éxito.",
            error: "Hubo un error al momento de eliminar el Tipo de Rol."
        },
        list: {
            title: "Listado de los Tipos de Roles",
            empty: "Aún no hay Tipos de Roles registrados en el sistema"
        }
    },
    eventogrupo: {
        add: {
            title: "Registrar Asistencia al Evento",
            success: "La Asistencia al Evento fue registrado con éxito.",
            error: "Hubo un error al momento de registrar la Asistencia al Evento"
        },
        update: {
            title: "Actualización de Asistencia al Evento",
            success: "Los datos de la Asistencia al Evento han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar los datos de la Asistencia al Evento"
        },
        delete: {
            title: "Eliminación de la Asistencia al Evento",
            success: "La Asistencia al Evento fue eliminado con éxito.",
            error: "Hubo un error al momento de eliminar la Asistencia al Evento."
        },
        list: {
            title: "Listado de las Asistencias a los Eventos",
            empty: "Aún no hay Aistencia a los Eventos registrados en el sistema"
        }
    },
    privilegio: {
        add: {
            title: "Registrar privilegio",
            success: "El Privilegio fue registrado con éxito.",
            error: "Hubo un error al momento de registrar el privilegio"
        },
        update: {
            title: "Actualización de privilegio",
            success: "Los datos de Privilegio han sido actualizados con éxito.",
            error: "Hubo un error al momento de actualizar el Privilegio"
        },
        delete: {
            title: "Eliminación Privilegio",
            success: "El Privilegio fue eliminado con éxito.",
            error: "Hubo un error al momento de eliminar el Privilegio."
        },
        list: {
            title: "Listado de los Privilegio",
            empty: "Aún no hay Privilegios registrados en el sistema"
        }
    },
    incomplete: {
        title: "Campos Incompletos",
        content: "Es necesario llenar los campos solicitados"
    },
    asmiemgp: {
        add: {
            title: "Registro de Asistencia",
            success: "Registrado correctamente",
            error: "Hubo un error al momento de registrar la asistencia"
        }
    },
    asmiemes:{
        add:{
            title:"Registro de Asistencia",
            success:"Registrado correctamente",
            error:"Hubo un error al momento de registrar la asistencia"
        }
    },
    detrol:{
        add:{
            title:"Asignación correcta de Rol",
            success:"Se asignó correctamente",
            error:"Hubo un error al momento de asignar el rol"
        },
        remove:{
            title:"Quitar rol",
            success:"Se quitó el rol correctamente",
            error:"Hubo un error al momento de quitar el rol"
        }
    }
};
