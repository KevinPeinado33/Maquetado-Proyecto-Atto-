var periodoService={add:function(e,t){try{connector.post(url.periodo.add,JSON.stringify(e),function(e){null!=e?(successMessage({title:message.periodo.add.title,content:message.periodo.add.success}),t(e)):(t(e),errorMessage({title:message.periodo.add.title,content:message.periodo.add.error}))})}catch(e){console.log(e)}},update:function(e,t){try{connector.post(url.periodo.update,JSON.stringify(e),function(e){null!=e&&1===e?(successMessage({title:message.periodo.update.title,content:message.periodo.update.success}),t(e)):(t(e),errorMessage({title:message.periodo.update.title,content:message.periodo.update.error}))})}catch(e){console.log(e)}},remove:function(e,t){try{connector.post(url.periodo.delete,JSON.stringify(e),function(e){null!=e&&1===e?(successMessage({title:message.periodo.delete.title,content:message.periodo.delete.success}),t(e)):(t(e),errorMessage({title:message.periodo.delete.title,content:message.periodo.delete.error}))})}catch(e){console.log(e)}},list:function(e,t){try{connector.post(url.periodo.list,JSON.stringify(e),function(e){null!=e&&0<e.length?t(e):(t(e),infoMessage({title:message.periodo.list.title,content:message.periodo.list.empty}))})}catch(e){console.log(e)}},get:function(e,t){try{connector.post(url.periodo.get,JSON.stringify(e),function(e){null!=e&&0<e.length?t(e):(t(e),infoMessage({title:message.periodo.list.title,content:message.periodo.list.empty}))})}catch(e){console.log(e)}}};