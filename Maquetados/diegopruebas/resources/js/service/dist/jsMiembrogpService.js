var miembrogpService={add:function(e,t){try{connector.post(url.miembrogp.add,JSON.stringify(e),function(e){null!=e?(successMessage({title:message.miembrogp.add.title,content:message.miembrogp.add.success}),t(e)):errorMessage({title:message.miembrogp.add.title,content:message.miembrogp.add.error})})}catch(e){console.log(e)}},update:function(e,t){try{connector.post(url.miembrogp.update,e,function(e){null!=e&&1===e?(successMessage({title:message.miembrogp.update.title,content:message.miembrogp.update.success}),t(e)):errorMessage({title:message.miembrogp.update.title,content:message.miembrogp.update.error})})}catch(e){console.log(e)}},remove:function(e,t){try{connector.post(url.miembrogp.delete,JSON.stringify(e),function(e){null!=e&&1===e?(successMessage({title:message.miembrogp.delete.title,content:message.miembrogp.delete.success}),t(e)):errorMessage({title:message.miembrogp.delete.title,content:message.miembrogp.delete.error})})}catch(e){console.log(e)}},list:function(e,t){try{connector.post(url.miembrogp.list,JSON.stringify(e),function(e){null!=e&&0<e.length?t(e):(t(e),infoMessage({title:message.miembrogp.list.title,content:message.miembrogp.list.empty}))})}catch(e){console.log(e)}},listPersona:function(e,t){try{connector.post(url.miembrogp.listPersona,JSON.stringify(e),function(e){null!=e&&0<e.length?t(e):(t(e),infoMessage({title:message.miembrogp.list.title,content:message.miembrogp.list.empty}))})}catch(e){console.log(e)}},listEscuela:function(e,t){try{connector.post(url.miembrogp.listEscuela,JSON.stringify(e),function(e){null!=e&&0<e.length?t(e):(t(e),infoMessage({title:message.miembrogp.list.title,content:message.miembrogp.list.empty}))})}catch(e){console.log(e)}},listIglesia:function(e,t){try{connector.post(url.miembrogp.listIglesia,JSON.stringify(e),function(e){null!=e&&0<e.length?t(e):(t(e),infoMessage({title:message.miembrogp.list.title,content:message.miembrogp.list.empty}))})}catch(e){console.log(e)}}};